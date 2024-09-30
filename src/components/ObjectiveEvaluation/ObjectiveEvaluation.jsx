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

function getSteps() {
  const steps = ['Cognitive Workload', 'Exertion', 'Balance'];
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
        ' <SecondStepForm/>'
      );
    case 2:
      return (
          ' <ThirdStepForm/>'
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

  const submitForm = (values) => {
    axios.post('https://digital-twin-platform.onrender.com/api/situational-awareness', {
    instability_of_situation: Number(values.instabilityOfSituation),
    complexity_of_situation: Number(values.complexityOfSituation) ,
    variability_of_situation: Number(values.variabilityOfSituation),
    arousal: Number(values.arousal),
    concentration_of_attention: Number(values.concentrationOfAttention),
    division_of_attention: Number(values.divisionOfAttention),
    spare_mental_capacity: Number(values.spareMentalCapacity),
    familiarity_with_situation: Number(values.familiarityWithSituation),
    information_quantity: Number(values.informationQuantity)
  })
  .then((response) => {
    toast.success(response.data.message, {
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
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const sendDiscomfortData =(values)=> {
    axios.post('https://digital-twin-platform.onrender.com/api/discomfort', {
    hand_and_waist: Number(values.handWrist),
    upper_arm: Number(values.upperArm) ,
    shoulder: Number(values.shoulder),
    lower_back: Number(values.lowerBack),
    thigh: Number(values.thigh),
    lower_leg_and_foot: Number(values.lowerLegAndFoot),
    neck: Number(values.neck)
  })
  .then((response) => {
    console.log(response);
  }, (error) => {
      console.log(error);
    });
  }

const sendCognitiveWorkloadData = (values) => {
  axios.post('https://digital-twin-platform.onrender.com/api/cognitive-workload', {
    mental_demand: Number(values.mentalDemand),
    physical_demand: Number(values.physicalDemand) ,
    temporal_demand: Number(values.temporalDemand),
    performance: Number(values.performance),
    effort: Number(values.effort),
    frustration: Number(values.frustration),
  })
  .then((response)=> {
    console.log(response);
  },(error)=>{
    console.log(error)
  })
}

const sendExertionData = (values) => {
  axios.post('https://digital-twin-platform.onrender.com/api/exertion', {
    rate_of_exertion: Number(values.exertion),
  })
  .then((response)=> {
    console.log(response);
  },(error)=>{
    console.log(error)
  })
}

const sendBalanceData = (values) => {
  axios.post('https://digital-twin-platform.onrender.com/api/balance', {
    rate_of_balance: Number(values.balance),
  })
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
       console.log(values)
      //  sendDiscomfortData(values)
       setActiveStep(activeStep +1);
        actions.setSubmitting(false);
    }else if (activeStep === 1) {
      actions.setSubmitting(true);
        console.log(values)
      // sendCognitiveWorkloadData(values);
      //  setActiveStep(activeStep +1);
       actions.setSubmitting(false);
    }else if (activeStep === 2) {
      actions.setSubmitting(true);
        console.log(values)
      // sendExertionData(values);
      //  setActiveStep(activeStep +1);
       actions.setSubmitting(false);
    }else if (activeStep === 3) {
      actions.setSubmitting(true);
        console.log(values)
      // sendBalanceData(values);
      //  setActiveStep(activeStep +1);
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
              congnitiveWorkload: [],
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
                    {isSubmitting && <CircularProgress color="secondary" size={18} />}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
    </React.Fragment>
  );
}
