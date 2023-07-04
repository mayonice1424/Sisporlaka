import React,{useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
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
    labels: [...labels],
    datasets: [
      {
        label: `Data Kecelakaan Bulan ${moment(value).format('MMMM YYYY')} `,
        data: [...datasets],

        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        // tension: 0.5,
        font: {
          size: 40, // Atur ukuran font untuk label dataset
          weight: 'bold',
        },

      },
    ],
  };
  const options = {
    responsive: true,
    layout: {
      padding: 40,
  },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font:{
          size: 14,
          weight: 'bold'
        },
      },
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          font:{
            size: 22,
            weight: 'normal',
          },
          text: 'Jumlah Kecelakaan',
        },
        ticks: {
          font: {
            size: 16, // Atur ukuran font untuk sumbu y
          },
          precision: 0,
        },
    },
      x: {
        display: true,
        title: {
          display: true,
          font:{
            size: 22,
            weight: 'normal',
            color: 'red'
          },
          text: 'Kecamatan',
        },
        ticks: {
          font: {
            size: 18, // Atur ukuran font untuk sumbu y
          },
        },
},
}
}

  useEffect(() => {
  }, [value]);
    return (
      <div widht={'300px'} height={'300px'} margin={'20px'} >
    <Bar size={'lg'} options={options} data={data} />
      </div>
    )
  }
  export default GrafikValue
