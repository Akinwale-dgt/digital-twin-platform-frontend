import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';

export default function SixthStepForm(props) {
  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Box>
          <Typography
            variant='p'
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              marginTop: '20px',
            }}
          >
            Ease of use
          </Typography>
          <Box>
            <fieldset className={styles.fieldsetStyle}>
              <legend>Choose your rating</legend>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I can easily don (put on) and doff (take off) the exoskeleton?
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='donAndDoff' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='donAndDoff' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='donAndDoff' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='donAndDoff' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='donAndDoff' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'donAndDoff'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I can easily adjust the exoskeleton to my fitting.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='adjustFitting' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='adjustFitting' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='adjustFitting' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='adjustFitting' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='adjustFitting' value='5' />5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'adjustFitting'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  It works the way I want it to work.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='worksAsExpected' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='worksAsExpected' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='worksAsExpected' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='worksAsExpected' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='worksAsExpected' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'worksAsExpected'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  It meets my needs for completing the task.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='meetsNeed' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='meetsNeed' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='meetsNeed' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='meetsNeed' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='meetsNeed' value='5' />5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'meetsNeed'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  It makes the task I want to accomplish easier to get done.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='accomplishTask' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='accomplishTask' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='accomplishTask' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='accomplishTask' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='accomplishTask' value='5' />5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>

                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'accomplishTask'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I can use this exoskeleton without assistance.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='withoutAssistance' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='withoutAssistance' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='withoutAssistance' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='withoutAssistance' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='withoutAssistance' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'withoutAssistance'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I prefer working with it than without it.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='workWith' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='workWith' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='workWith' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='workWith' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='workWith' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'workWith'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
            </fieldset>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '20px',
          }}
        >
          <Typography
            variant='p'
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              marginTop: '40px',
            }}
          >
            Ease of learning
          </Typography>
          <Box>
            <fieldset className={styles.fieldsetStyle}>
              <legend>Choose your rating</legend>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I needed to learn a lot of things before I could get going
                  with this exoskeleton.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='needToLearn' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='needToLearn' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='needToLearn' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='needToLearn' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='needToLearn' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'needToLearn'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I could easily learn how to assemble the different parts of
                  the exoskeleton.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field
                      type='radio'
                      name='easilyLearnToAssemble'
                      value='1'
                    />
                    1
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='easilyLearnToAssemble'
                      value='2'
                    />
                    2
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='easilyLearnToAssemble'
                      value='3'
                    />
                    3
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='easilyLearnToAssemble'
                      value='4'
                    />
                    4
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='easilyLearnToAssemble'
                      value='5'
                    />
                    5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'easilyLearnToAssemble'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I could easily learn how to adjust the fitting of the
                  exoskeleton.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='easilyLearnToAdjust' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnToAdjust' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnToAdjust' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnToAdjust' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnToAdjust' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'easilyLearnToAdjust'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I could easily learn different checks required to understand
                  the fitting of this exoskeleton.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='easilyLearnChecks' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnChecks' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnChecks' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnChecks' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='easilyLearnChecks' value='5' />5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'easilyLearnChecks'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I can easily remember how to use it.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='rememberHowToUse' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='rememberHowToUse' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='rememberHowToUse' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='rememberHowToUse' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='rememberHowToUse' value='5' />5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>

                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'rememberHowToUse'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I can use this exoskeleton again without the assistance of any
                  technical personnel.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field
                      type='radio'
                      name='useAgainWithoutAssistance'
                      value='1'
                    />
                    1
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='useAgainWithoutAssistance'
                      value='2'
                    />
                    2
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='useAgainWithoutAssistance'
                      value='3'
                    />
                    3
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='useAgainWithoutAssistance'
                      value='4'
                    />
                    4
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='useAgainWithoutAssistance'
                      value='5'
                    />
                    5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'useAgainWithoutAssistance'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
            </fieldset>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: '20px',
          }}
        >
          <Typography
            variant='p'
            sx={{
              fontSize: '20px',
              fontWeight: '500',
              marginTop: '20px',
            }}
          >
            Comfort
          </Typography>
          <Box>
            <fieldset className={styles.fieldsetStyle}>
              <legend>Choose your rating</legend>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  The exoskeleton restricts my movement.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='restrictsMovement' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='restrictsMovement' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='restrictsMovement' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='restrictsMovement' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='restrictsMovement' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'restrictsMovement'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  The exoskeleton was interfering with my work environment.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field
                      type='radio'
                      name='interfereWithEnvironment'
                      value='1'
                    />
                    1
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='interfereWithEnvironment'
                      value='2'
                    />
                    2
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='interfereWithEnvironment'
                      value='3'
                    />
                    3
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='interfereWithEnvironment'
                      value='4'
                    />
                    4
                  </label>
                  <label>
                    <Field
                      type='radio'
                      name='interfereWithEnvironment'
                      value='5'
                    />
                    5
                  </label>

                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'interfereWithEnvironment'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
              <Box>
                <Typography variant={'p'} id='my-radio-group'>
                  I am satisfied with using the exoskeleton.
                </Typography>
                <Box
                  role='group'
                  aria-labelledby='my-radio-group'
                  className={styles.formField}
                >
                  <span className={styles.spanStyle}>Low</span>
                  <label>
                    <Field type='radio' name='satisfaction' value='1' />1
                  </label>
                  <label>
                    <Field type='radio' name='satisfaction' value='2' />2
                  </label>
                  <label>
                    <Field type='radio' name='satisfaction' value='3' />3
                  </label>
                  <label>
                    <Field type='radio' name='satisfaction' value='4' />4
                  </label>
                  <label>
                    <Field type='radio' name='satisfaction' value='5' />5
                  </label>
                  <span className={styles.spanStyle}>High</span>
                </Box>
                <Box className={styles.errorSectionContainer}>
                  <ErrorMessage
                    component='span'
                    name={'satisfaction'}
                    className={styles.errorSection}
                  />
                </Box>
              </Box>
            </fieldset>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
