import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button, Flex } from '@react-native-material/core';
import StatValue from '../components/StatValue';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import { useGetIncubationsStateQuery, useDoActionMutation } from '../../../src/services/api/HomeApi';
import { COLORS } from '../../../assets/constants/theme';
import Header from '../components/Header';

export default function IncubationState({ route, navigation }) {
    const [selected, setSelected] = useState('');
    const { inc, token } = route.params;
    const { data, refetch, isSuccess } = useGetIncubationsStateQuery({
        id: inc.incubator.serial_number,
        inc: inc.id,
        token: token,
    });
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const currentDate = new Date(startDate);
    const [doAction] = useDoActionMutation();
    const markedDates = {};

    const dispatch = useDispatch();
    const [action, setAction] = useState('');

    const handlePress = async () => {
        console.log("ACTION : ", action);
        if (action === 'STOP') {
            navigation.navigate('Notes', { id: inc.id, token: token });
        } else {
            const res = await doAction({ token: token, id: inc.id, body: { action: action } });
            console.log("RESPONSE", res);
            if (res.error) {
                alert('Other incubation is in progress');
            }
        }
    };
    const [d, setd] = useState(false)

    const [startDateString, setStartDateString] = useState(null);
    console.log(action);

    useEffect(() => {

        const intervalId = setInterval(() => {
            // Call onRefresh2 function every 5 seconds
            onRefresh();
        }, 5000);

        console.log('1')

        if (isSuccess) {
            console.log(data.start_date);
            if (data.start_date !== null) {
                setStartDateString(data.start_date.toString());
            }

            setStartDate(startDateString);

            const newDate = new Date("2023-10-05");
            console.log('12')
            newDate.setDate(newDate.getDate() + data.incubation_type.duration);
            const endDateString = newDate.toISOString();
            setEndDate(endDateString);

            if (data.state === 'PENDING') {
                setAction('START');
            } else if (data.state === 'IN PROGRESS') {
                setAction('STOP');
            }
        }

        setTimeout(() => {
            refetch()
        },

            2000)
        return () => clearInterval(intervalId);
    }, [isSuccess]);

    while (currentDate <= new Date(endDate)) {
        const dateString = currentDate.toISOString().split('T')[0];
        markedDates[dateString] = {
            selected: true,
        };
        currentDate.setDate(currentDate.getDate() + 1);
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    };

    return (
        <ScrollView
            style={{ backgroundColor: 'white' }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <Header />
            <Flex justify='center' direction='row' fill p={10}>
                <Button
                    style={{
                        width: Dimensions.get('window').width - 50,
                        padding: 5,
                    }}
                    onPress={() => {
                        navigation.navigate('ViewMore', { info: inc, token: token });
                    }}
                    variant='outlined'
                    title='View More'
                />
            </Flex>
            {inc.state !== "FINISHED" && (
                <Flex justify='center' direction='row' fill p={10}>
                    <Button
                        style={{
                            width: Dimensions.get('window').width - 50,
                            padding: 5,
                        }}
                        onPress={handlePress}
                        variant='outlined'
                        title={
                            inc.state === "PENDING" ? (
                                <Text> START </Text>
                            ) : (
                                <>
                                    {inc.state === "IN PROGRESS" ? <Text> STOP </Text> : <></>}
                                </>
                            )
                        }
                    />
                </Flex>
            )}

            <Calendar markingType="multi-dot" markedDates={markedDates} />

            <Flex p={20} direction='row' wrap>
                {data && (
                    <>
                        <StatValue icon={'wifi'} value={'Connected'} mesure={''} title={'Wifi'} />
                        <StatValue icon={"thermometer-sharp"} value={data.temparature.toFixed(2)} mesure={'°C'} title={'Temperature'} />
                        <StatValue icon={'videocam-sharp'} value={'21'} mesure={'Pictures'} title={'Images'} />
                        <StatValue icon={"speedometer"} value={data.gas} mesure={' ppm Normal'} title={'Gaz Level'} />
                        <StatValue icon={'md-thermometer-sharp'} value={data.water_level1} mesure={'Ml'} title={"Water Level 1"} />
                        <StatValue icon={'md-thermometer-sharp'} value={data.water_level2} mesure={'Ml'} title={"Water Level 2"} />
                        <StatValue icon={'speedometer'} value={data.inclinaision_degree} mesure={'°'} title={'Inclinaison'} />
                    </>
                )}
            </Flex>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
