/* eslint-disable security/detect-object-injection */
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, CircularProgress, Button } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import axios from 'axios';
import styles from './SubjectiveEvaluation.module.css';
import validationSchema from './FormModel/ValidationSchema';
import FirstStepForm from './StepForms/FirstStep/FirstStep';

function getSteps() {
  const steps = ['Perceived Level of Discomfort', 'Cognitive Workload', 'Balance', 'Exertion', 'Situational Awareness'];
  return steps;
}

function renderStepContent(
  step,
) {
  switch (step) {
    case 0:
      return (
        <FirstStepForm/>
      );
    case 1:
      return (
         <FirstStepForm/>
      );
    case 2:
      return (
           <FirstStepForm/>
      );
      case 3:
      return (
          <FirstStepForm/>
      );
      case 4:
      return (
           <FirstStepForm/>
      );
    default:
      return <div>Not Found</div>;
  }
}



export default function SubjectiveEvaluationComponent() {
  const [activeStep, setActiveStep] = useState(0);

  const currentValidationSchema = validationSchema[activeStep];
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const submitForm = (values, actions) => {
   console.log(values)
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


  const handleSubmit = (
    values,
    actions
  ) => {
    if (isLastStep) {
      submitForm(values , actions);
    }else if(activeStep === 0) {
       actions.setSubmitting(true);
       sendDiscomfortData(values)
      console.log(values)
       setActiveStep(activeStep +1);
        actions.setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
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
              handWrist: 0,
              lowerBack: 0,
              lowerLegAndFoot: 0,
              neck: 0,
              upperArm: 0,
              thigh: 0,
              shoulder: 0,
              discomfortLevel: ''
      }}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form id={'subjectiveEvaluation'}>
                {renderStepContent(
                  activeStep,
                  setFieldValue,
                  values ,
                )}

                <div className={styles.stepperButtonSection}>
                  {activeStep !== 0 && (
                    <Button type="button" onClick={handleBack}>
                      Back
                    </Button>
                  )}
                  <Button type="submit">
                    {isLastStep ? 'Request Approval' : 'Next'}
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
