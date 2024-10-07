import * as React from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import {Button} from '@mui/material'
import ModelViewer from '../components/ModelViewer/ModelViewer';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router'
import GaugeChart from '../components/GuageChart/GuageChart.jsx'
import SpeedGuageChart from '../components/SpeedGaugeChart/SpeedGuageChart.jsx'
import axios from 'axios';
import { Bar, Pie } from "react-chartjs-2";
import BulletGraph from '../components/BulletGraph/BulletGraph';
import { Gauge } from '@mui/x-charts/Gauge';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Highcharts from 'highcharts';
import dynamic from 'next/dynamic';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge'; // Import for solid gauge

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

export default function Home() {
  const router = useRouter();

   const barChartOptions = {
    maintainAspectRatio: false,  // This allows control over height
  };

  const [open, setOpen] = React.useState(false);
    const [openAnalysis, setAnalysisOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseDialog = () => {
    setAnalysisOpen(false);
  };


  const [data, setData] = React.useState({});

  const getAnalysisResult = () => {
  axios.get('https://digital-twin-platform.onrender.com/api/analyze-subjective-data')
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error.message);
      toast(error.message, {
        position: "top-right",
      });
    })
    .finally(() => {
      handleCloseDialog();
    });
};

  console.log(data);


  const discomfortData =data?.data?.discomfort

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
          discomfortData?.average_hand_and_wait,
          discomfortData?.average_upper_arm,
          discomfortData?.average_shoulder,
          discomfortData?.average_lower_back,
          discomfortData?.average_thigh,
          discomfortData?.average_neck,
          discomfortData?.average_lower_leg_and_foot
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

 

   const situationalData = data?.data?.situational_awareness
   const balanceData = data?.data?.balance
   const exertionData = data?.data?.exertion
   const cognitiveWorkload =data?.data?.cognitiveWorkload
   const weightedSumRating = data?.data?.weightedSumRating
   const roundSumRating = Math.round(weightedSumRating);

    // Data for the pie chart
    const options = {
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      tooltip: {
        enabled: true, // Optional: disables tooltips if you want to remove hover labels
      },
    },
  };

   const barChartTwoData = {
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
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  //  const pieChartData = {
  //   labels: [
  //     "Arousal",
  //     "Complexity of situation",
  //     "Concentration of attention",
  //     "Familiarity with situation",
  //     "Information quantity",
  //     "Instability of situation",
  //     "Spare mental capacity",
  //     "Variability of situation"
  //   ],
  //   datasets: [
  //     {
  //       label: "Situational Awareness Rate",
  //       data: [
  //         situationalData?.average_arousal,
  //         situationalData?.average_complexity_of_situation,
  //         situationalData?.average_concentration_of_attention || 1,
  //         situationalData?.average_familiarity_with_situation || 1,
  //         situationalData?.average_information_quantity || 1,
  //         situationalData?.average_instability_of_situation|| 1,
  //         situationalData?.average_spare_mental_capacity|| 1,
  //         situationalData?.average_variability_of_situation || 1,
  //       ],
  //       backgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#4BC0C0",
  //         "#9966FF",
  //         "#FF9F40",
  //         "#FF6384",
  //       ],
  //       hoverBackgroundColor: [
  //         "#FF6384",
  //         "#36A2EB",
  //         "#FFCE56",
  //         "#4BC0C0",
  //         "#9966FF",
  //         "#FF9F40",
  //         "#FF6384",
  //       ],
  //     },
  //   ],
  // };

  const handleClickOpenDialog = () => {
    setAnalysisOpen(true);
  };

  const visitSubjectiveEvaluation = () => {
    router.push('/subjective-evaluation');
  }

  const visitSubjectiveAnalysis= () => {
    router.push('/subjective-analysis');
  }

  const visitOjectiveEvaluation = () => {
    router.push('/objective-evaluation');
  }

  const visitOjectiveAnalysis = () => {
    console.log('Hello')
  }

  const cognitiveLevel = (cognitiveWorkload?.totalAverage/120) * 100

  const chartOptions = {
  chart: {
      height: 300, // Set height in pixels
      type: 'line'
  },
  title: {
    text: 'Situational Awareness Data'
  },
  subtitle: {
    // text: 'Sales from January to December'
  },
  xAxis: {
    categories: [
      "Arousal",
      "Complexity of situation",
      "Concentration of attention",
      "Familiarity with situation",
      "Information quantity",
      "Instability of situation",
      "Spare mental capacity",
      "Variability of situation"
    ]
  },
  yAxis: {
    title: {
      text: 'Rates'
    }
  },
  series: [
    {
      name: 'Situational Awareness',
      color: '#FF916C',
      data: [
          situationalData?.average_arousal || 1,
          situationalData?.average_complexity_of_situation || 1,
          situationalData?.average_concentration_of_attention || 1,
          situationalData?.average_familiarity_with_situation|| 1,
          situationalData?.average_information_quantity || 1,
          situationalData?.average_instability_of_situation || 1,
          situationalData?.average_spare_mental_capacity || 1,
          situationalData?.average_variability_of_situation || 1,
      ]
    }
  ],
  plotOptions: {
    line: {
      dataLabels: {
        enabled: true
      },
      enableMouseTracking: true
    }
  }
};


  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            padding: '30px'
        },
       }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Choose your preferred data input evaluation"}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Button autoFocus  onClick={visitSubjectiveEvaluation}>
            Subjective 
          </Button>
          <Button  onClick={visitOjectiveEvaluation} autoFocus>
            Objective 
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
          PaperProps={{
          style: {
            padding: '30px'
        },
       }}
        fullScreen={fullScreen}
        open={openAnalysis}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Choose your preferred data evaluation analysis"}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Button autoFocus  onClick={getAnalysisResult}>
            Subjective 
          </Button>
          <Button  onClick={visitOjectiveAnalysis} autoFocus>
            Objective 
          </Button>
        </DialogContent>
      </Dialog>
    <div className={styles.container}>
      <Head>
        <title>Twin Digital Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={{marginBottom: '20px'}}>
        <div className={styles.buttonSection}>
        </div>
        <div className={styles.container}>
          <div className={styles.column}>
           <div>
          <Button  onClick={handleClickOpen}>
            Data Input
          </Button>
          </div>
            <div  className={styles.column}>
              <h2>Situational Awareness</h2> 
            {/* <Pie data={pieChartData} options={options}/> */}
            <HighchartsReact highcharts={Highcharts} options={chartOptions} height={500} />
               {/* <Bar data={barChartTwoData} options={barChartOptions} height={500} /> */}
            <div>
              <h2>Perceived Exertion Rate</h2>
              <GaugeChart value={Math.round(exertionData?.totalAverage)} maxValue={20} text={'Perceived Exertion Rate Analysis'} />
          </div>
                 <div>
              <h2>Cognitive Workload</h2>
              <div>
              <BulletGraph max={20} value={Math.round(cognitiveWorkload?.average_mental_demand)} title={'Mental Demand'}/>
              <BulletGraph max={20} value={Math.round(cognitiveWorkload?.average_physical_demand)} title={'Physical Demand'}/>
              <BulletGraph max={20} value={Math.round(cognitiveWorkload?.average_temporal_demand)} title={'Temporal Demand'}/>
              </div>
          </div>
            </div>
          </div>
            <div className={styles.modelColumn}>
              <ModelViewer lowerBack={true} lowerBackHighlightLevel={discomfortData?.average_lower_back} cognitive={true} cognitiveLevel={cognitiveLevel} />
                <div style={{marginTop: '-500px', textAlign: 'center'}}>
                <h2>Overall Analysis</h2>
                  <SpeedGuageChart value={`${Math.round(weightedSumRating) || 0}`} valueMax={100}/>
                </div>
          </div>
          <div className={styles.column}>
            <div>
          <Button onClick={handleClickOpenDialog}>
            Analyse Risk
          </Button>
            </div>
            <div  className={styles.column}>
               <h2>Perceived Discomfort Rate</h2>
            <Bar data={barChartData} options={barChartOptions} height={500} />
            <h2>Perceived Balance Rate</h2>
          
             <GaugeChart value={Math.round(balanceData?.totalAverage)} maxValue={10} text={'Balance Rate'} />
            <div>
              <h2>Cognitive Workload</h2>
              <div>
              <BulletGraph max={20} value={Math.round(cognitiveWorkload?.average_performance)} title={'Performance'}/>
              <BulletGraph max={20} value={Math.round(cognitiveWorkload?.average_effort)} title={'Effort'}/>
              <BulletGraph max={20} value={Math.round(cognitiveWorkload?.average_frustration)} title={'Frustration'}/>
              </div>
          </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </>
  );
}
