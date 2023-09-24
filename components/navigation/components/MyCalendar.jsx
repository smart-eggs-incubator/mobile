import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars';

const MyCalendar = ({ markedDate }) => {

    const [selected, setSelected] = useState('');
    return (
        <View style={{ padding: 20, backgroundColor: 'white', shadowOffset: 5, shadowColor: 'gray', shadowOpacity: .5, borderRadius: 10, shadowRadius: 5 }}>
            <Calendar
                style={{ borderRadius: 1 }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}

                markedDates={{

                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
                }}
            />
        </View>
    )
}

export default MyCalendar

const styles = StyleSheet.create({})