import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';
import RatingImage from '../../../../images/exertionRating.jpeg'
import Image from 'next/image'

export default function ThirdStepForm(props) {
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
          For the condition you just completed, please rate the level of
          exertion you experienced during the task using the scale below
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Box className={styles.ratingImage}>
            <Image
              src={RatingImage}
              width={'auto'}
              height={'auto'}
              alt='rating scale'
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </Box>
          <fieldset
            style={{ marginLeft: '68px' }}
            className={styles.fieldsetStyle}
          >
            <legend>Choose your rating</legend>
            <Box>
              <Typography variant={'p'} id='my-radio-group'>
                Exertion Rating
              </Typography>
              <Box
                role='group'
                aria-labelledby='my-radio-group'
                className={styles.formField}
              >
                <label>
                  <Field type='radio' name='exertion' value='6' />6
                </label>
                <label>
                  <Field type='radio' name='exertion' value='7' />7
                </label>
                <label>
                  <Field type='radio' name='exertion' value='8' />8
                </label>
                <label>
                  <Field type='radio' name='exertion' value='9' />9
                </label>
                <label>
                  <Field type='radio' name='exertion' value='10' />
                  10
                </label>
                <label>
                  <Field type='radio' name='exertion' value='11' />
                  11
                </label>
                <label>
                  <Field type='radio' name='exertion' value='12' />
                  12
                </label>
                <label>
                  <Field type='radio' name='exertion' value='13' />
                  13
                </label>
                <label>
                  <Field type='radio' name='exertion' value='14' />
                  14
                </label>
                <label>
                  <Field type='radio' name='exertion' value='15' />
                  15
                </label>
                <label>
                  <Field type='radio' name='exertion' value='16' />
                  16
                </label>
                <label>
                  <Field type='radio' name='exertion' value='17' />
                  17
                </label>
                <label>
                  <Field type='radio' name='exertion' value='18' />
                  18
                </label>
                <label>
                  <Field type='radio' name='exertion' value='19' />
                  19
                </label>
                <label>
                  <Field type='radio' name='exertion' value='20' />
                  20
                </label>
              </Box>
              <Box className={styles.errorSectionContainer}>
                <ErrorMessage
                  component='span'
                  name={'exertion'}
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
