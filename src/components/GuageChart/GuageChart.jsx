// pages/gauge.js
import dynamic from 'next/dynamic';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more'; // Import for gauge chart
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge'; // Import for solid gauge

// Initialize modules
if (typeof Highcharts === 'object') {
  HighchartsMore(Highcharts);
  HighchartsSolidGauge(Highcharts);
}

// Dynamically load HighchartsReact to avoid SSR issues
const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

const GaugeChart = (props) => {
  const {value, maxValue, text} = props
  const options = {
    chart: {
      type: 'solidgauge',
      height: '70%',
    },
    title: {
      text: text,
      style: {
        fontSize: '24px',
      },
    },
    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#EEE',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc',
      },
    },
    tooltip: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      max: maxValue,
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'], // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      // title: {
      //   text: text,
      // },
      labels: {
        y: 16,
      },
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true,
        },
      },
    },
    series: [
      {
        // name: text,
        data: [value],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4"></span></div>',
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GaugeChart;
