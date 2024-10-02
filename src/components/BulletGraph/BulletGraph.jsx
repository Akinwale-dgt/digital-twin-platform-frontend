// pages/bullet.js
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'; // Needed for bullet-like graph
import BulletModule from 'highcharts/modules/bullet'; 

// Initialize highcharts-more module for additional chart types
if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
  BulletModule(Highcharts); // Initialize bullet module
}

// Dynamically load HighchartsReact to avoid SSR issues
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

const BulletGraph = (props) => {

const {title, value } = props;

  const options = {
    chart: {
      type: 'bullet',
      inverted: true,
      height: '15%',
       width: 600
    },
    title: {
      text: 'Cognitive Workload Overview',
    },
    xAxis: {
      categories: [`${title}`],
      labels: {
        useHTML: true,
      },
    },
    yAxis: {
      min: 0,
      max: 10,
      plotBands: [
              {
                from: 0,
                to: 10,
                color: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 0, // Horizontal gradient
                  },
                  stops: [
                    [0, '#f44336'], // Red
                    [0.25, '#ff9800'], // Orange
                    [0.5, '#ffeb3b'], // Yellow
                    [0.75, '#8bc34a'], // Light Green
                    [1, '#4caf50'], // Dark Green
                  ],
                },
              },
            ],
      title: null,
    },
    plotOptions: {
      series: {
        pointPadding: 0.25,
        borderWidth: 0,
        color: '#fff',
        targetOptions: {
          width: '200%', // Customize width of target marker
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: title,
        data: [
          {
            y: value, // Actual performance
            target: 10, // Target
          },
        ],
        type: 'bullet', // Simulates the bullet style
        dataLabels: {
          enabled: true,
          inside: true,
          format: '{point.y}',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BulletGraph;
