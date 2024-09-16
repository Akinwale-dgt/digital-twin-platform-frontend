import * as React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {Button} from '@mui/material'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from '../data'
import PieChart from "../components/piechart";
import {BarChart} from "../components/barchart";
import Image from 'next/image'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router'
import HumanBody from '../images/vecteezy_silhouette-of-a-human-body_-min-Photoroom.png'


export default function Home() {
  const router = useRouter()
  Chart.register(CategoryScale);
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year), 
    datasets: [
      {
        minBarLength: 50,
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const visitSubjectiveEvaluation = () => {
    router.push('/subjective-evaluation');
  }

    const visitOjectiveEvaluation = () => {
    router.push('/objective-evaluation');
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Choose your preferred data input evaluation"}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Button autoFocus  onClick={visitSubjectiveEvaluation}>
            Subjective 
          </Button>
          <Button  onClick={visitOjectiveEvaluation} autoFocus>
            Objective 
          </Button>
        </DialogContent>
      </Dialog>
    <div className={styles.container}>
      <Head>
        <title>Twin Digital Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#">Twin Digital Platform!</a>
        </h1>
        <div className={styles.buttonSection}>
          <div>

          <Button  onClick={handleClickOpen}>
            Data Input
          </Button>
          </div>
          <div>
          <Button>
            Analyse Risk
          </Button>
            </div>
        </div>
        <div className={styles.flexContainer}>
          <div className={styles.column}>
        
            <div>
               <PieChart chartData={chartData} />
            </div>
          </div>
          <div className={styles.column}>
            <div>
              <Image
                className={styles.rotatingImage}
                src={HumanBody}
                width={600}
                height={1000}
                alt="Picture of the a human body"
              />
            </div>
          </div>
          <div className={styles.column}>
          
            <div>
               <BarChart chartData={chartData} />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
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
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
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
