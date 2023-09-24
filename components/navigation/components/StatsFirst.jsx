import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { ActivityIndicator, Button, Flex } from '@react-native-material/core'
import StatValue from '../components/StatValue'
import Ionicons from '@expo/vector-icons/Ionicons';

import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { Pressable } from 'react-native'

import { BarChart, StackedBarChart, LineChart } from 'react-native-chart-kit'
import { useGetIncubationSevedDataQuery } from '../../../src/services/api/HomeApi'


export default function StatsFirst({ route, navigation }) {
    const { info, token } = route.params
    const { data, isSuccess } = useGetIncubationSevedDataQuery({ id: info.incubator.serial_number, inc: info.id, token: token })
    console.log("DATA  ", data);
    const [temperatures, setTemperatures] = useState([]);
    const [gas, setGas] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [labels, setLabels] = useState([]);

    const [isOkay, setIsOkay] = useState(false)
    useEffect(() => {
        if (isSuccess) {
            setTemperatures([]);
            setGas([]);
            setHumidity([]);
            setLabels([]);

            data.forEach((element) => {
                setTemperatures((prevTemperatures) => [...prevTemperatures, element.temparature]);
                setGas((prevGas) => [...prevGas, element.gas]);
                setHumidity((prevHumidity) => [...prevHumidity, element.humidity]);
                setLabels((prevLabels) => [...prevLabels, '2']);
            });
            setIsOkay(true);
            console.log("humidity ", humidity);
        }
    }, [isSuccess]);

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Header />

            <Flex style={{ padding: 10 }} p={30}>

                {
                    !isOkay ?

                        (
                            <>
                                <Flex justify='center' direction='row' items='center' h={100} fill >
                                    <ActivityIndicator size={50} />
                                </Flex>
                            </>
                        )
                        :

                        (
                            <>
                                {
                                    data.length == 0 ?

                                        (
                                            <>
                                                <Flex justify='center' direction='row' items='center' h={100} fill >
                                                    {/* <ActivityIndicator size={50} /> */}

                                                    <Text>  Acunune données pour le moment </Text>
                                                </Flex>
                                            </>
                                        )
                                        :

                                        (

                                            <>
                                                <Text> Températures </Text>
                                                <LineChart
                                                    data={{
                                                        labels: labels,
                                                        datasets: [
                                                            {
                                                                data: temperatures
                                                            },
                                                        ],
                                                    }}
                                                    width={Dimensions.get('window').width - 16} // from react-native
                                                    height={220}
                                                    // yAxisLabel={'Rs '}
                                                    yAxisSuffix=' °C'
                                                    chartConfig={{
                                                        backgroundColor: '#1cc910',
                                                        backgroundGradientFrom: '#eff3ff',
                                                        backgroundGradientTo: '#efefef',
                                                        decimalPlaces: 2, // optional, defaults to 2dp
                                                        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                        },
                                                    }}
                                                    bezier

                                                    style={{
                                                        marginVertical: 8,
                                                        borderRadius: 16,
                                                    }}
                                                />
                                                <Text> Humidité </Text>
                                                <LineChart
                                                    data={{
                                                        labels: labels,
                                                        datasets: [
                                                            {
                                                                data: humidity,
                                                            },
                                                        ],
                                                    }}
                                                    width={Dimensions.get('window').width - 16} // from react-native
                                                    height={220}
                                                    yAxisSuffix={' %'}

                                                    chartConfig={{
                                                        backgroundColor: '#1cc910',
                                                        backgroundGradientFrom: '#eff3ff',
                                                        backgroundGradientTo: '#efefef',
                                                        decimalPlaces: 2, // optional, defaults to 2dp

                                                        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                        },
                                                    }}
                                                    bezier
                                                    style={{
                                                        marginVertical: 8,
                                                        borderRadius: 16,
                                                    }}
                                                />

                                                <Text> gaz </Text>
                                                <LineChart
                                                    data={{
                                                        labels: labels,
                                                        datasets: [
                                                            {
                                                                data: gas,
                                                            },
                                                        ],
                                                    }}
                                                    width={Dimensions.get('window').width - 16} // from react-native
                                                    height={220}
                                                    yAxisSuffix={'Ppm'}

                                                    chartConfig={{
                                                        backgroundColor: '#1cc910',
                                                        backgroundGradientFrom: '#eff3ff',
                                                        backgroundGradientTo: '#efefef',
                                                        decimalPlaces: 2, // optional, defaults to 2dp
                                                        color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                        },
                                                    }}
                                                    bezier
                                                    style={{
                                                        marginVertical: 8,
                                                        borderRadius: 16,
                                                    }}
                                                />

                                            </>
                                        )
                                }
                            </>
                        )
                }
                {/* <StackedBarChart
                    data={{
                        labels: ['Test1', 'Test2'],
                        legend: ['L1', 'L2', 'L3'],
                        data: [
                            [60, 60, 60],
                            [30, 30, 60],
                        ],
                        barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                /> */}
            </Flex>


        </ScrollView>
    )
}

const styles = StyleSheet.create({})