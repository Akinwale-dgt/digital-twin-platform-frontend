import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import styles from './FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';
import RatingImage from '../../../../images/Picture2.png'
import Image from 'next/image'

export default function FirstStepForm(props) {
  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography
          variant='p'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            fontSize: '20px',
            fontWeight: '500',
            marginTop: '20px',
          }}
        >
          For the condition you just completed, please use the scale and diagram
          in front of you to rate the level of discomfort you experienced in the
          following body parts during the task. For body parts with two sides
          (e.g., left and right legs), please rate the worst side of the two.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Box className={styles.ratingImage}>
            <Image
              src={RatingImage}
              width={400}
              height={400}
              alt='rating scale'
            />
          </Box>
          <fieldset className={styles.fieldsetStyle}>
            <legend>Choose your rating</legend>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Hand/Wrist
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='handWrist' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='handWrist' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'handWrist'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Upper Arm
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='upperArm' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='upperArm' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'upperArm'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Shoulder
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='shoulder' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='shoulder' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'shoulder'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Lower Back
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='lowerBack' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='lowerBack' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'lowerBack'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>

            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Thigh
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='thigh' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='thigh' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='thigh' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='thigh' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='thigh' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='thigh' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='thigh' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='thigh' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='thigh' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='thigh' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'thigh'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Neck
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='neck' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='neck' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='neck' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='neck' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='neck' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='neck' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='neck' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='neck' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='neck' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='neck' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'neck'}
                  className={styles.errorSection}
                />
              </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Lower Leg and Foot
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='1' />1
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='2' />2
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='3' />3
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='4' />4
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='5' />5
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='lowerLegAndFoot' value='10' />
                  10
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'lowerLegAndFoot'}
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
