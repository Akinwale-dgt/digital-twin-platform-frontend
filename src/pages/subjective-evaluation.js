import * as React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import  SubjectiveEvaluationComponent  from '../components/SubjectiveEvaluation/SubjectiveEvaluation'
import { Typography } from '@mui/material';

export default function SubjectiveEvaluation() {
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Subjective Evaluation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant='h4' sx={{textAlign: 'center'}} >
         Please fill in the form correctly
        </Typography>
        <SubjectiveEvaluationComponent/>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
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
