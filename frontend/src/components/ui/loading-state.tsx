import React from 'react'

export const LoadingState = ({
  text = "Loading...",
  className = "",
}: {
  text?: string
  className?: string
}) => {
  return (
    <div className={`
      text-center py-8 
      ${className}
    `}>
      <div className="inline-block mr-2">
        <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
      <span className="text-sm text-foreground">{text}</span>
    </div>
  )
}