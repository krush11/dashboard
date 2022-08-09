import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Router from 'next/router';
import { Button, Center, Group, Text, TextInput, Title } from '@mantine/core';
import showErrorNotification from 'template/notifications/error';
import { useState } from 'react';
import { withSessionSSR } from 'lib/ironSession';
import Head from 'next/head';

export default function Login() {
  const [requestProcessing, setRequestProcessing] = useState(false);

  async function login(e) {
    e.preventDefault();
    try {
      let data = { email: e.target.email.value, password: e.target.password.value };
      setRequestProcessing(true);
      await axios.post('/api/auth/login', data);
      Router.push('/');
    } catch (err) {
      setRequestProcessing(false);
      showErrorNotification('Authentication error', err.response.data.description);
    }
  }

  return (
    <Center>
      <Head>
        <title>Log into your account - Mirrage</title>
        <meta name='description' content='Sign into your account to access analytics
        of your business' />
      </Head>
      <Center style={{ width: '60%' }}>
        <div style={{ width: '500px' }}>
          <Link href='/'><a>
            <Image src='/images/veybit.png' height={50} width={50} alt='Mirrage logo' />
          </a></Link>
          <div>
            <div className='mt-4 mb-2'>
              <Title order={2}>Welcome to Mirrage</Title>
              <Text size='sm' color='dimmed'>See your growth and get analytics</Text>
            </div>

            <form onSubmit={login}>
              <TextInput className='my-3' id='email' name='email' type='email'
                label='Email' required />
              <div className='my-3'>
                <Group position='apart' mb={5}>
                  <Group spacing='xs'>
                    <Text inline htmlFor='password' size='sm'>Password</Text>
                    <Text inline color='red'>*</Text>
                  </Group>
                  <Link href='/forgot'>
                    <a><Text size='sm' color='blue'>Forgot Password?</Text></a>
                  </Link>
                </Group>
                <TextInput id='password' name='password' type='password' required />
              </div>
              <Group position='apart' mt='xs'>
                <Link href='/signup'>
                  <a>
                    <Text align='center' color='blue' size='sm'>
                      Don't have an account? Signup
                    </Text>
                  </a>
                </Link>
                <Button variant='filled' className='w-25'
                  loading={requestProcessing} loaderPosition='right'
                  type='submit'>Login</Button>
              </Group>
            </form>
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
