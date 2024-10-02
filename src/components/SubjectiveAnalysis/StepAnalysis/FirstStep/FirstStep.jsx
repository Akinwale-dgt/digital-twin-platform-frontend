import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import styles from './FirstStep.module.css'

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const FirstStepAnalysis = (props) => {
  const{data} = props;

  const newData =data?.data?.discomfort

  // Data for the bar chart
  const barChartData = {
    labels: [
      "Hand & Wrist",
      "Upper Arm",
      "Shoulder",
      "Lower Back",
      "Thigh",
      "Neck",
      "Lower Leg & Foot"
    ],
    datasets: [
      {
        label: "Ratings",
        data: [
          newData?.average_hand_and_wait,
          newData?.average_upper_arm,
          newData?.average_shoulder,
          newData?.average_lower_back,
          newData?.average_thigh,
          newData?.average_neck,
          newData?.average_lower_leg_and_foot
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };


   const barChartOptions = {
    maintainAspectRatio: false,  // This allows control over height
  };

  return (
    <>
    <div className={styles.main}>
      <div className={styles.container}>
        {/* Column 1 - Bar Chart */}
        <div className={styles.colmd}>
          <h3>Perceived Rate of Discomfort Representation</h3>
          <Bar data={barChartData} options={barChartOptions} height={500} />
        </div>

        {/* Column 2 - Pie Chart */}
        {/* <div className={styles.colmd}>
          <h3>Perceived Rate of Discomfort Overview</h3>
          <Pie data={pieChartData} />
        </div> */}

        {/* Column 3 - Summary */}
      </div>
        {/* <div>
          <h3>Summary</h3>
          <p>Total Average: {newData?.totalAverage.toFixed(2)}</p>
        </div> */}
    </div>
    </>
  );
};

export default FirstStepAnalysis;
