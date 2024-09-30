import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from '../FirstStep/FirstStep.module.css'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const FifthStepAnalysis = (props) => {
  const{data} = props;
  const situationalData = data?.data?.situational_awareness
    // Data for the pie chart

   const pieChartData = {
    labels: [
      "Arousal",
      "Complexity of situation",
      "Concentration of attention",
      "Familiarity with situation",
      "Information quantity",
      "Instability of situation",
      "Spare mental capacity",
      "Variability of situation"
    ],
    datasets: [
      {
        label: "Situational Awareness Rate",
        data: [
          situationalData?.average_arousal,
          situationalData?.average_complexity_of_situation,
          situationalData?.average_concentration_of_attention,
          situationalData?.average_familiarity_with_situation,
          situationalData?.average_information_quantity,
          situationalData?.average_instability_of_situation,
          situationalData?.average_spare_mental_capacity,
          situationalData?.average_variability_of_situation,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
      },
    ],
  };

  return (
    <>
    <div className={styles.main}>
        <h6>Situational Awareness Analysis</h6>
      <div className={styles.container}>
        {/* Column 1 - Bar Chart */}
        {/* <div className={styles.colmd}>
          <h3>Perceived Exertion Rate Architecture</h3>
          <Bar data={barChartData} options={barChartOptions} height={500} />
        </div> */}
        {/* Column 2 - Summary */}
        <div className={styles.colmd}>
          <h3>Situational Awareness Rate</h3>
          <Pie data={pieChartData} />
        </div> 
      </div>
    </div>
    </>
  );
};

export default FifthStepAnalysis;
