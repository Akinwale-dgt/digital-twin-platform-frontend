import * as React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import { Button } from '@mui/material';
import ModelViewer from '../components/ModelViewer/ModelViewer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [openAnalysis, setAnalysisOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setAnalysisOpen(false);
  };

  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const getAnalysisResult = () => {
    setLoading(true);
    axios
      .get(
        'https://digital-twin-platform.onrender.com/api/analyze-subjective-data'
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        toast(error.message, {
          position: 'top-right',
        });
      })
      .finally(() => {
        setLoading(false);
        handleCloseDialog();
      });
  };

  const discomfortData = data?.data?.discomfort;

  const situationalData = data?.data?.situational_awareness;
  const balanceData = data?.data?.balance;
  const exertionData = data?.data?.exertion;
  const cognitiveWorkload = data?.data?.cognitiveWorkload;
  const weightedSumRating = data?.data?.weightedSumRating;
  const roundSumRating = Math.round(weightedSumRating);

  const visitSubjectiveEvaluation = () => {
    router.push('/subjective-evaluation');
  };

  const cognitiveLevel = (cognitiveWorkload?.totalAverage / 120) * 100;

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Digital Twin Platform</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.column}>
              <Button onClick={visitSubjectiveEvaluation}>Data Input</Button>
            </div>

            <div className={styles.column}>
              <Button onClick={getAnalysisResult}>Analyse Risk</Button>
              <div className={styles.modelColumn}>
                <ModelViewer
                  lowerBack={true}
                  lowerBackHighlightLevel={discomfortData?.average_lower_back}
                  cognitive={true}
                  cognitiveLevel={cognitiveLevel}
                />
              </div>
            </div>
          </div>
        </main>

        <style jsx>{`
          main {
            padding: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          footer {
            width: 100%;
            height: 100px;
            border-top: 1px solid #eaeaea;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
          }
        `}</style>

        <style jsx global>{`
          html,
          body {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
          }
          * {
            box-sizing: border-box;
          }
        `}</style>
      </div>
    </>
  );
}
