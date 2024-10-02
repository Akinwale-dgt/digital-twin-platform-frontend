import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { ErrorMessage } from 'formik';
import UploadComponent from '../../../UploadDocuments/UpdloadDocuments';
import {DisplayDocument, FILE_SIZE, bytesToMegaBytes} from '../FirstStep/FirstStep';


export default function ThirdStepForm(props) {

  const { setFieldValue, values } = props;

  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography variant='h5' sx={{textAlign: 'center', fontSize:'24px'  }}>Upload EEG Data
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Box>
              <UploadComponent name={"exertion"} fileSize={FILE_SIZE} setFieldValue={setFieldValue} acceptFileTypes={{'application/csv': ['.csv', '.xlsx']}} />
              <ErrorMessage
                component="span"
                name={"exertion"}
                className={styles.errorSection}
              />
            </Box>
            <Box>
            {Array.isArray(values.exertion) && values.exertion.length > 0 && (
              <Card sx={{ minWidth: 400, padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff' }}>
                <Typography variant='h5' className={styles.selectedSection}>
                  {'Selected File'}
                </Typography>
                <CardContent>
                <DisplayDocument files={values.exertion} />
                </CardContent>
              </Card>
              )}
            </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
