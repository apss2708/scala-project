import React, { useState, useEffect } from 'react'

export const CookieBanner = () => {
  const [accepted, setAccepted] = useState<boolean | null>(null)

  // Check if already accepted
  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent')
    if (stored === 'accepted') {
      setAccepted(true)
    } else if (stored === 'rejected') {
      setAccepted(false)
    }
  }, [])

  // Store consent
  const handleAccept = () => {
    setAccepted(true)
    localStorage.setItem('cookie_consent', 'accepted')
  }

  const handleReject = () => {
    setAccepted(false)
    localStorage.setItem('cookie_consent', 'rejected')
  }

  if (accepted !== null) {
    // Already decided, don't show banner
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-sm text-foreground">
          We use cookies to enhance your experience. By continuing, you agree to our
          <a href="/privacy-policy" className="underline underline-offset-2 text-primary">Privacy Policy</a>.
        </p>
        <div className="mt-2 flex gap-2">
          <button
            onClick={handleAccept}
            className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted/20"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}