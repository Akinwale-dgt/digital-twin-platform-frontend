import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import styles from './FirstStep.module.css';
import { Field, ErrorMessage } from 'formik';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import UploadComponent from '../../../UploadDocuments/UpdloadDocuments'

export const FILE_SIZE = 1048576

export const bytesToMegaBytes = (bytes) => {
  return (bytes / 1024 ** 2).toFixed(2);
};

export const DisplayDocument = (props) => (
  <>
    {Array.isArray(props.files) && props.files.length > 0 &&
      props.files.map((file, index) => (
        <div key={index.toString()} className={styles.mainSection}>
          <div className={styles.selectedSectionInner}>
            <div>
              <TextSnippetIcon className={styles.documentIcon} color="primary" />
              <span className={styles.documentTitle}>{(file.name)}</span>
              <div className={styles.documentInfoSection}>
                <span>@Type: {(file.type)}</span>
                <br />
                <span> {`Size: ${bytesToMegaBytes(file.size)} MB`}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
  </>
);


export default function FirstStepForm(props) {

  const { setFieldValue, values } = props;

  console.log(values);

  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography variant='p' sx={{textAlign: 'center', fontSize:'14px'}}>Upload EEG Data
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Box>
              <UploadComponent name={"cognitiveWorkload"} fileSize={FILE_SIZE} setFieldValue={setFieldValue} />
            </Box>
              <ErrorMessage
                component="span"
                name={"cognitiveWorkload"}
                className={styles.errorSection}
              />
            <Box>
            {Array.isArray(values.cognitiveWorkload) && values.cognitiveWorkload.length > 0 && (
                <div className={styles.mainDocumentSection}>
                  <Card sx={{ minWidth: 275 }}>
                    <Typography variant='p' className={styles.selectedSection}>
                      {'Selected File'}
                    </Typography>
                    <CardContent>
                    <DisplayDocument files={values.cognitiveWorkload} />
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
