/* eslint-disable security/detect-object-injection */
import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Button,
} from '@mui/material';
import { Formik, Form } from 'formik';
import axios from 'axios';
import styles from './SubjectiveEvaluation.module.css';
import validationSchema from './FormModel/ValidationSchema';
import FirstStepForm from './StepForms/FirstStep/FirstStep';
import SecondStepForm from './StepForms/SecondStep/SecondStep';
import ThirdStepForm from './StepForms/ThirdStep/ThirdStep';
import FourthStepForm from './StepForms/FourthStep/FourthStep';
import FifthStepForm from './StepForms/FifthStep/FifthStep';
import SixthStepForm from './StepForms/SixthStep/SixthStep';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getSteps() {
  const steps = [
    'Perceived Level of Discomfort',
    'Cognitive Workload',
    'Exertion',
    'Balance',
    'Situational Awareness',
    'Usability',
  ];
  return steps;
}

function renderStepContent(step) {
  switch (step) {
    case 0:
      return <FirstStepForm />;
    case 1:
      return <SecondStepForm />;
    case 2:
      return <ThirdStepForm />;
    case 3:
      return <FourthStepForm />;
    case 4:
      return <FifthStepForm />;
    case 5:
      return <SixthStepForm />;
    default:
      return <div>Not Found</div>;
  }
}

export default function SubjectiveEvaluationComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentValidationSchema = validationSchema[activeStep];
  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const submitForm = (values) => {
    setLoading(true);
    axios
      .post('https://postman-rest-api-learner.glitch.me/api/usability', {
        ease_of_use: {
          don_and_doff: Number(values.donAndDoff),
          adjust_fitting: Number(values.adjustFitting),
          works_as_expected: Number(values.worksAsExpected),
          meets_need: Number(values.meetsNeed),
          accomplish_task: Number(values.accomplishTask),
          without_assistance: Number(values.withoutAssistance),
          work_with: Number(values.workWith),
        },
        ease_of_learning: {
          need_to_learn: Number(values.needToLearn),
          easily_learn_to_assemble: Number(values.easilyLearnToAssemble),
          easily_learn_to_adjust: Number(values.easilyLearnToAdjust),
          easily_learn_checks: Number(values.easilyLearnChecks),
          remember_how_to_use: Number(values.rememberHowToUse),
          use_again_without_assistance: Number(values.useAgainWithoutAssistance),
        },
        comfort: {
          restricts_movement: Number(values.restrictsMovement),
          interfere_with_environment: Number(values.interfereWithEnvironment),
          satisfaction: Number(values.satisfaction),
        },
      })
      .then(
        (response) => {
          toast.success('Data submitted successfully', {
            position: 'top-right',
          });
          setTimeout(() => {
            router.push('/');
          }, '2000');
        },
        (error) => {
          console.log(error.message);
          toast(error.message, {
            position: 'top-right',
          });
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  const sendSituationalAwareness = (values) => {
    axios
      .post(
        'https://digital-twin-platform.onrender.com/api/situational-awareness',
        {
          instability_of_situation: Number(values.instabilityOfSituation),
          complexity_of_situation: Number(values.complexityOfSituation),
          variability_of_situation: Number(values.variabilityOfSituation),
          arousal: Number(values.arousal),
          concentration_of_attention: Number(values.concentrationOfAttention),
          division_of_attention: Number(values.divisionOfAttention),
          spare_mental_capacity: Number(values.spareMentalCapacity),
          familiarity_with_situation: Number(values.familiarityWithSituation),
          information_quantity: Number(values.informationQuantity),
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const sendDiscomfortData = (values) => {
    axios
      .post('https://digital-twin-platform.onrender.com/api/discomfort', {
        hand_and_waist: Number(values.handWrist),
        upper_arm: Number(values.upperArm),
        shoulder: Number(values.shoulder),
        lower_back: Number(values.lowerBack),
        thigh: Number(values.thigh),
        lower_leg_and_foot: Number(values.lowerLegAndFoot),
        neck: Number(values.neck),
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const sendCognitiveWorkloadData = (values) => {
    axios
      .post(
        'https://digital-twin-platform.onrender.com/api/cognitive-workload',
        {
          mental_demand: Number(values.mentalDemand),
          physical_demand: Number(values.physicalDemand),
          temporal_demand: Number(values.temporalDemand),
          performance: Number(values.performance),
          effort: Number(values.effort),
          frustration: Number(values.frustration),
        }
      )
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const sendExertionData = (values) => {
    axios
      .post('https://digital-twin-platform.onrender.com/api/exertion', {
        rate_of_exertion: Number(values.exertion),
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const sendBalanceData = (values) => {
    axios
      .post('https://digital-twin-platform.onrender.com/api/balance', {
        rate_of_balance: Number(values.balance),
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      actions.setSubmitting(true);
      submitForm(values, actions);
      actions.setSubmitting(false);
    } else if (activeStep === 0) {
      actions.setSubmitting(true);
      sendDiscomfortData(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    } else if (activeStep === 1) {
      actions.setSubmitting(true);
      sendCognitiveWorkloadData(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    } else if (activeStep === 2) {
      actions.setSubmitting(true);
      sendExertionData(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    } else if (activeStep === 3) {
      actions.setSubmitting(true);
      sendBalanceData(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    } else if (activeStep === 4) {
      actions.setSubmitting(true);
      sendSituationalAwareness(values);
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                marginTop: '16px',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              {label}
            </StepLabel>
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
            mentalDemand: 0,
            physicalDemand: 0,
            temporalDemand: 0,
            performance: 0,
            effort: 0,
            frustration: 0,
            exertion: 0,
            balance: 0,
            familiarityWithSituation: 0,
            informationQuantity: 0,
            spareMentalCapacity: 0,
            divisionOfAttention: 0,
            concentrationOfAttention: 0,
            arousal: 0,
            variabilityOfSituation: 0,
            complexityOfSituation: 0,
            instabilityOfSituation: 0,
            donAndDoff: 0,
            adjustFitting: 0,
            worksAsExpected: 0,
            meetsNeed: 0,
            accomplishTask: 0,
            withoutAssistance: 0,
            workWith: 0,
            needToLearn: 0,
            easilyLearnToAssemble: 0,
            easilyLearnToAdjust: 0,
            easilyLearnChecks: 0,
            rememberHowToUse: 0,
            useAgainWithoutAssistance: 0,
            restrictsMovement: 0,
            interfereWithEnvironment: 0,
            satisfaction: 0,
          }}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form id={'subjectiveEvaluation'}>
              {renderStepContent(activeStep, setFieldValue, values)}
              <div className={styles.stepperButtonSection}>
                {activeStep !== 0 && (
                  <Button type='button' onClick={handleBack}>
                    Back
                  </Button>
                )}
                <Button type='submit'>
                  {isLastStep ? 'Submit Data' : 'Next'}
                  {loading && <CircularProgress color='secondary' size={18} />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </React.Fragment>
  );
}
