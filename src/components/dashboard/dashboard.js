import React,{useEffect, useState} from 'react'
import { Flex, Text ,Wrap,Image } from '@chakra-ui/react'
import Loading from '../../components/loading/loading';
import { BsClipboardData } from 'react-icons/bs';
import axios from 'axios';
import { dashboardInfoApi } from '../../Utility/api';
import CardDashboard from '../../components/boardItem/cardDashboard';

const Dashboard = () => {
	const [data, setData] = useState('');
  const [isloading, setLoading] = useState(true);
  const getCount = async () => {
       axios.get(dashboardInfoApi)
      .then(response => {
        setData(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      }
      )
    }


    useEffect(() => {
      getCount()
      setLoading(true)
    }, [])
 
    return (
      <>
        {
        data == null ? ( <Loading/> ) : (
        <Flex w="100%"  flexDir={"column"} >
				<Flex w="100%"  flexDir={"row"} alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
        <Flex  justify="center" mt={'-30px'}>
						<Wrap  spacing="60px" justify="center">
              <CardDashboard
              data={{
                value: data.countNotValidate,
                icon: BsClipboardData,
                name: "Jumlah Permintaan Validasi",
              }}
            />
              <CardDashboard
                data={{
                  value: data.count,
                  icon: BsClipboardData,
                  name: "Jumlah Kasus Kecelakaan",
                }}
              />
            <CardDashboard
            data={{
              value: data.count,
              icon: BsClipboardData,
              name: "Jumlah Laporan",
            }}
          />
						</Wrap>
					</Flex>
					</Flex>
          <Flex mt={'3%'} justifyContent={'center'}>
          <Text color={"black"} fontWeight={'bold'} fontSize={'var( --header-4)'} fontFamily={'var(--font-family-secondary)'}>
            Kolaborasi Oleh
          </Text>
          </Flex>
          <Flex mt={'1%'} justifyContent={'center'}>
          <Image
							  sizes="md" display={{ base: 'flex', lg: 'flex' }} height={'50'}  width={'100%'} maxWidth={'230px'}
                src={process.env.PUBLIC_URL + '/logokolaborasi.png'}
						/>
          </Flex>
        </Flex>
      )}
      </>
  )
}
export default Dashboard;