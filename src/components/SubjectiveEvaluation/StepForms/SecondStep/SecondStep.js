import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';

export default function SecondStepForm(props) {
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
          We are interested in the workload you experienced while completing
          this task. As workload can be caused by several different factors, we
          ask you to rate several of the factors individually on the scales
          provided.
          <strong>Note: </strong>Performance goes from good on the left to bad
          on the right.
        </Typography>
        <Box>
          <fieldset className={styles.fieldsetStyle}>
            <legend>Choose your rating</legend>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                <strong>Mental Demand: </strong>How mentally demanding was the
                task?
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <span className={styles.spanStyle}>Very Low</span>
                <label>
                  <Field type='radio' name='mentalDemand' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='mentalDemand' value='20' />
                  20
                </label>

                <span className={styles.spanStyle}>Very High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'mentalDemand'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                <strong>Physical Demand: </strong>How physically demanding was
                the task?
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <span className={styles.spanStyle}>Very Low</span>
                <label>
                  <Field type='radio' name='physicalDemand' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='physicalDemand' value='20' />
                  20
                </label>
                <span className={styles.spanStyle}>Very High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'physicalDemand'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                <strong>Temporal Demand: </strong>How hurried or rushed was the
                pace of the task?
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <span className={styles.spanStyle}>Very Low</span>
                <label>
                  <Field type='radio' name='temporalDemand' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='temporalDemand' value='20' />
                  20
                </label>
                <span className={styles.spanStyle}>Very High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'temporalDemand'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                <strong>Performance: </strong>How successful were you in
                accomplishing what you were asked to do?
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <span className={styles.spanStyle}>Perfect</span>
                <label>
                  <Field type='radio' name='performance' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='performance' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='performance' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='performance' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='performance' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='performance' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='performance' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='performance' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='performance' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='performance' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='performance' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='performance' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='performance' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='performance' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='performance' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='performance' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='performance' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='performance' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='performance' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='performance' value='20' />
                  20
                </label>
                <span className={styles.spanStyle}>Failure</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'performance'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                <strong>Effort: </strong>How hard did you have to work to
                accomplish your level of performance?
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <span className={styles.spanStyle}>Very Low</span>
                <label>
                  <Field type='radio' name='effort' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='effort' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='effort' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='effort' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='effort' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='effort' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='effort' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='effort' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='effort' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='effort' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='effort' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='effort' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='effort' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='effort' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='effort' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='effort' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='effort' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='effort' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='effort' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='effort' value='20' />
                  20
                </label>
                <span className={styles.spanStyle}>Very High</span>
              </Box>

              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'effort'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                <strong>Frustration: </strong>How insecure, discouraged,
                irritated, stressed, and annoyed were you?
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <span className={styles.spanStyle}>Very Low</span>
                <label>
                  <Field type='radio' name='frustration' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='frustration' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='frustration' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='frustration' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='frustration' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='frustration' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='frustration' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='frustration' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='frustration' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='frustration' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='frustration' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='frustration' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='frustration' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='frustration' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='frustration' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='frustration' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='frustration' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='frustration' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='frustration' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='frustration' value='20' />
                  20
                </label>
                <span className={styles.spanStyle}>Very High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'frustration'}
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
