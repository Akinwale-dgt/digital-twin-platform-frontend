import React from "react";
import styles from '../FirstStep/FirstStep.module.css'
import GaugeChart from "../../../GuageChart/GuageChart";


// Register necessary chart components


const ThirdStepAnalysis = (props) => {
  const{data} = props;
  const balanceData = data?.data?.balance

  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.colmd2}>
          <GaugeChart value={balanceData?.totalAverage} maxValue={10} text={'Perceived Balance Analysis'} />
        </div>
      </div>
    </div>
    </>
  );
};

export default ThirdStepAnalysis;
