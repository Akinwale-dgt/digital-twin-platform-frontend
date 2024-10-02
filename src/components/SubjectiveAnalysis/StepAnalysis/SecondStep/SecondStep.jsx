import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'
import CognitiveWorkloadChart from '../../../ScoreCard/ScoreCard'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const SecondStepAnalysis = (props) => {
  const{data} = props;


  const newData =data?.data?.cognitiveWorkload


  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
     
        <div className={styles.colmd}>
             <h3>Cognitive Workload Overview</h3>
          <CognitiveWorkloadChart data={newData}/>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default SecondStepAnalysis;
