import React from 'react'

export const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode
  variant?: "default" | "primary" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg"
  className?: string
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  }

  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1",
    lg: "px-6 py-3",
  }

  return (
    <button
      className=`
        inline-flex items-center justify-center rounded-md 
        ${variants[variant]} 
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}