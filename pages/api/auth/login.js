import { scryptSync } from 'crypto';

import { withSessionRoute } from 'lib/ironSession';
import User from 'models/user';

export default withSessionRoute(handler);

async function handler(req, res) {
  let { email, password } = req.body;
  // if (!credentials || !password || !validator.isAlphanumeric(validator.blacklist(credentials, ' ')))
  if (!email || !password)
    return res.status(401).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'Invalid credential(s)',
      source: 'authorization_signin',
      reason: 'Hashes did not match',
      metadata: {}
    });

  const user = await User.findOne({ email: email }).select(['email', 'password']);
  if (!user)
    return res.status(404).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'User dosen\'t exist. Try creating a new account',
      source: 'authorization_signinq',
      reason: 'db_query_not_found',
      metadata: {}
    });

  let isPasswordCorrect = scryptSync(password, 'mirrage', 15).toString('hex') === user.password;
  if (!isPasswordCorrect)
    return res.status(401).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'Incorrect email or password. Please try again',
      source: 'authorization_signin',
      reason: 'Hashes did not match',
      metadata: {}
    });

  req.session.user = { id: user.id, type: user.type };
  await req.session.save();
  return res.status(201).send();
}

