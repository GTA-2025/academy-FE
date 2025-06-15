'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wifi, WifiOff } from 'lucide-react'

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-background">
      <div className="space-y-4">
        {isOnline ? (
          <Wifi className="h-12 w-12 text-green-500" />
        ) : (
          <WifiOff className="h-12 w-12 text-red-500" />
        )}
        <h1 className="text-2xl font-bold">
          {isOnline ? 'Back Online!' : 'You are offline'}
        </h1>
        <p className="text-muted-foreground">
          {isOnline
            ? 'Your connection has been restored.'
            : 'Please check your internet connection and try again.'}
        </p>
        <Button
          onClick={() => window.location.reload()}
          variant={isOnline ? "default" : "secondary"}
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
