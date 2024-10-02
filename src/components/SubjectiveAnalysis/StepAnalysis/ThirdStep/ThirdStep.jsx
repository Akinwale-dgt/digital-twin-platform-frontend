import GuageCard from "../../../Guage/Guage";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const ThirdStepAnalysis = (props) => {
  const{data} = props;
  const balanceData = data?.data?.balance

  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.colmd2}>
             <h3>Perceived Balance Analysis</h3>
          <GuageCard data={balanceData.totalAverage} valueMax={10}/>
        </div>
      </div>
    </div>
    </>
  );
};

export default ThirdStepAnalysis;
