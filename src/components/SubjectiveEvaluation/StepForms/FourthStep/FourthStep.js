import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';

export default function FourthStepForm(props) {
  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography
          variant='p'
          sx={{
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: '500',
            marginTop: '20px',
          }}
        >
          For the condition you just completed, please rate your perceived
          balance during the task on a scale of 1 to 10, where 1 represents
          steady balance and 10 represents unsteady balance.
        </Typography>
        <Box>
          <fieldset className={styles.fieldsetStyle}>
            <legend>Choose your rating</legend>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Perceived Balance Rating
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='balance' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='balance' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='balance' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='balance' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='balance' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='balance' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='balance' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='balance' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='balance' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='balance' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'balance'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
          </fieldset>
        </Box>
      </Box>
    </React.Fragment>
  );
}
