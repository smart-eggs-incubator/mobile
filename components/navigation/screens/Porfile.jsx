import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useNavigation from "@react-navigation/native";
import images from '../../../assets/constants/images';
import { Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import { COLORS } from '../../../assets/constants/theme';
import * as Location from 'expo-location'
const Profile = () => {


    const [pin, setPin] = useState({
        latitude: 0,
        longitude: 0,
    })

    const [markerPosition, setMarkerPosition] = useState({
        latitude: 37.78825, // Latitude initiale
        longitude: -122.4324, // Longitude initiale
    });

    const [origin, seOrigin] = useState({
        latitude: 37.78825, // Latitude initiale
        longitude: -122.4324, // Longitude initiale
        latitudeDelta: 0.1999,
        longitudeDelta: 0.6999,
    });
    const [origin2, seOrigin2] = useState({
        latitude: 37.8825, // Latitude initiale
        longitude: -122.4324, // Longitude initiale
        latitudeDelta: 0.1999,
        longitudeDelta: 0.6999,
    });

    React.useEffect(() => {
        getLocationPermission();
    }, [])
    useEffect(() => {
        // Interval pour changer la position du marker toutes les 0,5 secondes
        // getLocationPermission();
        const markerInterval = setInterval(updateMarkerPosition, 100);
        return () => {
            // Nettoyer l'intervalle lorsque le composant est démonté
            clearInterval(markerInterval);
        };
    }, []);


    async function getLocationPermission() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});

        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setPin(current);
        // console.log(current);
    }

    const updateMarkerPosition = () => {
        // Générer une nouvelle position aléatoire pour le marker

        getLocationPermission();

    };

    return (
        <View style={styles.container}

        >
            <MapView
                provider='google'
                style={styles.map}
                initialRegion={{
                    latitude: pin.latitude,
                    longitude: pin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={pin}
                    icon={images.logovoiture}

                // style={{ width: 10, height: 10 }}
                // image={(<Image source={images.logovoiture} />)}


                />
                {/* <MapViewDirections
                    origin={markerPosition}
                    destination={origin2}
                    apikey="AIzaSyDhej0DBE18RkFC6eHtcAt0ahm_OYFmSKY"
                    strokeWidth={5}
                    // strokeColor={COLORS.tertiary}
                    mode="DRIVING"
                    timePrecision="now"
                    onReady={(re) => {
                        const datav = { distance: re.distance, duration: re.duration };
                        // setResult(datav);
                        // console.log(`Distance : ${re.distance}`);
                        // console.log(`Distance : ${re.duration}`);
                    }}
                    onStart={(params) => {
                        // console.log(
                        //     `Started routing between "${params.origin}" and "${params.destination}"`
                        // );
                    }}
                /> */}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50
    },
    map: {
        flex: 1,
    },
});

export default Profile;
