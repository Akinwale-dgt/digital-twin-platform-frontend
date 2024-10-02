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
        <Box key={index.toString()} className={styles.mainSection}>
          <Box className={styles.selectedSectionInner}>
              <TextSnippetIcon className={styles.documentIcon} color="primary" />
              <Typography gutterBottom variant="p" component="div">
                File Name: {(file.name)}
              </Typography>
              <div>
                <Typography variant="p">File Type: {(file.type)}</Typography>
                <br />
                <Typography variant="p"> {`File Size: ${bytesToMegaBytes(file.size)} MB`}</Typography>
            </div>
          </Box>
        </Box>
      ))}
  </>
);


export default function FirstStepForm(props) {

  const { setFieldValue, values } = props;

  return (
    <React.Fragment>
      <Box container spacing={3} className={styles.main}>
        <Typography variant='h5' sx={{textAlign: 'center', fontSize:'24px'  }}>Upload EEG Data
        </Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly'}}>
            <Box>
              <UploadComponent name={"cognitiveWorkloads"} fileSize={FILE_SIZE} setFieldValue={setFieldValue} acceptFileTypes={{'application/csv': ['.csv', '.xlsx']}} />
              <ErrorMessage
                component="span"
                name={"cognitiveWorkloads"}
                className={styles.errorSection}
              />
            </Box>
            <Box>
            {Array.isArray(values.cognitiveWorkloads) && values.cognitiveWorkloads.length > 0 && (
                  <Card sx={{ minWidth: 400, padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff' }}>
                    <Typography variant='h5' className={styles.selectedSection}>
                      {'Selected File'}
                    </Typography>
                    <CardContent>
                    <DisplayDocument files={values.cognitiveWorkloads} />
                    </CardContent>
                  </Card>
              )}
            </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
