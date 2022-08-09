import { Button, Center, Group, Image, Text, TextInput, Title } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { withSessionSSR } from 'lib/ironSession';
import ArrowLeftShort from 'public/icons/arrow-left-short.svg';

export default function Forgot() {
  const [requestProcessing, setRequestProcessing] = useState(false);

  async function forgot(e) {
    setRequestProcessing(true);
    e.preventDefault();
  }

  return (
    <Center>
      <Head>
        <title>Forgot Password - Mirrage</title>
        <meta name='description' content='Forgot your password? Reset password
        by getting an link on your mail' />
      </Head>
      <Center style={{ width: '60%' }}>
        <div style={{ width: '500px' }}>
          <Link href='/'><a>
            <Image src='/images/veybit.png' height={50} width={50} alt='Mirrage logo' />
          </a></Link>
          <div>
            <div className='mt-4 mb-2'>
              <Title order={2}>Forgot password?</Title>
              <Text size='sm' color='dimmed'>
                Recieve a quick link and recover your account
              </Text>
            </div>
            <form onSubmit={forgot}>
              <TextInput className='my-3' id='email' name='email' type='email' label='Email' required />
              <Group position="apart" mt="xs">
                <Link href='/login'>
                  <a>
                    <Center inline>
                      <ArrowLeftShort />
                      <Text align='center' color='blue' size='sm'>Back to login page</Text>
                    </Center>
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
    </Center>
  );
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
