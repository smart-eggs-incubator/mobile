import { Dimensions, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { ActivityIndicator, Button, Flex } from '@react-native-material/core'
import StatValue from '../components/StatValue'
import Ionicons from '@expo/vector-icons/Ionicons';

import { Chart, VerticalAxis, HorizontalAxis, Line } from 'react-native-responsive-linechart'
import { Pressable } from 'react-native'

import { BarChart, StackedBarChart, LineChart } from 'react-native-chart-kit'
import { useGetIncubationSevedDataQuery } from '../../../src/services/api/HomeApi'

import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import GeneratedRepport from '../../../src/pdf/GeneratedRepport'
import { pdf } from '../../../src/pdf/GeneratedRepport'
export default function StatsFirst({ route, navigation }) {
    const { info, token } = route.params
    const { data, isSuccess, refetch } = useGetIncubationSevedDataQuery({ id: info.incubator.serial_number, inc: info.id, token: token })
    console.log("DATA  ", data);
    const [temperatures, setTemperatures] = useState([]);
    const [gas, setGas] = useState([]);
    const [humidity, setHumidity] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dates, setDates] = useState([])
    const [hours, setHours] = useState([])


    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        refetch()
    }
    const [generatingPDF, setGeneratingPDF] = useState(false)

    const generatePdf = async () => {
        const html = `
        
            <html> 
                <body>
                    <h1>
                        Hi Daniel
                    </h1>
                    <p> This is a repport </p>
                </body>
            </html>
        `
        setGeneratingPDF(true)
        // const file = await printToFileAsync({
        //     html: pdf,
        //     base64: false
        // })
        // setGeneratingPDF(false)
        const uri = await generateMyPDF({
            gaz: 0, humidity: 0, parametters: {
                type: data[0].incurbation.incubation_type.name,
                title: `${data[0].incurbation.incubator.serial_number} /00 ${data[0].id} `,
            }

            , temp: temperatures, waterleve: [],
            humidity: humidity,
            date: dates,
            heure: hours
        })
        setGeneratingPDF(false)

        await shareAsync(uri)
    }
    const [isOkay, setIsOkay] = useState(false)
    useEffect(() => {
        if (isSuccess) {
            setTemperatures([0]);
            setGas([0]);
            setHumidity([0]);
            setLabels(['.']);
            setDates([])
            setHours([])

            data.forEach((element) => {
                setTemperatures((prevTemperatures) => [...prevTemperatures, element.temparature]);
                setGas((prevGas) => [...prevGas, element.gas]);
                setHumidity((prevHumidity) => [...prevHumidity, element.humidity]);
                setLabels((prevLabels) => [...prevLabels, '.']);

                const dateTimeString = element.date_time;
                const dateTime = new Date(dateTimeString);
                const date = dateTime.toISOString().split('T')[0];
                const heure = dateTime.toISOString().split('T')[1].split('.')[0];
                setDates((prevLabels) => [...prevLabels, date]);
                setHours((prevLabels) => [...prevLabels, heure]);
            });
            setIsOkay(true);
            console.log("humidity ", humidity);
        }
    }, [isSuccess]);

    return (
        <ScrollView style={{ backgroundColor: 'white' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            {/* <Header /> */}

            <Flex fill justify='center' direction='row' p={5}

            >
                <Button
                    variant='outlined'
                    title={
                        generatingPDF ?
                            (
                                <>
                                    <ActivityIndicator />
                                </>
                            )
                            :
                            (
                                <>
                                    <Text>  Generate Pdf </Text>
                                </>
                            )
                    }
                    style={{
                        width: Dimensions.get('window').width - 50,
                        padding: 5
                    }}
                    onPress={generatePdf}
                />
            </Flex>

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
                                                <Text> Temperatures </Text>
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
                                                <Text> Humidity </Text>
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

                                                <Text> gas </Text>
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





async function generateMyPDF({ parametters, temp, humidity, gaz, waterleve, date, heure }) {
    // Commencez par construire l'en-tête du HTML
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Rapport d'Incubation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding:20px;
            }
    
            h1 {
                text-align: center;
            }
    
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
    
            table,
            th,
            td {
                border: 1px solid #ddd;
            }
    
            th,
            td {
                padding: 8px;
                text-align: left;
            }
        </style>
    </head>
    
    <body>

    <h1>Rapport d'Incubation</h1>

    <h2>Informations sur l'Incubation</h2>
    <p><strong>Titre:</strong>  ${parametters.title} </p>
    <p><strong>Type d'Incubation:</strong>  ${parametters.type} </p>

    <h2>Données d'Incubation</h2>
    <table>

    <tr>
    <th>Date</th>
    <th>Heure</th>
    <th>Température (°C)</th>
    <th>Humidité (%)</th>
    <th>Niveau d'eau</th>
    <th>Rotation des œufs</th>
    </tr>   
    `;

    // Utilisez une boucle for pour parcourir le tableau de données
    for (let i = 0; i < temp.length; i++) {
        const tem = temp[i];
        const hum = humidity[i]
        // Ajoutez le contenu HTML pour chaque élément de données
        htmlContent += `
        <tr>
            <td>01/10/2023</td>
            <td>60</td>
            <td> ${tem} </td>
            <td> ${hum} </td>
            <td>Medium</td>
            <td>Oui</td>
        </tr>
        
      `;
    }

    // Terminez le contenu HTML
    htmlContent += `
        </table>


        </body>
    
    </html>
    `;

    // Générez le PDF à partir du HTML
    const file = await printToFileAsync({ html: htmlContent, base64: false });

    // Retournez l'URI du fichier PDF généré
    return file.uri;
}