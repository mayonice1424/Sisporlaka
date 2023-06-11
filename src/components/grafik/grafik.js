import React, { useState, useEffect } from 'react';
import { Flex, Select,Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { selectDataGrafik } from '../../Utility/api';
import axios from 'axios';
import moment from 'moment';
import GrafikData from '../grafikComponent/grafikComponent';
const GrafikComponent = () => {
  const [data, setData] = useState([]);
  const [dataGrafik,setDataGrafik] = useState('')
  const getDataGrafik = async () => {
    try {
      const response = await axios.get(selectDataGrafik);
      setData(response.data.laporan);
      // console.log(response.data.laporan);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getDataGrafik();
  }, [dataGrafik]);
  var idLocale = require('moment/locale/id');
  moment.updateLocale('id', idLocale);
  return (
    <>
    {
      data == null ? (<></>):(

        <Flex flexDir={'column'}>
        <Formik
          initialValues={{
            value: ''
          }}
          onSubmit={(values) => {
          setDataGrafik(values.value)
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Flex>
                <Select
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setFieldValue('value', selectedValue);
                    // console.log(selectedValue)
                    setDataGrafik(selectedValue)
                  }}
                  size="lg"
                  borderRadius={10}
                  name="grafik"
                  value={values.value}
                  placeholder="Pilih Data"
                  width="100%"
                  bg="white"
                  _active={{ bg: 'white' }}
                  borderColor="var(--color-border)"
                  fontSize="var(--header-5)"
                  fontWeight="normal"
                  color="var(--color-primer)"
                  _hover={{ borderColor: 'var(--color-border)' }}
                  _focusWithin={{ borderColor: 'var(--color-border)' }}
                  >
                  {data.map((item, index) => (
                    <option
                    color="var(--color-border)"
                    key={index}
                    value={item.data}
                    >
                      Data per { moment(item.data).format('MMMM YYYY')}
                    </option>
                  ))}
                </Select>
              </Flex>
            </Form>
          )}
        </Formik>
        {
          dataGrafik == ""? (
            <></>
            ):(
              // console.log(dataGrafik),
              <GrafikData 
              size="lg"
              className="grafik"
              data={{
                value: dataGrafik
              }}
              />
              )
            }
      </Flex>
              )
              }
          </>
  );
};

export default GrafikComponent;