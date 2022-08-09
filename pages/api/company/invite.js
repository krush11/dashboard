import { withSessionRoute } from "lib/ironSession";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import User from 'models/user';
import Company from 'models/company';

export default withSessionRoute(handler);

function handler(req, res) {
  if (req.method === 'POST')
    return sendInvite(req, res);
}

async function sendInvite(req, res) {
  let { email, role } = req.body;
  let { ACCESS_KEY_ID, SECRET_ACCESS_KEY } = process.env
  const user = await User.findById(req.session.user.id)
  const company = await Company.findById(user.company).populate('team.user');

  if (company.invited.some(invite => invite.email == email)) {
    return res.status(400).json({
      code: 'BAD_REQUEST_ERROR',
      description: 'Member with the given email already invited or has joined the team',
      source: 'send_invite',
      metadata: {
        user: user.id,
        company: company.id,
        invited: email
      }
    })
  }

  try {
    const client = new SESClient({
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
      },
      region: 'ap-south-1'
    });

    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Subject: {
          Data: `${user.firstName} invited you to ${company.name}`
        },
        Body: {
          Html: {
            Data: `You have been invited to collaborate on you organisation in Mirrage`
          }
        }
      },
      Source: 'Mirrage <noreply@veybit.in>'
    });

    await client.send(command);
    company.invited.push({ email, role });
    company.save();

    return res.status(200).json({});
  } catch (err) {
    // TODO/Production: remove this before production.
    // This is only here for checking in development, what isssues are there in sending mails
    console.error(err);
    return res.status(500).json({
      code: 'INTERNAL_API_ERROR',
      description: `Failed to send invite to the given mail. If the issue persists, please contact our support team`,
      source: 'send_invite',
      metadata: {
        user: user.id,
        company: company.id,
        invited: email
      }
    });
  }
}