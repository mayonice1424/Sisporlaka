import React,{useEffect} from 'react'
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const GrafikValue =(props) => {
  var idLocale = require('moment/locale/id');
  moment.updateLocale('id', idLocale);
  const value = props.data.value
  const label2 = props.data.label
  const datasets = props.data.data

  console.log(label2)
  
  
  const labels = label2;
  
   const data = {
    labels,
    datasets: [
      {
        label: `Data Kecelakaan Bulan ${moment({value}).format('MMMM YYYY')} `,
        data: datasets,
        borderColor:  'rgb(53, 162, 235,0.5)',
        pointBorderColor:'#A4E0FF',
        backgroundColor: 'rgb(53, 162, 235,0.1)',
        pointBorderWidth: 4 ,
        // tension: 0.5,

        fill: true,
        pointStyle: 'circle',
        pointRadius: 7,
        pointHoverRadius: 15
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: 'Jumlah Kecelakaan',
      },

    },
      x: {
        display: true,
        title: {
          display: true,
          text: 'Kecamatan',
    },
},
}
}

  useEffect(() => {
  }, [value]);
    return (
      <div widht={'300px'} height={'300px'} margin={'20px'} >
    <Line size={'lg'} options={options} data={data} />
      </div>
    )
  }
  export default GrafikValue
