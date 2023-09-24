import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
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
import { COLORS } from '../../../assets/constants/theme';


export default function IncubationState({ route, navigation }) {
    const [selected, setSelected] = useState('');
    const { inc, token } = route.params
    console.log('ID SELECTABLE ', inc);

    const { data, refetch } = useGetIncubationsStateQuery({ id: inc.incubator.serial_number, token: token })
    // console.log('FETCHED DATA : ', data);

    const startDate = '2023-09-15'; // Start date in YYYY-MM-DD format
    const endDate = '2023-09-30';   // End date in YYYY-MM-DD format

    // Create an object to hold the marked dates
    const currentDate = new Date(startDate);
    const markedDates = {

    };

    while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {
            selected: true,
            // color: COLORS.primary,
            // textColor: 'white',
            // disabled: true,
        },
            currentDate.setDate(currentDate.getDate() + 1);
    }
    // console.log(markedDates);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        refetch()
    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >

            <Header />
            <Flex justify='end' direction='row' fill p={10} >
                <Button onPress={() => { navigation.navigate('ViewMore', { info: inc, token: token }) }} variant='outlined' title='View more' />
            </Flex>
            <MyCalendar />

            <Calendar
                markingType="multi-dot"
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
                                value={data.water_level1}
                                mesure={'Ml'}
                                title={"Water Level 1"}
                            />
                            <StatValue
                                icon={'md-thermometer-sharp'}
                                value={data.water_level2}
                                mesure={'Ml'}
                                title={"Water Level 2"}
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