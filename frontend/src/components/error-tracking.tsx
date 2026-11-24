/**
 * Error tracking placeholder - integrate with services like Sentry, Bugsnag, etc.
 * Errors are captured on the backend and logged securely.
 */

// Frontend error tracking - send errors to backend for secure logging
export const trackError = (error: Error, context: string = '') => {
  // Send to backend for secure logging (keeps API keys off frontend)
  // fetch('/api/errors', {
  //   method: 'POST',
  //   body: JSON.stringify({ error: error.message, stack: error.stack, context })
  // })
  console.error(`Error tracked: ${context}`, error)
}

// Global error handler wrapper
export const withErrorBoundary = (Component: React.ComponentType) => {
  class ErrorBoundary extends React.Component {
    state = { hasError: false, error: Error }

    static getDerivedStateFromError(error: Error) {
      return { hasError: true, error }
    }

    render() {
      if (this.state.hasError) {
        trackError(this.state.error, this.props.context)
        return null // Or render fallback UI
      }
      return <Component {...this.props} />
    }
  }

  ErrorBoundary.displayName = `${Component.displayName || Component.name}ErrorBoundary`
  return ErrorBoundary
}