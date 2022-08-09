import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import { Button, Center, Text, TextInput, Title } from '@mantine/core';
import { withSessionSSR } from 'lib/ironSession';
import showErrorNotification from 'template/notifications/error';

export default function Page() {
  const [requestProcessing, setRequestProcessing] = useState(false);
  const router = useRouter();

  async function signup(e) {
    e.preventDefault();
    let element = e.target;
    try {
      let { email, password, firstName, lastName } = element;
      setRequestProcessing(true);
      const response = await axios({
        method: 'POST',
        url: '/api/auth/signup',
        data: {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value,
        }
      });
      router.push('/');
    } catch (err) {
      setRequestProcessing(false);
      showErrorNotification('Authentication error', err.response.data.description);
    }
  }

  return (
    <Center>
      <Head>
        <title>Signup - Mirrage</title>
        <meta name='description' content='Start taking your business to the next level
         with the next big thing by creating an account on Mirrage. ' />
      </Head>
      <Center style={{ width: '60%' }}>
        <div style={{ width: '650px' }}>
          <Link href='/'><a>
            <Image src='/images/veybit.png' height={50} width={50} alt='Mirrage logo' />
          </a></Link>
          <div>
            <div className='my-4'>
              <Title order={2}>Start using Mirrage</Title>
              <Text size='sm' color='dimmed'>
                Join us in growing your business with the best new thing in market
              </Text>
            </div>
            <form onSubmit={signup}>
              <span className='d-flex flex-row'>
                <TextInput
                  id='firstName' label='First Name'
                  type='text' name='firstName'
                  className='mb-3 w-50 pe-3' required />
                <TextInput
                  id='lastName' label='Last Name'
                  type='text' name='lastName'
                  className='mb-3 w-50 pe-3' />
              </span>
              <TextInput
                id='email' label='Email'
                type='email' name='email'
                className='mb-3' required />
              <span className='d-flex flex-row'>
                <TextInput
                  id='password' label='Password'
                  type='password' name='password'
                  className='mb-3 w-50 pe-3' required />
                <TextInput
                  id='confirmPassword' label='Confirm password'
                  type='password' name='confirmPassword'
                  className='mb-3 w-50' required />
              </span>
              <span>
                By creating an account, you agree to our&nbsp;
                <Link href='/terms'><a>Terms</a></Link>
                &nbsp;and have read and acknowledge the&nbsp;
                <Link href='/privacy'><a>Privacy Statement</a></Link>.
              </span>
              <Button variant='filled' fullWidth style={{ marginTop: 20 }}
                loading={requestProcessing} loaderPosition='right' type='submit'>
                Create account</Button>
            </form>
            <Center className='mx-0 my-3 text-center'>
              <span>Already have an account?&nbsp;</span>
              <Link href='/login'><a>Log in</a></Link>
            </Center>
          </div>
        </div>
      </Center>
      <div style={{ width: '40%' }} className='illustration-sec bg-light h-100' id='illustration-sec'>
        <h3 className='quote-line' />
      </div>
    </Center >
  )
}

export const getServerSideProps = withSessionSSR(
  async function validateSession({ req }) {
    if (req.session.user !== undefined)
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    return { props: {} };
  }
);
