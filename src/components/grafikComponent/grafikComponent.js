import React,{useState,useEffect} from 'react'
// import { getGrafikSensor } from '../../Utility/api_link';
import axios from 'axios';
import { getGrafik } from '../../Utility/api';
// import GrafikValue from './grafikValue';
// import './grafik_component';
import { useNavigate } from 'react-router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import GrafikValue from './grafikValue';
import { Flex,Text } from '@chakra-ui/react';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


const GrafikData= (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const value = props.data.value
  const [data,setData] = useState([])
  const getDataGrafik = async () => {
    console.log(value)
    await axios.get(`${getGrafik}search=${value}`)
    .then(response => {
      setData(response.data.laporan)
      console.log(response.data.laporan)
    })
  }
  useEffect(() => {
    getDataGrafik()
  }, [value]);
    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <GrafikValue className='grafik' data={{
          value: value,
          label: Object.values(data).map((item) => item.nama_kecamatan ),
          data: Object.values(data).map((item) => item.laporans_count),
        }
        } />
      </div>
    )
}
export default GrafikData
