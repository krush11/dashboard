import Head from 'next/head';

import Layout from 'components/layout/layout';
import SetupDialog from 'components/onboarding/SetupDialog';

import User from 'models/user';
import { withSessionSSR } from 'lib/ironSession';
import Company from 'models/company';

export default function Usage({ dialog, user, step, company }) {
  return (
    <div className='row row-cols-2 row-cols-lg-5'>
      <Head>
        <title>Usage &amp; Metrics - {10}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='col _card'>
        <div className='heading p-3 border bg-white h-100'>
          <div>Average tryon time</div>
          <h2 className='my-2'>{10}</h2>
        </div>
      </div>
      <div className='col _card'>
        <div className='heading p-3 border bg-white h-100'>
          <div>Average tryon time</div>
          <h2 className='my-2'>{10}</h2>
        </div>
      </div>
      <div className='col _card'>
        <div className='heading p-3 border bg-white h-100'>
          <div>Average tryon time</div>
          <h2 className='my-2'>{10}</h2>
        </div>
      </div>
      <div className='col _card'>
        <div className='heading p-3 border bg-white h-100'>
          <div>Average tryon time</div>
          <h2 className='my-2'>{10}</h2>
        </div>
      </div>
      <div className='col _card'>
        <div className='heading p-3 border bg-white h-100'>
          <div>Average tryon time</div>
          <h2 className='my-2'>{10}</h2>
        </div>
      </div>
      <SetupDialog dialog={dialog} step={step} user={user} company={company} />
    </div>
  )
}

Usage.getLayout = function getLayout(page) {
  return (<Layout>{page}</Layout>)
}

export const getServerSideProps = withSessionSSR(
  async function validateSession({ req }) {
    if (req.session.user === undefined)
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }

    let user = await User.findById(req.session.user.id);
    let company = await Company.findById(user.company).populate('team.user');

    let step = 0;
    if (company && !company.isOnboardingComplete) {
      step++;
      if (company.payment)
        step++;
    }

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        company: JSON.parse(JSON.stringify(company)),
        dialog: company && !company.isOnboardingComplete,
        step: step,
      }
    }
  }
);
