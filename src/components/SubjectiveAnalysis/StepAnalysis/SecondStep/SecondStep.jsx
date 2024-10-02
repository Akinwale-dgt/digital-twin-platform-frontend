import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'
import BulletGraph from '../../../BulletGraph/BulletGraph'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const SecondStepAnalysis = (props) => {
  const{data} = props;


  const cognitiveWorkload =data?.data?.cognitiveWorkload

  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
     
        <div className={styles.colmd}>
          <h3>Cognitive Workload Overview</h3>
          <BulletGraph value={Math.round(cognitiveWorkload?.average_mental_demand)} title={'Mental Demand'}/>
          <BulletGraph value={Math.round(cognitiveWorkload?.average_physical_demand)} title={'Physical Demand'}/>
          <BulletGraph value={Math.round(cognitiveWorkload?.average_temporal_demand)} title={'Temporal Demand'}/>
          <BulletGraph value={Math.round(cognitiveWorkload?.average_performance)} title={'Performance'}/>
          <BulletGraph value={Math.round(cognitiveWorkload?.average_effort)} title={'Effort'}/>
          <BulletGraph value={Math.round(cognitiveWorkload?.average_frustration)} title={'Frustration'}/>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default SecondStepAnalysis;
