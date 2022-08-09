import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
let { NODE_ENV, AUTH_PASSWORD } = process.env;

let ttl = 60 * 60 * 24;   // 1 day

/** @type {import('iron-session').IronSessionOptions} */
export const sessionOptions = {
  cookieName: "auth_token",
  password: AUTH_PASSWORD,
  ttl: ttl,
  cookieOptions: {
    httpOnly: true,
    // The next line makes sure browser will expire cookies before seals
    // are considered expired by the server. It also allows for clock 
    // difference of 60 seconds maximum between servers and clients.
    maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
    sameSite: 'lax',
    secure: NODE_ENV === 'production',
  }
}

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function withSessionSSR(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
