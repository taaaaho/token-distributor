import { NextResponse } from 'next/server'

// const DOMAIN = process.env.VERCEL === '1' ? process.env.HOST : 'localhost:3000'
export default function middleware(req: {
  nextUrl: { pathname: any; search: string; origin: string }
  headers: { get: (arg0: string) => string }
}) {
  const { pathname, origin, search } = req.nextUrl
  const hostname: string = req.headers.get('host')
  // const subdomain = hostname.replace(`.${DOMAIN}`, '')

  // 404 when direct access
  //   if (pathname.startsWith(`/lp`)) {
  //     return new Response(null, { status: 404 });
  //   }
  // console.log('DOMAIN', DOMAIN)
  // console.log('pathname', pathname)
  // console.log('hostname', hostname)
  // console.log('subdomain', subdomain)
  console.log('process.env.HOST', process.env.HOST)
  // console.log('origin', origin)

  if (hostname.indexOf('app') != -1) {
    // console.log('app')
    return NextResponse.rewrite(`${origin}${pathname}${search}`)
  }
  // if (subdomain == 'app') {
  //   // To App
  //   return NextResponse.rewrite(`${origin}${pathname}${search}`)
  // }

  // To LP
  // console.log('LP')
  return NextResponse.rewrite(`${origin}/lp`)
}
