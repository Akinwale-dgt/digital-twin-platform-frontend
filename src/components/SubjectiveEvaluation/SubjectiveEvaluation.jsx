/* eslint-disable security/detect-object-injection */
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, CircularProgress, Button } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
// import FirstStep from './ListingStepForms/FirstStep/FirstStep';
// import SecondStep from './ListingStepForms/SecondStep/SecondStep';
import styles from './SubjectiveEvaluation.module.css';
import validationSchema from './FormModel/ValidationSchema';
// import Success from '../../components/Success/Success';
// import ListingFormModel from './FormModel/ListingFormModel';
// import ThirdStep from './ListingStepForms/ThirdStep/ThirdStep';
// import CustomButton from '../../components/CustomButton/CustomButton';

function getSteps() {
  const steps = ['Discomfort', 'Cognitive Workload', 'Balance', 'Exertion', 'Situational Awareness'];
  return steps;
}

// const { formId, formField } = ListingFormModel;

function renderStepContent(
  step,
  setFieldValue,
  values,

) {
  switch (step) {
    case 0:
      return (
        <>Hello</>
        // <FirstStep
        //   isEdit={isEdit}
        //   formField={formField}
        //   providerList={providerList}
        //   setFieldValue={setFieldValue}
        //   secondaryMobileNumbersArray={secondaryMobileNumbers}
        // />
      );
    case 1:
      return (
          <>World</>
        // <SecondStep setFieldValue={setFieldValue} values={values} formField={formField} />
      );
    case 2:
      return (
          <>Yummy</>
        // <ThirdStep
        //   isEdit={isEdit}
        //   supportingDocs={supportingDocuments}
        //   setSupportDocs={setSupportDocs}
        //   values={values}
        //   providerList={providerList}
        //   privateDocs={privateDocs}
        //   setPrivateDocs={setPrivateDocs}
        // />
      );
      case 3:
      return (
          <>Yummy</>
        // <ThirdStep
        //   isEdit={isEdit}
        //   supportingDocs={supportingDocuments}
        //   setSupportDocs={setSupportDocs}
        //   values={values}
        //   providerList={providerList}
        //   privateDocs={privateDocs}
        //   setPrivateDocs={setPrivateDocs}
        // />
      );
      case 4:
      return (
          <>Yummy</>
        // <ThirdStep
        //   isEdit={isEdit}
        //   supportingDocs={supportingDocuments}
        //   setSupportDocs={setSupportDocs}
        //   values={values}
        //   providerList={providerList}
        //   privateDocs={privateDocs}
        //   setPrivateDocs={setPrivateDocs}
        // />
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


  const handleSubmit = (
    values,
    actions
  ) => {
    if (isLastStep) {
      submitForm(values , actions);
    }else {
       setActiveStep(activeStep +1);
    }
  };

  const initialValues = 'defaultValues';

  return (
    <React.Fragment>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
         ' <Success />'
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form id={'formId'}>
                {renderStepContent(
                  activeStep,
                  setFieldValue,
                  values ,
                )}

                <div className={styles.stepperButtonSection}>
                  {activeStep !== 0 && (
                    <Button type="button">
                      Back
                    </Button>
                  )}
                  <Button type="submit" isPrimary>
                    {isLastStep ? 'Request Approval' : 'Next'}
                    {/* {isSubmitting && <CircularProgress color="secondary" size={18} />} */}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}
