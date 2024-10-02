import React from "react";
import styles from '../FirstStep/FirstStep.module.css'
import GaugeChart from "../../../GuageChart/GuageChart";


const FourthStepAnalysis = (props) => {
  const{data} = props;
  const exertionData = data?.data?.exertion


  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.colmd2}>
          <GaugeChart value={exertionData?.totalAverage} maxValue={20} text={'Perceived Exertion Rate Analysis'} />
        </div>
      </div>
    </div>
    </>
  );
};

export default FourthStepAnalysis;
