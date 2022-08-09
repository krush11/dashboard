import { withSessionRoute } from "lib/ironSession";

export default withSessionRoute(handler);

function handler(req, res) {
  req.session.destroy();
  res.status(200).json();
}

