import '../../styles/global.css';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import App from 'next/app';
import { Fragment } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import theme from '../../src/theme'

import React from 'react';


function MyApp({ Component, pageProps: { ...pageProps } }) {

  return (
    <>
      <ToastContainer autoClose={2000} />
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
                <main>
                    <Fragment>
                    <Component {...pageProps} />
                  </Fragment>
                </main> 
            </ThemeProvider>
          </StyledEngineProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;

