import type { Metadata } from 'next'
import './globals.css'
import SitePreloader from '@/components/covenant-preloader'
import ExtensionErrorSuppressor from '@/components/extension-error-suppressor'
import { CovenantProvider } from '@/agents/covenant-provider'

export const metadata: Metadata = {
  title: 'COVENANT — Confidential Multi-Agent Due Diligence',
  description: 'TEE-secured data rooms where AI agents with verifiable identity analyze sensitive corporate documents without raw data ever leaving the enclave.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){function isExt(s,m){s=s||'';m=m||'';return s.indexOf('chrome-extension://')===0||s.indexOf('moz-extension://')===0||m.indexOf('has not been authorized')!==-1||m.indexOf('chrome-extension://')!==-1||m.indexOf('moz-extension://')!==-1;}var _oe=window.onerror;window.onerror=function(m,s,r,c,e){if(isExt(s,m))return true;return _oe?_oe.apply(this,arguments):false;};window.addEventListener('error',function(e){if(isExt(e.filename,e.message)){e.preventDefault();e.stopImmediatePropagation();}},true);window.addEventListener('unhandledrejection',function(e){var msg=e.reason&&(e.reason.message||String(e.reason)||'');var stack=e.reason&&(e.reason.stack||'');if(isExt(stack,msg)){e.preventDefault();e.stopImmediatePropagation();}},true);})();` }} />
      </head>
      <body className="bg-black text-white font-sans antialiased">
        <CovenantProvider>
          <ExtensionErrorSuppressor />
          <SitePreloader />
          {children}
        </CovenantProvider>
      </body>
    </html>
  )
}
