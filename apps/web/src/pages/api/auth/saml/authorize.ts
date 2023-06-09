import type { NextApiRequest, NextApiResponse } from 'next'
import sp from '@/lib/sp'
import idp from '@/lib/idp'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { context: redirectUrl } = await sp.createLoginRequest(idp, 'redirect') 
  return res.redirect(302, redirectUrl as string)
}
