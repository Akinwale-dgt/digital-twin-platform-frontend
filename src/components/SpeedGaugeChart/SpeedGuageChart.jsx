import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function SpeedGuageChart(props) {
  const {value, valueMax} = props

  console.log(typeof value);

  const chartOptions = {
    chart: {
      type: 'gauge', // Set the chart type to 'gauge'
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: 300 // Set chart height
    },
    title: {
      text: 'Speedometer'
    },
    pane: {
      startAngle: -150,
      endAngle: 150
    },
    yAxis: {
      min: 0,
      max: valueMax,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
        step: 2,
        rotation: 'auto'
      },
      title: {
        text: '%'
      },
      plotBands: [
        {
          from: 0,
          to: 30,
          color: '#55BF3B' // green
        },
        {
          from: 31,
          to: 69,
          color: '#DDDF0D' // yellow
        },
        {
          from: 70,
          to: 100,
          color: '#DF5353' // red
        }
      ]
    },
    series: [
      {
        name: 'Overall Analysis',
        data: [Number(value)], // Initial value for the pointer
        tooltip: {
          valueSuffix: '%'
        }
      }
    ]
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
}
