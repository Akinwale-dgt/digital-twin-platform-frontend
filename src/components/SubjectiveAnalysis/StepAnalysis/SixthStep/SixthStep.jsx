import GuageCard from "../../../Guage/Guage";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const FourthStepAnalysis = (props) => {
  const{data} = props;
  const exertionData = data?.data?.weightedSumRating

  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.colmd2}>
             <h3>Overall Analysis</h3>
          <GuageCard data={exertionData} valueMax={100} />
        </div>
      </div>
    </div>
    </>
  );
};

export default FourthStepAnalysis;
