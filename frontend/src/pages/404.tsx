import React from 'react'

export const Page404 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <p className="text-2xl text-muted-foreground">
          Page not found
        </p>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been removed.
        </p>
        <a href="/" className="inline-block rounded-md px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}