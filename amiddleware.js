import { NextResponse } from 'next/server'
import { headers } from 'next/headers';
import url from 'url';

 
export async function middleware(request) {
    const headersList = headers()
    const referer = headersList.get('referer');
    console.log(referer)
    if (referer === null) {
      console.log('referer is null')
      return NextResponse.json('no');
    }
    const parsedUrl = url.parse(referer);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
    console.log('requesting resource ', request.url, ' ITS FROM ', baseUrl);
    if (baseUrl === 'http://localhost:3000' || baseUrl === 'https://retiform.vercel.app' || baseUrl === 'https://retiform2.vercel.app') {
      return NextResponse.next();
    }
    return NextResponse.json('no');
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}