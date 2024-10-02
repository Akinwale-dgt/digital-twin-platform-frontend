import GuageCard from "../../../Guage/Guage";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'
import GaugeChart from "../../../GuageChart/GuageChart";

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const FourthStepAnalysis = (props) => {
  const{data} = props;
  const weightedSumRating = data?.data?.weightedSumRating

  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.colmd2}>
          <GaugeChart value={weightedSumRating} maxValue={100} text={'Overall Analysis'} />
        </div>
      </div>
    </div>
    </>
  );
};

export default FourthStepAnalysis;
