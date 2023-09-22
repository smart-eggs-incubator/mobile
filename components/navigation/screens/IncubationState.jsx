import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
// import Header from '../components/Header'
import { Button, Flex } from '@react-native-material/core'
import StatValue from '../components/StatValue'
import Ionicons from '@expo/vector-icons/Ionicons';

// import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { Pressable } from 'react-native'
import Header from '../components/Header';
import { Calendar } from 'react-native-calendars';
import MyCalendar from '../components/MyCalendar';

import { useGetIncubationsStateQuery } from '../../../src/services/api/HomeApi';


export default function IncubationState({ route, navigation }) {
    const [selected, setSelected] = useState('');
    const { inc, token } = route.params
    console.log('ID SELECTABLE ', inc);
    const data1 = [
        { x: -2, y: 1 },
        { x: -1, y: 0 },
        { x: 8, y: 13 },
        { x: 9, y: 11.5 },
        { x: 10, y: 8 },
        { x: 12, y: 6 },
        { x: 14, y: 4 }
    ]

    const data2 = [
        { x: -2, y: 15 },
        { x: -1, y: 10 },
        { x: 0, y: 12 },
        { x: 1, y: 7 },
        { x: 8, y: -5 },
        { x: 9, y: 13.5 },
        { x: 10, y: 8 }
    ]

    const { data } = useGetIncubationsStateQuery({ id: inc.incubator.serial_number, token: token })
    console.log('FETCHED DATA : ', data);

    const startDate = '2023-09-15'; // Start date in YYYY-MM-DD format
    const endDate = '2023-09-30';   // End date in YYYY-MM-DD format

    // Create an object to hold the marked dates
    const currentDate = new Date(startDate);
    const markedDates = {

    };

    while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = { selected: true },
            currentDate.setDate(currentDate.getDate() + 1);
    }
    console.log(markedDates);

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Header />
            <Flex justify='end' direction='row' fill p={10} >
                <Button onPress={() => { navigation.navigate('ViewMore') }} variant='outlined' title='View more' />

            </Flex>
            <MyCalendar />

            <Calendar

                markedDates={markedDates}
            />

            <Flex
                p={20}
                direction='row'
                wrap

            >
                {
                    data &&
                    (
                        <>
                            <StatValue
                                icon={'wifi'}
                                value={'Connected'}
                                mesure={''}
                                title={'Wifi'}
                            />
                            <StatValue

                                icon={"thermometer-sharp"}
                                value={data.temparature}
                                mesure={'°C'}
                                title={'Temperature'}
                            />
                            <StatValue
                                icon={'videocam-sharp'}
                                value={'21'}
                                mesure={'Pictures'}
                                title={'Images'}
                            />

                            <StatValue
                                icon={"speedometer"}
                                value={data.gas}
                                mesure={' ppm Normal'}
                                title={'Gaz Level'}
                            />
                            <StatValue
                                icon={'md-thermometer-sharp'}
                                value={'0.6'}
                                mesure={'Liters'}
                                title={"Water Level"}
                            />
                            <StatValue
                                icon={'speedometer'}
                                value={data.inclinaision_degree}
                                mesure={'°'}
                                title={'Inclinaison'}
                            />
                        </>

                    )
                }
                {/* <StatValue
                    icon={'flash'}
                    value={'On'}
                    mesure={''}
                    title={'Alimentation'}
                /> */}
            </Flex>
            {/* <Flex p={12} direction='row' fill justify='end' m={20}>
                <Button color='#62444ace' title="Suivant" style={{ margin: 20 }} onPress={() => navigation.navigate('StatsSecond')} />


            </Flex> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({})