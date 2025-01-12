import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
export async function middleware() {
  // Temporarily allow all access for testing
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
} 