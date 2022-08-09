import { withSessionRoute } from "lib/ironSession";
import User from 'models/user';
import Company from 'models/company';

export default withSessionRoute(handler);

function handler(req, res) {
  if (req.method === 'GET')
    return validateSetup(req, res);
}

async function validateSetup(req, res) {
  try {
    let company = await Company.findById(req.query.companyId).populate('team.user');
    company.isOnboardingComplete = true;
    company = await company.save();
    return res.status(200).json(company);
  } catch (err) {
    return res.status(500).json(error);
  }
}
