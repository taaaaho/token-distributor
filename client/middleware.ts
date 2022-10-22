import next from 'next'
import { NextResponse } from 'next/server'

export default function middleware(req: {
  nextUrl: { pathname: any; search: string; origin: string }
  headers: { get: (arg0: string) => string }
}) {
  const { pathname, origin, search } = req.nextUrl
  const hostname: string = req.headers.get('host')

  if (hostname.indexOf('app') != -1) {
    NextResponse.next()
    return
  }

  // To LP
  return NextResponse.rewrite(`${origin}/lp`)
}
