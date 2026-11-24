import React from 'react'
import { Card, Grid } from '@/components/ui'

export const Dashboard = () => {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to Project Nexus AI. Start by creating a new case or uploading evidence.
      </p>
      
      <Grid columns={3} gap={4}>
        {/* Dashboard cards will go here */}
      </Grid>
    </div>
  )
}