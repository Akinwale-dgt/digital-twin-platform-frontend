import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GuageCard = (props) => {
  const {data, valueMax} = props;

return(
  <Gauge
    value={`${Math.floor(data)}`}
    startAngle={-110}
    endAngle={110}
    valueMax={valueMax}
    sx={{
      [`& .${gaugeClasses.valueText}`]: {
        fontSize: 40,
        transform: 'translate(0px, 0px)',
      },
    }}
    text={
      ({ value, valueMax }) => `${value} / ${valueMax}`
    }
  />
)

}

export default GuageCard;