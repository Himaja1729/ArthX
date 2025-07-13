import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6 text-center">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link href="/">
        <Button>
          Return Home
        </Button>
      </Link>
    </div>
  )
}

export default NotFound