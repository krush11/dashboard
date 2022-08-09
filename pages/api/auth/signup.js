import User from 'models/user';
import { scryptSync } from 'crypto';
import { withSessionRoute } from 'lib/ironSession';

export default withSessionRoute(handler);

export async function handler(req, res) {
	if (req.method == 'POST') {
		let { firstName, lastName, email, password } = req.body;

		try {
			const user = new User({
				password: scryptSync(password, 'mirrage', 15).toString('hex'),
				email, firstName, lastName
			});
			await User.create(user);
			
			req.session.user = { id: user.id, type: user.type };
			await req.session.save();

			return res.status(201).json();
		} catch (err) {
			if (err.code === 11000)
				return res.status(409).json({
					code: 'BAD_REQUEST_ERROR',
					description: 'Account with given email already exists. Try another email',
					source: 'authorization_signup',
					reason: 'Conflict in database for unique values',
					metadata: {}
				});
		}
	}
}
