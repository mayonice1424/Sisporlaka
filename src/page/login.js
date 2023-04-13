import React, { useEffect, useState } from "react"
import { Box, Flex,InputGroup, InputLeftElement, Button, Image, Text, Input, InputLeftAddon } from "@chakra-ui/react"
import { Formik, Form } from 'formik'
import {FaUser} from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control"
import * as yup from 'yup'
import jwt_decode from "jwt-decode"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const schema = yup.object({
  username: yup.string().required('Username harus diisi'),
  password: yup.string().required('Password harus diisi')
})

const Login = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState('')
  const [token, setToken] = useState('')


  const handleSubmitComplete = async (usernameValues, passwordValues) => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username: usernameValues,
        password: passwordValues
      })
      .then(response => {
        setToken(response.data.accessToken)
        const decoded = jwt_decode(response.data.accessToken);
        console.log(decoded)
        navigate(`/dishub`)
        })
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }
  return (
    <>
    <Flex backgroundColor={"var(--color-on-primary)"} width='100%' height="100vh" alignItems='center' justifyContent='center'>
      <Flex flexDir={'column'} textAlign={'center'} alignContent={'center'} backgroundColor={"var(--color-on-primary)"} width='100%' height="100%" alignItems='center' justifyContent='center' display={{ base: 'none', md: 'none', lg: 'flex' }}>
        <Text position={'Relative'} fontWeight={'regular'} fontFamily={'var(--font-family-secondary)'} fontSize={'var(--header-1)'} width={'100%'} maxWidth={'400px'}> Sisporlaka</Text>
        <Text  fontWeight={'regular'} fontFamily={'var(--font-family-secondary)'} fontSize={'var(--header-3)'} color={'{var(--color-primer)}'} >Sistem Informasi Pelaporan Kecelakaan</Text>
        <Text py={4} fontWeight={'semibold'} fontFamily={'var(--font-family-secondary)'} fontSize={'var(--header-4)'} color={'{var(--color-primer)}'} >Kolaborasi Pilar Lalu Lintas dan Angkutan Jalan Menuju 1 Data Kecelakaan </Text>
        <Image
						  width={"25%"}
							position={'Relative'} maxWidth={'350px'} 
							src={process.env.PUBLIC_URL + '/logokolaborasi.png'}
						/>
      </Flex>
      <Flex backgroundColor={{ lg: "var(--color-primer)" }} width='100%' height="100%" alignItems={{ lg: 'center' }} justifyContent='center'>
        <Box max-width='800px' borderRadius={'20px'} display="flex" gap="40px" flexDirection={"column"} size={'md'} width={{ base: '100%', md: '80%' }} padding="90px 50px 90px 50px" backgroundColor={"var(--color-on-primary)"} justifyContent={{ lg: 'center' }} textAlign='center' alignItems='center'>
          <Image
						  sizes="md" display={{ base: 'flex', lg: 'none' }} position={'Relative'} width={'80%'} maxWidth={'200px'}
							src={process.env.PUBLIC_URL + '/logokolaborasi.png'}
						/>
          <Text size='md' fontWeight='bold' fontFamily='var(--font-family-secondary)' fontSize='var(--header-2)' color='var(--color-primer)' >Masuk</Text>
          <Text size='md' fontWeight='semibold' fontFamily='var(--font-family-secondary)' fontSize='var(--header-4)' color='var(--color-error)' >{msg}</Text>
          <Formik
             initialValues={{ username: '', password: '' }}
             validationSchema={schema}
             onSubmit={(actions) => {
               actions.resetForm()
             }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormControl width={{ base: '100%', md: '100%', lg:'380px' }} size={'md'} marginTop={'20px'} isInvalid={errors.username && touched.username}>
                  <FormLabel htmlFor="username">
                    Username
                  </FormLabel>
                  <InputGroup>
                  <InputLeftAddon>
                    <InputLeftElement
                       pointerEvents='none'
                       children={<FaUser color='gray.300' />}
                   />
                  </InputLeftAddon>
                  <Input size={'md'}
                    marginTop={'0 auto'}
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    name="username"
                    variant='outline'
                    placeholder="Username"
                    />
                  </InputGroup>
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl width={{ base: '100%', md: '100%', lg:'380px' }} size={'md'} marginTop={'20px'} isInvalid={errors.username && touched.username}>
                  <FormLabel htmlFor="password">
                    Password
                  </FormLabel>
                  <InputGroup>
                  <InputLeftAddon>
                  <InputLeftElement
                       pointerEvents='none'
                       children={<RiLockPasswordFill size={'20'} color='gray.300' />}
                   />                  
                  </InputLeftAddon>
                  <Input size={'md'}
                    marginTop={'0 auto'}
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    variant='outline'
                    placeholder="Password"
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  marginTop={'44px'}
                  width="100%"
                  height="50px"
                  borderRadius="10px"
                  backgroundColor="var(--color-primer)"
									loadingText="Tunggu Sebentar..."
                  type="submit"
                  className="btn-login"
                  onClick={() => {
                    handleSubmitComplete(values.username, values.password)
                  }}
                  >
                  <Text fontWeight='bold' fontFamily='var(--font-family-secondary)' fontSize='var(--header-3)' color='var(--color-on-primary)' >
                    Masuk
                  </Text>
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Flex>
 </>
  )
};
export default Login