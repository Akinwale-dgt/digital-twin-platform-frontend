import "../../styles/global.css";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import App from "next/app";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import theme from "../../src/theme";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../src/components/Header/Header";

function MyApp({ Component, pageProps: { ...pageProps } }) {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <main>
            <Component {...pageProps} />
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
