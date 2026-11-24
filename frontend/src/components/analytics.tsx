/**
 * Analytics placeholder - integrate with your preferred analytics service
 * (Google Analytics, Plausible, etc.) while keeping API keys off the frontend.
 */

// Analytics events should be sent from the backend, not the frontend
// This prevents exposing internal API keys or user data to third parties

export const trackEvent = (eventName: string, properties: object = {}) => {
  // In production, send to backend endpoint which forwards to analytics
  // Example: await fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify({ event: eventName, properties })
  // })
  console.log(`Analytics event: ${eventName}`, properties)
}

// Page view tracking
export const trackPageView = (pagePath: string) => {
  trackEvent('page_view', { page: pagePath })
}