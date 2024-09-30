import * as React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import ObjectiveEvaluationComponent from '../components/ObjectiveEvaluation/ObjectiveEvaluation';

export default function SubjectiveEvaluation() {
  return (
    <>
    <div className={styles.container}>
      <Head>
        <title>Objective Evaluation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: 1}}>
        {/* <Typography variant='h4' sx={{textAlign: 'center', marginTop: 0}} >
          Subjective Analysis
        </Typography> */}
        <h1 className={styles.title}>
        </h1>
         <ObjectiveEvaluationComponent/>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
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
