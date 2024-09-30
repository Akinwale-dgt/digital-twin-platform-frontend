import React from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './UploadDocuments.module.css';
import Image from 'next/image';
import { Typography } from '@mui/material';
import UploadIcon from '../../../public/images/UploadIcon.svg';

export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) {
    return true;
  }
  return Object.keys(obj).length === 0;
};

export const SUPPORTED_FORMATS = [
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.lsx',
  '.txt',
  '.tiff',
  '.jpeg',
  '.jpg',
  '.png',
  '.svg',
  '.tiff',
  '.gif',
  '.ppt',
];

const UploadComponent = (props) => {

  const fileValidator = (file) => {
    if (file.size > fileSize) {
      return {
        code: 'file-too-large',
        message: `The file is too large and cannot be uploaded. Please reduce the size of the file and try again`,
      };
    }
    return null;
  };

  const { setFieldValue, name, acceptFileTypes, fileSize } = props;
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: !isEmpty(acceptFileTypes)
      ? (acceptFileTypes)
      : { 'image/*': SUPPORTED_FORMATS },
    onDrop: (acceptedFiles) => {
      setFieldValue(name, acceptedFiles);
    },
    multiple: true,
    validator: fileValidator,
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <ul key={file.name} className={styles.fileRejectionList}>
      {errors.map((e) => (
        <li key={e.code}>{e.message}</li>
      ))}
    </ul>
  ));

  return (
    <>
      <div className={styles.uploadDiv}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input data-testid="drop-input" {...getInputProps()} name={name} />
          <div className={styles.uploadDivInner}>
            <Image src={UploadIcon} alt="Icons" />
          </div>
          <div>
            {isDragActive ? (
              <Typography component="p">Drag & drop files Here</Typography>
            ) : (
              <Typography
                component="p"
                sx={{
                  fontWeight: '800',
                }}
              >
                Drag & drop files or Browse
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className={styles.fileRejectionText}>{fileRejectionItems}</div>
    </>
  );
};

export default UploadComponent;

