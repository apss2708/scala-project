import React, { useState } from 'react'
import { Card, Input, Button, Alert } from '@/components/ui'

export const Authentication = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const handleAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields")
      return
    }
    
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errData = await response.json()
        setError(errData.detail || "Authentication failed")
        return
      }

      const data = await response.json()
      // In a real app, store token and redirect
      console.log("Authentication successful:", data)
      setLoading(false)
      // Redirect to dashboard
      // window.location.href = "/"
    } catch (err) {
      setError("Network error. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'login' ? 'Sign In' : 'Sign Up'}
        </h2>
        
        {error && (
          <Alert variant="destructive">
            {error}
          </Alert>
        )}
        
        <form onSubmit={(e) => {
          e.preventDefault()
          handleAuth()
        }}>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="enter@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Authenticating..." : `${mode === 'login' ? 'Sign In' : 'Sign Up'}`}
          </Button>
        </form>
      </Card>
    </div>
  )
}