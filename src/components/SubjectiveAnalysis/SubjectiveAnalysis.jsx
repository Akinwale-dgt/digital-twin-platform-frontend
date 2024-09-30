import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import FirstStepAnalysis from '../SubjectiveAnalysis/StepAnalysis/FirstStep/FirstStep'
import SecondStepAnalysis from '../SubjectiveAnalysis/StepAnalysis/SecondStep/SecondStep'
import ThirdStepAnalysis from '../SubjectiveAnalysis/StepAnalysis/ThirdStep/ThirdStep'
import FourthStepAnalysis from '../SubjectiveAnalysis/StepAnalysis/FourthStep/FourthStep'
import FifthStepAnalysis from '../SubjectiveAnalysis/StepAnalysis/FifthStep/FifthStep'
import styles from '../../components/SubjectiveEvaluation/SubjectiveEvaluation.module.css'
import SixthStepAnalysis from '../SubjectiveAnalysis/StepAnalysis/SixthStep/SixthStep'
import axios from 'axios';

const steps = ['Perceived Level of Discomfort', 'Cognitive Workload', 'Balance', 'Exertion', 'Situational Awareness', 'Overall Analysis'];

function renderStepContent(
  step,
  data
) {
  switch (step) {
    case 0:
      return (
        <FirstStepAnalysis data={data} />
      );
    case 1:
      return (
         <SecondStepAnalysis data={data}/>
      );
    case 2:
      return (
           <ThirdStepAnalysis data={data}/>
      );
      case 3:
      return (
          <FourthStepAnalysis data={data}/>
      );
      case 4:
      return (
           <FifthStepAnalysis  data={data} />
      );
         case 5:
      return (
           <SixthStepAnalysis  data={data} />
      );
    default:
      return <div>Not Found</div>;
  }
}

export default function SubjectiveAnalysisComponent() {
  const [data, setData] = React.useState({});
  const getAnalysisResult = () => {
    axios.get('https://digital-twin-platform.onrender.com/api/analyze-subjective-data')
  .then((response) => {
    setData(response.data)
  }, (error) => {
      console.log(error.message);
      toast(error.message, {
        position: "top-right"
    });
    });
  };

  React.useEffect(()=>{
    getAnalysisResult();
  },[])

  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1, py: 1 }}>
               {renderStepContent(
                  activeStep,
                  data
                )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}  className={styles.stepperButtonSection}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            </Box>
          </React.Fragment>
      </div>
    </Box>
  );
}
