import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';

export default function FifthStepForm(props) {
  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography variant='p' sx={{display: 'flex', justifyContent: 'center'}}>Situation awareness rating technique.
        </Typography>
        <Box>
        <fieldset className={styles.fieldsetStyle}>
            <legend>Choose your rating</legend>
            <Box>
            <Typography variant={'p'} id="my-radio-group"><strong>Instability of Situation: </strong>How changeable Is the situation? is the situation highly unstable and ilkely to change suddenly (High) or is it very stable and straightforward (Low)?</Typography>
            <Box role="group" aria-labelledby="my-radio-group" className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="instabilityOfSituation" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
            </Box>
               <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'instabilityOfSituation'}
              className={styles.errorSection}
            />
          </Box>
              </Box>
              <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Complexity of Situation: </strong>How complicated is the situation? Is it complex with many interrelated components (High) or is it simple and straightfoward (Low)?</Typography>
             <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="complexityOfSituation" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="complexityOfSituation" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="complexityOfSituation" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="complexityOfSituation" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="complexityOfSituation" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="complexityOfSituation" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="complexityOfSituation" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
            </Box>
            <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'complexityOfSituation'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Variability of Situation: </strong>How many variables are changing within the situation?
               Are there a large number of factors varying (High) or are there very few variables changing (Low)?</Typography>
             <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="variabilityOfSituation" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
            </Box>
            <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'variabilityOfSituation'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
            <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Arousal: </strong>How aroused are you in the situation? Are you alert and ready for activity 
              (High) or do you have a low degree of alertness (Low)?</Typography>
              <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
               <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="arousal" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="arousal" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="arousal" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="arousal" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="arousal" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="arousal" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="arousal" value="7" />
                7
              </label>
            <span className={styles.spanStyle}>High</span>
              </Box>
            <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'arousal'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
              <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Concentration of Attention: </strong>How much are you concentrating on the situation? Are you concentrating on 
              many aspects of the situation (High) or focussed on only one (Low)?</Typography>
              <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="concentrationOfAttention" value="7" />
                7
              </label>
             <span className={styles.spanStyle}>High</span>
              </Box>

           <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'concentrationOfAttention'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
              <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Division of Attention: </strong>How much is your attention divided in the situation? Are you concentrating 
              on many aspects of the situation (High) or focussed on only one (Low)?</Typography>
              <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="divisionOfAttention" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="divisionOfAttention" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="divisionOfAttention" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="divisionOfAttention" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="divisionOfAttention" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="divisionOfAttention" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="divisionOfAttention" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'divisionOfAttention'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
               <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Spare Mental Capacity: </strong>How much mental capacity do you have to spare in the situation? Do you 
              have sufficient to attend to many variables (High) or nothing to spare at all (Low)?</Typography>
              <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="spareMentalCapacity" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'spareMentalCapacity'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
               <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Information Quantity: </strong>How much information have you gained about the situation? Have you
              received and understood a great deal of knowledge (High) or very little (Low)</Typography>
              <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="informationQuantity" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="informationQuantity" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="informationQuantity" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="informationQuantity" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="informationQuantity" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="informationQuantity" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="informationQuantity" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'informationQuantity'}
              className={styles.errorSection}
            />
          </Box>
            </Box>
              <Box>
              <Typography variant={'p'} id="my-radio-group"><strong>Familiarity with Situation: </strong>How familiar are you with the situation? Do you have a great deal of relevant
              experience (High) or is it a new situation (Low)?</Typography>
              <Box role="group" aria-labelledby="my-radio-group"  className={styles.formField}>
              <span className={styles.spanStyle}>Low</span>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="1" />
                1
              </label>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="2" />
                2
              </label>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="3" />
                3
              </label>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="4" />
                4
              </label>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="5" />
                5
              </label>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="6" />
                6
              </label>
              <label>
                <Field type="radio" name="familiarityWithSituation" value="7" />
                7
              </label>
              <span className={styles.spanStyle}>High</span>
              </Box>
              <Box className={styles.errorSectionContainer}>
            <ErrorMessage
              component="span"
              name={'familiarityWithSituation'}
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
