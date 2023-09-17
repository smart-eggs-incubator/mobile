import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import images from '../../assets/constants/images';
import { COLORS } from '../../assets/constants/theme';

const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? '#ffffff' : '#808080'
    return (
        <View
            style={{
                height: 5,
                width: 5,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    )
}

const Done = ({ ...props }) => (
    <TouchableOpacity
        style={{
            marginRight: 12
        }}
        {...props}
    >
        <Text style={{ color: "#ffffff", fontSize: 18 }}>Se Connecter</Text>
    </TouchableOpacity>
)

const Second = ({ navigation }) => {
    return (
        <Onboarding
            onSkip={() => navigation.navigate('Login')} // eslint-disable-line no-console
            onDone={() => navigation.navigate('Login')}
            DotComponent={Dots}
            DoneButtonComponent={Done}
            borderBottomColor='#8A4EFC'
            skipLabel='Ignorer'
            nextLabel='Suivant'
            showPagination
            // skipToPage={2}
            bottomBarHeight={100}
            imageContainerStyles={{ backgroundColor: COLORS.primary }}
            pages={[
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.img1} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 50, color: '#ffffff' }}>Suivie</Text>,
                    subtitle: "Suivez vos véhicule à la trace en temps réel",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.img2} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 50, color: '#ffffff' }}>Intervention</Text>,
                    subtitle: "Intervention rapide des secours",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.img3} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 50, color: '#ffffff' }}>Tracking</Text>,
                    subtitle: "Suivre votre véhicule de manière instantanée",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.img4} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 50, color: '#ffffff' }}>Ainsi</Text>,
                    subtitle: "Sécuriser vos déplacements",
                },

            ]}
        />
    )
}

export default Second


