import * as React from 'react';
import Head from 'next/head';
import styles from '../../../styles/Home.module.css';
import  SubjectiveEvaluationComponent  from '../../components/SubjectiveEvaluation/SubjectiveEvaluation'
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BASE_URL } from '../../env';
import { toast } from 'react-toastify';

export default function SubjectiveEvaluation() {
  const router = useRouter();
  const { id } = router.query;
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedExo, setSelectedExo] = React.useState('');
  const [data, setData] = React.useState('')
  const [toastShown, setToastShown] = React.useState(false); 


  React.useEffect(() => {
    if (id) {
      setSelectedExo(id);
    }
  }, [id]);

  React.useEffect(() => {
    if (!id) return;

    axios
      .get(`${BASE_URL}/usability/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if(response.data.data){
          setToastShown(false)
          setData(response.data?.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching discomfort:', error);
      });
  }, [id]);

  // toast when data is first received
  React.useEffect(() => {
    if (data && !toastShown) {
      toast.success(`ExoSkeleton ${id} has been submitted`, {
        position: 'top-right',
      });
      setToastShown(true);
    }
  }, [data, toastShown, id]);


  console.log('Data => ', data)

 
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
        <SubjectiveEvaluationComponent activeStep={activeStep} setActiveStep={setActiveStep} exoID={id} />
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
