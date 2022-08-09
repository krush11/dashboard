import Company from 'models/company';
import User from 'models/user';
import { withSessionRoute } from 'lib/ironSession';

export default withSessionRoute(handler);

function handler(req, res) {
  if (req.method === 'POST')
    createCompany(req, res);
}

async function createCompany(req, res) {
  let { employeeSize, companyName, userRole } = req.body;
  let { user } = req.session;

  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let apiKey = 'veybit_', apiSecret = '', charactersLength = characters.length;
  for (let i = 0; i < 15; i++)
    apiKey += characters.charAt(Math.floor(Math.random() * charactersLength));
  for (let i = 0; i < 30; i++)
    apiSecret += characters.charAt(Math.floor(Math.random() * charactersLength));

  const company = new Company({
    employeeSize, apiKey, apiSecret,
    name: companyName,
    team: [{
      user: user.id,
      isAdmin: true,
      role: 'manager',
      position: userRole
    }]
  });
  Promise.all([
    Company.create(company),
    User.findByIdAndUpdate(user.id, { company: company.id })
  ]).then(async ([company, user]) => {
    await company.populate('team.user');
    return res.status(201).json(company);
  }).catch(error => {
    if (err.code == 11000)
      return res.status(406).json({
        code: 'BAD_REQUEST_ERROR',
        description: `This account is already linked with a company.
         If this was a mistake, please contact our support team or 
         send us a mail at support@veybit.in`,
        source: 'create_company',
        reason: 'conflicting_db_state',
        metadata: {}
      });
  });
}