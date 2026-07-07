import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)
const PUBLIC_PATHS = ['/', '/login']

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const isPublicPath = PUBLIC_PATHS.includes(req.nextUrl.pathname)

  let isAuthed = false
  if (token) {
    try {
      await jwtVerify(token, secret)
      isAuthed = true
    } catch {
      isAuthed = false
    }
  }

  if (!isAuthed && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (isAuthed && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
