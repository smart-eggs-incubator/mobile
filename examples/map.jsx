// {/* <View style={{ marginTop: 200 }}>
//                 <Text>  {token} e</Text>
//             </View>
//             <View style={{ height: SIZES.window }}>
//                 <MapView
//                     style={styles.map}
//                     initialRegion={{
//                         latitude: 3.8633472,
//                         longitude: 11.5113984,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     }}
//                 >
//                     <Marker
//                         coordinate={{ latitude: coordinate.latitide, longitude: coordinate.longitude }}

//                     />
//                     <MapViewDirections
//                         origin={origin}
//                         destination={mapRegion}
//                         apikey="AIzaSyDhej0DBE18RkFC6eHtcAt0ahm_OYFmSKY"
//                         strokeWidth={10}
//                         strokeColor={COLORS.tertiary}
//                         mode="DRIVING"
//                         timePrecision="now"
//                         onReady={(re) => {
//                             const datav = { distance: re.distance, duration: re.duration };
//                             setResult(datav);
//                             // console.log(`Distance : ${re.distance}`);
//                             // console.log(`Distance : ${re.duration}`);
//                         }}
//                         onStart={(params) => {
//                             // console.log(
//                             //     `Started routing between "${params.origin}" and "${params.destination}"`
//                             // );
//                         }}
//                     />
//                 </MapView>
//             </View> */}
















// //             import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
// // import React from 'react'
// // import Onboarding from 'react-native-onboarding-swiper'

// // const Dots =({selected}) =>{
// //     let backgroundColor;
// //     backgroundColor = selected ? '#ffffff' : '#808080'
// //     return(
// //         <View
// //             style={{
// //                 height: 5,
// //                 width: 5,
// //                 marginHorizontal: 3,
// //                 backgroundColor 
// //             }} 
// //         />
// //     )
// // }

// // const Done = ({ ...props}) =>(
// //     <TouchableOpacity
// //         style={{
// //             marginRight:12
// //         }}
// //     {...props}
// //     >
// //         <Text style={{color:"#ffffff",fontSize:18}}>Se Connecter</Text>
// //     </TouchableOpacity>
// // )

// // const WelcomePage = ({navigation}) => {
// //   return (
// //     <Onboarding
// //     onSkip={() => navigation.navigate('Login')} // eslint-disable-line no-console
// //     onDone={()=> navigation.navigate('Login')}
// //     DotComponent ={Dots}
// //     DoneButtonComponent={Done}
// //     borderBottomColor= '#8A4EFC'
// //   pages={[
// //     {
// //       backgroundColor: '#4632A1',
// //       image: <Image source={require('../media/alertes5.png')} style={{width:Dimensions.get('window').width, height:250}}/>,
// //       title: <Text style={{fontSize:50, color:'#ffffff'}}>Alertes</Text>,
// //       subtitle: "Alerte automatique en cas d'accident",
// //     },
// //     {
// //         backgroundColor: '#4632A1',
// //         image: <Image source={require('../media/fond4.png')} style={{width:Dimensions.get('window').width, height:250}}/>,
// //         title: <Text style={{fontSize:50, color:'#ffffff'}}>Intervention</Text>,
// //         subtitle: "Intervention rapide des secours",
// //     },
// //     {
// //         backgroundColor: '#4632A1',
// //         image: <Image source={require('../media/fond4.png')} style={{width:Dimensions.get('window').width, height:250}}/>,
// //         title: <Text style={{fontSize:50, color:'#ffffff'}}>Tracking</Text>,
// //         subtitle: "Suivre votre véhicule de manière instantanée",
// //     },
// //     {
// //         backgroundColor: '#4632A1',
// //         image: <Image source={require('../media/voiture.png')} style={{width:Dimensions.get('window').width, height:250}}/>,
// //         title: <Text style={{fontSize:50, color:'#ffffff'}}>Ainsi</Text>,
// //         subtitle: "Sécuriser vos déplacements",
// //     },

// //   ]}
// // />
// //   )
// // }

// // export default WelcomePage



// import * as Location from 'expo-location'
// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'
// import MapView, { Marker, Circle, rankby, Region, Polyline } from 'react-native-maps'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
// import MapViewDirections from 'react-native-maps-directions'
// const carImage = require('../media/police.jpg')


// const LocatePage = ({ navigation }) => {
//     const [pin, setPin] = React.useState({
//         latitude: 3.8182320,
//         longitude: 11.5593439
//     })

//     const [region, setRegion] = React.useState({
//         latitude: 3.8182320,
//         longitude: 11.5593439,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//     })

//     React.useEffect(() => {
//         getLocationPermission();
//     }, [])
//     async function getLocationPermission() {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             alert('Permission denied');
//             return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         const current = {
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude
//         }
//         setPin(current);
//     }

//     return (
//         <View style={{ marginTop: 50, flex: 1 }}>
//             {/*     
//           <View style={styles.blocTete}>
                     
//           </View> */}
//             <GooglePlacesAutocomplete
//                 placeholder='rechercher'
//                 fetchDetails={true}
//                 GooglePlacesSearchQuery={{
//                     rankby: "distance"
//                 }}

//                 onPress={(data, details = null) => {
//                     console.log(data, details);
//                     setRegion({
//                         latitude: details.geometry.location.lat,
//                         longitude: details.geometry.location.lng,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421,
//                     })
//                 }}
//                 query={{
//                     key: 'AIzaSyDhej0DBE18RkFC6eHtcAt0ahm_OYFmSKY',
//                     language: 'fr',
//                     components: 'country:cmr',
//                     types: 'establishment',
//                     radius: 3000000,
//                     location: `${region.latitude}, ${region.longitude}`,
//                 }}
//                 styles={{
//                     container: { flex: 0, position: 'absolute', width: '100%', zIndex: 1 },
//                     listView: { backgroundColor: 'white' }
//                 }}
//             />
//             <MapView
//                 style={styles.map}
//                 initialRegion={{
//                     latitude: 3.8182320,
//                     longitude: 11.5593439,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                 }}
//                 provider='google'
//             >

//                 <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>

//                 </Marker>
//                 <Marker
//                     coordinate={pin}
//                     title="IAI-CAMEROUN"
//                     description="Accident survenu"
//                 // image={carImage}

//                 />
//                 <Circle
//                     center={pin}
//                     radius={1000}
//                 />
//                 <MapViewDirections
//                     origin={pin}
//                     destination={region}
//                     apikey="AIzaSyDhej0DBE18RkFC6eHtcAt0ahm_OYFmSKY"
//                     strokeColor='#4632A1'
//                     strokeWidth={5}
//                 />
//                 {/* <Polyline
//                               coordinates={[pin, region]}
//                               strokeColor='#4632A1'
//                               strokeWidth={5}
//                             /> */}
//             </MapView>
//         </View>
//     )
// }


// const styles = StyleSheet.create({

//     // blocTete:{
//     //     height: 150,
//     //     width :Dimensions.get('window').width,
//     //     backgroundColor:'#4632A1',
//     // },
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     map: {
//         width: '100%',
//         height: '100%'
//     }
// })
// export default LocatePage











// import React, { useState, useEffect } from 'react';
// import { View, Image } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation'; // Import the geolocation module
// import images from './path-to-your-images'; // Import your images

// const YourComponent = () => {
//     const [pinCoordinate, setPinCoordinate] = useState({ latitude: 0, longitude: 0 });
//     const [rotationDegrees, setRotationDegrees] = useState(0);

//     useEffect(() => {
//         // Get the user's current location
//         Geolocation.getCurrentPosition(
//             position => {
//                 const { latitude, longitude } = position.coords;
//                 setPinCoordinate({ latitude, longitude });

//                 // Calculate the rotation angle based on the heading value from the GPS data
//                 if (position.coords.heading) {
//                     const heading = position.coords.heading;
//                     setRotationDegrees(heading);
//                 }
//             },
//             error => console.error(error),
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//         );

//         // Subscribe to location updates to continuously update the rotation angle
//         const watchId = Geolocation.watchPosition(
//             position => {
//                 const { latitude, longitude } = position.coords;
//                 setPinCoordinate({ latitude, longitude });

//                 // Calculate the rotation angle based on the heading value from the GPS data
//                 if (position.coords.heading) {
//                     const heading = position.coords.heading;
//                     setRotationDegrees(heading);
//                 }
//             },
//             error => console.error(error),
//             { enableHighAccuracy: true, distanceFilter: 10 }
//         );

//         // Clean up the watch subscription when the component unmounts
//         return () => {
//             Geolocation.clearWatch(watchId);
//         };
//     }, []);

//     return (
//         <View style={{ flex: 1 }}>
//             <MapView
//                 style={{ flex: 1 }}
//                 initialRegion={{
//                     latitude: pinCoordinate.latitude,
//                     longitude: pinCoordinate.longitude,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01,
//                 }}
//             >
//                 <Marker
//                     coordinate={pinCoordinate}
//                     rotation={rotationDegrees}
//                 >
//                     <Image source={images.logovoiture} style={{ width: 30, height: 30 }} />
//                 </Marker>
//             </MapView>
//         </View>
//     );
// };

// export default YourComponent;
