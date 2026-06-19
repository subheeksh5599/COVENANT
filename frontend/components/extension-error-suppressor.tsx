'use client'

import { useEffect } from 'react'

// AgentCash and other extensions inject scripts into the page and throw errors
// with the page URL as filename (not chrome-extension://) when the origin isn't
// authorized. We filter by both filename and message to catch all cases.
const isExtensionError = (filename?: string | null, message?: string | null): boolean => {
  const src = filename ?? ''
  const msg = message ?? ''
  return (
    src.startsWith('chrome-extension://') ||
    src.startsWith('moz-extension://') ||
    msg.includes('has not been authorized') ||
    msg.includes('chrome-extension://') ||
    msg.includes('moz-extension://')
  )
}

export default function ExtensionErrorSuppressor() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      if (isExtensionError(e.filename, e.message)) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }
    const onUnhandledRejection = (e: PromiseRejectionEvent) => {
      const msg: string = e.reason?.message ?? String(e.reason ?? '')
      const stack: string = e.reason?.stack ?? ''
      if (isExtensionError(stack, msg)) {
        e.preventDefault()
        e.stopImmediatePropagation()
      }
    }
    window.addEventListener('error', onError, true)
    window.addEventListener('unhandledrejection', onUnhandledRejection, true)
    return () => {
      window.removeEventListener('error', onError, true)
      window.removeEventListener('unhandledrejection', onUnhandledRejection, true)
    }
  }, [])
  return null
}
