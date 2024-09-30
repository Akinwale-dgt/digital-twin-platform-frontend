import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import styles from '../FirstStep/FirstStep.module.css';
import { ErrorMessage } from 'formik';
import UploadComponent from '../../../UploadDocuments/UpdloadDocuments';
import {DisplayDocument, FILE_SIZE, bytesToMegaBytes} from '../FirstStep/FirstStep';


export default function SecondStepForm(props) {

  const { setFieldValue, values } = props;

  console.log(values);

  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography variant='p' sx={{textAlign: 'center', fontSize:'14px'}}>Upload EEG Data
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Box>
              <UploadComponent name={"fallRisk"} fileSize={FILE_SIZE} setFieldValue={setFieldValue} />
            </Box>
              <ErrorMessage
                component="span"
                name={"fallRisk"}
                className={styles.errorSection}
              />
            <Box>
            {Array.isArray(values.fallRisk) && values.fallRisk.length > 0 && (
                <div className={styles.mainDocumentSection}>
                  <Card sx={{ minWidth: 275 }}>
                    <Typography variant='p' className={styles.selectedSection}>
                      {'Selected File'}
                    </Typography>
                    <CardContent>
                    <DisplayDocument files={values.fallRisk} />
                    </CardContent>
                  </Card>
                </div>
              )}
            </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
