import next from 'next'
import { NextResponse, NextRequest } from 'next/server'

export default function middleware(req: {
  nextUrl: { pathname: any; search: string; origin: string }
  headers: { get: (arg0: string) => string }
}) {
  // console.log(req.nextUrl)
  const { pathname, origin, search } = req.nextUrl
  const hostname: string = req.headers.get('host')

  if (req.nextUrl.origin == 'http://localhost:3000') {
    NextResponse.next()
    return
  }

  if (hostname.indexOf('app') != -1) {
    NextResponse.next()
    return
  }

  // To LP
  return NextResponse.rewrite(`${origin}/lp`)
}
