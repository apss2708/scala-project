import React from 'react'

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionLabel,
}: {
  icon?: string
  title: string
  description: string
  action?: () => void
  actionLabel?: string
}) => {
  return (
    <div className="text-center py-8">
      {icon && (
        <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {action && (
        <button
          onClick={action}
          className="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20"
        >
          {actionLabel || "Action"}
        </button>
      )}
    </div>
  )
}