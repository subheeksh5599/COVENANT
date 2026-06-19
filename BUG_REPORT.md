# Bug Report: @terminal3/t3n-sdk v3.9.0

*Submitted by: Covenant (Confidential AI Due Diligence on Terminal 3)*
*Date: 19 June 2026*

---

## Bug 1 — WASM session.js is unparseable by standard module loaders

**Severity:** Critical  
**Category:** SDK Packaging  
**Component:** `dist/wasm/generated/session.js`

### Environment

| Property | Value |
|----------|-------|
| SDK version | `@terminal3/t3n-sdk@3.9.0` |
| Node.js | v25.8.2 |
| Next.js | 14.2.3 (Webpack 4) |
| Platform | Linux x86_64 |
| Environment | `testnet` |

### Reproduction

```bash
npm install @terminal3/t3n-sdk@3.9.0
node -e "require('@terminal3/t3n-sdk')"
```

Also reproducible with:

```bash
node -e "import('@terminal3/t3n-sdk')"  # ESM
node --loader tsx -e "import '@terminal3/t3n-sdk'"  # tsx ESM
```

And during build with any bundler (Webpack, esbuild):

```bash
npx next build   # Next.js 14 / Webpack 4
npx vite build   # Vite / Rollup
```

### Expected Result

The module loads without syntax errors. `session.js` contains valid ESM (all code inside module scope) or valid CJS (no ESM `export` keywords in CJS context).

### Actual Result

```
SyntaxError: Unexpected token ':'
    at file:///.../dist/wasm/generated/session.js:3994
        paramCount: 5,
                  ^
```

The file at line 3992-3997 contains:

```js
  }
  
export { clientAuth010 as clientAuth, ... };
    funcName: 'next',      // ← bare code after export — not inside any function/object
    paramCount: 5,         // ← object literal continuations from WASM-to-JS compiler
    async: false,
    postReturn: true,
  });
```

Three distinct problems exist in this file:

1. **Bare code after `export` statement** (lines 3993-3996): The WASM-to-JS compiler generated object literal continuations (`funcName: 'next', paramCount: 5`) that are placed after an ESM `export` declaration. These bare statements are not inside any function, class, or object scope — they are top-level syntax errors in both ESM and CJS.

2. **String-named exports** (line 5215): The file uses `export { ... as 'component:session/client-auth@0.1.0', ... }` syntax which is invalid in Webpack 4 (used by Next.js 14). Webpack's parser cannot handle single-quoted export names.

3. **Dual ESM/CJS incompatibility**: The file is imported as CJS (`require()`) from `dist/index.js` but contains ESM `export` syntax. The `.js` extension does not trigger ESM parsing in Node.js CJS mode, producing `'import' and 'export' cannot be used outside of module code`.

### Impact

The SDK cannot be loaded by:
- **Node.js** — both `require()` and `import()` fail
- **Next.js 14** — Webpack 4 cannot bundle it
- **Vite / Rollup** — same parser failures
- **Any browser bundler** — the session.js file is unparseable

This blocks all browser-based integrations. The only working path is `tsx` (esbuild-based ESM loader) with the `index.esm.js` entry point, which works because esbuild's parser is more lenient. Node.js native ESM and CJS both fail.

### Suggested Fix

The root cause is in the WASM-to-JS compilation step that generates `session.js`. The compiler (`wit-bindgen` or a custom WASM component tool) is producing code where ESM `export` statements are interleaved with object literal continuations from generated wrapper functions.

**Option A (preferred):** Update the WASM-to-JS compiler to place ALL code inside proper module-level function/object scopes, with `export` statements only at the very end of the file (or not at all, using `module.exports` for CJS compatibility).

**Option B:** Ship two separate builds:
- `session.cjs` — CommonJS with `module.exports = { ... }`
- `session.mjs` — valid ESM with all code inside module scope

**Option C (quick fix):** Patch the current `session.js` to remove bare code after export statements and append proper exports at end of file. This is what Covenant's postinstall does as a workaround, but it requires maintaining a fragile sed/python patch that breaks on SDK updates.

---

## Bug 2 — TenantClient API differs from documentation

**Severity:** High  
**Category:** Documentation Gap / Breaking Change  
**Component:** `TenantClient` configuration

### Environment

Same as Bug 1.

### Reproduction

Following the getting-started guide code:

```typescript
const tenant = new TenantClient(client);
await tenant.claim();   // TypeError: tenant.claim is not a function
await tenant.me();      // TypeError: tenant.me is not a function
```

### Expected Result

`tenant.claim()` and `tenant.me()` work as documented, returning tenant registration status and identity info.

### Actual Result

`TenantClient` in v3.9.0 has no `claim()` or `me()` methods directly. These were moved to the `tenant` namespace:

```typescript
// v3.9.0 API:
const tenant = new TenantClient({ 
  t3n: client, 
  tenantDid: tenantDidHex(did), 
  baseUrl: getNodeUrl() 
});
await tenant.tenant.claim();  // returns unknown
await tenant.tenant.me();     // returns TenantMeResponse
```

Additionally, v3.9.0 requires `tenantDid` (hex) and `baseUrl` in `TenantClientConfig`, which were not required in earlier versions and are not mentioned in the getting-started guide.

### Impact

Developers following the official documentation hit runtime errors on their first `TenantClient` usage. The error messages (`claim is not a function`) provide no migration path. This adds significant onboarding friction — the exact problem the bounty's bug track is designed to surface.

### Suggested Fix

1. Add a migration guide or changelog for v3.x → v3.9.0 API changes
2. Update getting-started code examples to match v3.9.0 API
3. Consider adding deprecated wrapper methods on `TenantClient` that delegate to the namespace with a console warning

---

## Bug 3 — `setEnvironment` unavailable in CJS build

**Severity:** Medium  
**Category:** SDK Packaging  
**Component:** `dist/index.js` (CJS entry)

### Reproduction

```javascript
const sdk = require('@terminal3/t3n-sdk');
sdk.setEnvironment('testnet');
// TypeError: sdk.setEnvironment is not a function
```

### Expected Result

`setEnvironment` is exportable from the CJS build (the `main` field in `package.json`).

### Actual Result

`setEnvironment` is available in the ESM build (`dist/index.esm.js`) but not in the CJS build (`dist/index.js`). The CJS build apparently re-exports a subset of symbols. Developers using `require()` or tools that resolve to the `main` field hit this.

### Suggested Fix

Ensure the CJS and ESM entry points export identical symbols, or document which symbols are ESM-only and provide migration guidance for CJS consumers.

---

## Summary

| Bug | Severity | Component | Status |
|-----|----------|-----------|--------|
| session.js unparseable | Critical | WASM packaging | Blocks all browser + standard Node.js usage |
| TenantClient API mismatch | High | Docs / Breaking change | Onboarding friction, incorrect examples |
| setEnvironment CJS missing | Medium | CJS build | Partial export mismatch |

The session.js issue (Bug 1) is the most impactful — it prevents the SDK from being used in any standard browser application, including Next.js, Vite, and plain HTML+JS setups. The only working runtime path is `tsx` (esbuild ESM loader), which was used to successfully verify the SDK's handshake, authentication, and DID retrieval in Covenant's CLI test suite.
