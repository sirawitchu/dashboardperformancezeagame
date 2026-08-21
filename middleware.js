export const config = {
  matcher: ['/', '/index.html'],
};

export default function middleware(request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const authed = cookieHeader.split(';').some((c) => c.trim() === 'dash_auth=ok');
  if (authed) return;
  return Response.redirect(new URL('/login.html', request.url));
}
