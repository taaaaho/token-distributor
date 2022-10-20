import { NextResponse } from 'next/server'

const DOMAIN = process.env.VERCEL === '1' ? process.env.HOST : 'localhost:3000'
export default function middleware(req: {
  nextUrl: { pathname: any; search: string; origin: string }
  headers: { get: (arg0: string) => string }
}) {
  const { pathname, origin, search } = req.nextUrl
  const hostname: string = req.headers.get('host')
  const subdomain = hostname.replace(`.${DOMAIN}`, '')

  // 404 when direct access
  //   if (pathname.startsWith(`/lp`)) {
  //     return new Response(null, { status: 404 });
  //   }
  if (subdomain === 'app') {
    // To App
    return NextResponse.rewrite(`${origin}${pathname}${search}`)
  }

  // To LP
  return NextResponse.rewrite(`${origin}/lp/`)
}
