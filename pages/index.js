import { Center, Text } from '@mantine/core';
import Head from 'next/head';

import Layout from 'components/layout/layout';
import SetupDialog from 'components/onboarding/SetupDialog';

import User from 'models/user';
import { withSessionSSR } from "lib/ironSession";
import Company from 'models/company';

export default function Page({ user, dialog, step, company }) {
  return (
    <Center className='h-100'>
      <Head>
        <title>{company ? `${company.name} -` : null} Mirrage dashboard</title>
        <meta name='description' content='Sign into your account to access analytics
        of your business' />
      </Head>
      <div>
        <Text className='fs-3'>Please select an option</Text>
        <Text color='dimmed'>(TODO/dev: add a arrow pointing to the navbar)</Text>
      </div>
      {dialog && <SetupDialog dialog={dialog} step={step} user={user} company={company} />}
    </Center>
  )
}

Page.getLayout = function getLayout(page) {
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
        company: company && JSON.parse(JSON.stringify(company)),
        dialog: company == null ? true : !company.isOnboardingComplete,
        step: step,
      }
    };
  }
);
