import React from 'react'
import {
    Box,
    Flex,
    Icon,
    Text,
    WrapItem,
} from '@chakra-ui/react'

const CardDashboard = (props) => {

    let data = props.data

    return (
        <WrapItem className='dont-touch'>
            <Flex
                mt={50}
                h={'230px'}
                w={'385px'}
                bg={'#ffff'}
                borderWidth='2px'
                rounded={'2xl'}
                justify={'space-between'}
                boxShadow={'base'}
                flexDir={'column'}
                alignItems='center'
                padding={35}
            >
                <Flex
                    w={'100px'}
                    h={'56px'}
                    borderRadius={'10px'}
                    bg={'var(--color-primer)'}
                    justify='center'
                    align={'center'}
                >
                    <Icon as={data.icon} color={'white'} w={6} h={6} />
                </Flex>
                <Text color={"black"} fontWeight={'bold'} fontSize={'var( --header-1)'} fontFamily={'var(--font-family-secondary)'}>
                    {data.value}
                </Text>
                <Text color={"black"} fontWeight={'semibold'} fontSize={'var( --header-4)'} fontFamily={'var(--font-family-secondary)'}>
                    {data.name}
                </Text>
            </Flex>
        </WrapItem>
    )
}
export default CardDashboard