import GuageCard from "../../../Guage/Guage";
import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const FourthStepAnalysis = (props) => {
  const{data} = props;
  const exertionData = data?.data?.exertion
  console.log(data?.data)

  return (
    <>
    <div className={styles.main}>
        <h6>Perceived Exertion Rate Analysis</h6>
      <div className={styles.container}>
        {/* Column 1 - Bar Chart */}
        {/* <div className={styles.colmd}>
          <h3>Perceived Exertion Rate Architecture</h3>
          <Bar data={barChartData} options={barChartOptions} height={500} />
        </div> */}
        {/* Column 2 - Summary */}
        <div className={styles.colmd}>
             <h3>Overall Analysis</h3>
          <GuageCard data={exertionData} valueMax={100} />
        </div>
      </div>
    </div>
    </>
  );
};

export default FourthStepAnalysis;
