import React from 'react'

export const Input = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled,
  className = "",
  ...props
}: {
  type?: string
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  className?: string
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`
        w-full rounded-md border border-input bg-background px-3 py-2 
        text-sm shadow-sm transition-colors 
        ${className}
      `}
      {...props}
    />
  )
}