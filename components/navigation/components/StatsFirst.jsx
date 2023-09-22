import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { Button, Flex } from '@react-native-material/core'
import StatValue from '../components/StatValue'
import Ionicons from '@expo/vector-icons/Ionicons';

import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { Pressable } from 'react-native'

import { BarChart, StackedBarChart, LineChart } from 'react-native-chart-kit'

export default function StatsFirst({ navigation }) {

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
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Header />

            <Flex style={{ padding: 10 }} p={30}>
                <Text> Températures </Text>
                <LineChart
                    data={{
                        labels: ['January', 'February', 'March', 'April'],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ],
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16} // from react-native
                    height={220}
                    yAxisLabel={'Rs'}
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
                        labels: ['January', 'February', 'March', 'April'],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ],
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16} // from react-native
                    height={220}
                    yAxisLabel={'Rs'}
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
                        labels: ['January', 'February', 'March', 'April'],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                ],
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16} // from react-native
                    height={220}
                    yAxisLabel={'Rs'}
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