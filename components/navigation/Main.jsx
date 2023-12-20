import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './Tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GpsManagement from './screens/GpsManagement'
import Suivie from './screens/Suivie'
import GpsForm from './screens/GpsForm'
import NotificationDetails from './screens/NotificationDetails'
import IncubationState from './screens/IncubationState'
import StatsFirst from './components/StatsFirst'
import FormIncubation from './screens/FormIncubation'
import Repports from './screens/Repports'
import NoteScreen from './screens/NoteScreen'


const Stack = createNativeStackNavigator()
const Main = () => {
    return (

        <Stack.Navigator>
            <Stack.Screen key={"Tab"} name='Tab' component={Tabs} options={{ headerShown: false, headerBackVisible: false }} />
            <Stack.Screen name='GpsManagement' component={GpsManagement}
                options={{
                    headerLargeTitle: false,
                    headerTitle: ''
                }}
            />
            <Stack.Screen name='Suivie' component={Suivie}
                options={{
                    headerLargeTitle: false,
                    headerTitle: 'Incubations'
                }}
            />
            <Stack.Screen name='GpsForm'
                component={GpsForm}
                options={{
                    headerTitle: 'Incubator Form'
                }}

            />
            <Stack.Screen name='IncDetails'
                component={IncubationState}
                options={{
                    headerTitle: 'Details'
                }}

            />
            <Stack.Screen name='ViewMore'
                component={StatsFirst}
                options={{
                    headerTitle: 'View More...'
                }}
            />

            <Stack.Screen name='NotifsDetails'
                component={NotificationDetails}
                options={{
                    headerTitle: 'Notification'
                }}


            />

            <Stack.Screen name='FormIncubation'
                component={FormIncubation}
                options={{
                    headerTitle: 'Incubation'
                }}


            />

            <Stack.Screen name='Repports'
                component={Repports}
                options={{
                    headerTitle: 'Repports'
                }}


            />

            <Stack.Screen name='Notes'
                component={NoteScreen}
                options={{
                    headerTitle: 'Note'
                }}


            />
        </Stack.Navigator>
        // <NavigationContainer independent={true} 

        // >




        // </NavigationContainer>
    )
}

export default Main

const styles = StyleSheet.create({})