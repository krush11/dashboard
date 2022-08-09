import 'styles/global/_App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@fontsource/ibm-plex-sans';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)

  let defaultTheme = {
    colorScheme: 'light',
    focusRing: 'never',
    spacing: {
      xs: 4,
      sm: 12,
      md: 18,
      lg: 24,
      xl: 30
    }
  }

  return getLayout(
    <>
      <MantineProvider theme={defaultTheme}>
        <ModalsProvider>
          <NotificationsProvider limit={4}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </>
  )
}
