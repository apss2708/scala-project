import React from 'react'

export const Card = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`
        rounded-lg border border-border bg-card px-6 py-5 shadow-sm 
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}