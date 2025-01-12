import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-red-600">Authentication Error</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-600">
            There was an error during the authentication process. Please try again.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href="/login">
                Return to Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 