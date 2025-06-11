/* eslint-disable security/detect-object-injection */
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, CircularProgress, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import axios from 'axios';
import styles from './ObjectiveEvaluation.module.css';
import validationSchema from './FormModels/ValidationSchema';
import FirstStepForm from './StepForms/FirstStep/FirstStep';
import SecondStepForm from './StepForms/SecondStep/SecondStep';
import ThirdStepForm from './StepForms/ThirdStep/ThirdStep';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../env';

function getSteps() {
  const steps = ['Cognitive Workload', 'Fall Risk', 'Exertion'];
  return steps;
}

function renderStepContent(
  step,
  setFieldValue,
  values
) {
  switch (step) {
    case 0:
      return (
        <FirstStepForm setFieldValue={setFieldValue} values={values} />
      );
    case 1:
      return (
         <SecondStepForm setFieldValue={setFieldValue} values={values}/>
      );
    case 2:
      return (
          <ThirdStepForm setFieldValue={setFieldValue} values={values} />
      );
    default:
      return <div>Not Found</div>;
  }
}

export default function ObjectiveEvaluationComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter()

  const currentValidationSchema = validationSchema[activeStep];
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;
  const [loading, setLoading] = useState(false);

  const submitForm = (values) => {
    setLoading(true);
    const exertionRequestBody = new FormData();
    exertionRequestBody.append('input-data', values.exertion[0])
    exertionRequestBody.append('measure', 'exertion')

    axios.post(`${BASE_URL}/upload-file`, exertionRequestBody)
    .then((response) => {
      toast.success('Files uploaded successfully', {
        position: "top-right"
      });
      setTimeout(() => {
        router.push('/');
      }, "2000");
    }, (error) => {
        console.log(error.message);
        toast(error.message, {
          position: "top-right"
      });
    }).finally(()=>{
      setLoading(false);
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

const sendCognitiveWorkloadData = (values) => {
  const cognitiveWorkloadRequestBody = new FormData();
  cognitiveWorkloadRequestBody.append('input-data', values.cognitiveWorkloads[0])
  cognitiveWorkloadRequestBody.append('measure', 'cognitive-workload')

  axios.post(`${BASE_URL}/upload-file`, cognitiveWorkloadRequestBody)
  .then((response)=> {
    console.log(response);
  },(error)=>{
    console.log(error)
  })
}

const sendFallRiskData = (values) => {
  const fallRiskRequestBody = new FormData();
  console.log(values)
  fallRiskRequestBody.append('input-data', values.fallRisk[0])
  fallRiskRequestBody.append('measure', 'fall-risk')

  axios.post(`${BASE_URL}/upload-file`, fallRiskRequestBody)
  .then((response)=> {
    console.log(response);
  },(error)=>{
    console.log(error)
  })
}

  const handleSubmit = (
    values,
    actions
  ) => {
    if (isLastStep) {
       actions.setSubmitting(true);
        submitForm(values , actions);
        actions.setSubmitting(false);
    }else if(activeStep === 0) {
       actions.setSubmitting(true);
       sendCognitiveWorkloadData(values)
       setActiveStep(activeStep +1);
        actions.setSubmitting(false);
    }else if (activeStep === 1) {
      actions.setSubmitting(true);
      sendFallRiskData(values);
      setActiveStep(activeStep +1);
      actions.setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{
              marginTop: '16px',
          fontSize: '18px',
          fontWeight: '700',
            }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
         'Go back'
        ) : (
          <Formik
             initialValues={{
              cognitiveWorkloads: [],
              exertion: [],
              fallRisk: [],
          }}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form id={'objectiveEvaluation'}>
                {renderStepContent(
                  activeStep,
                  setFieldValue,
                  values,
                )}
                <div className={styles.stepperButtonSection}>
                  {activeStep !== 0 && (
                    <Button type="button" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button type="submit">
                    {isLastStep ? 'Submit Data' : 'Next'}
                    {loading && <CircularProgress color="secondary" size={18} />}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
    </React.Fragment>
  );
}
