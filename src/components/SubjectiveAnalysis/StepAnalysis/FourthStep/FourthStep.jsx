import GuageCard from "../../../Guage/Guage";
import React from "react";
import styles from '../FirstStep/FirstStep.module.css'


const FourthStepAnalysis = (props) => {
  const{data} = props;
  const exertionData = data?.data?.exertion


  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.colmd2}>
             <h3>Perceived Exertion Rate Analysis</h3>
          <GuageCard data={exertionData.totalAverage} valueMax={20} />
        </div>
      </div>
    </div>
    </>
  );
};

export default FourthStepAnalysis;
