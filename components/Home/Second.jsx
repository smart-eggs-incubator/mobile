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
            // imageContainerStyles={{ backgroundColor: COLORS.primary }}
            pages={[
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.logo} style={{ width: Dimensions.get('window').width, height: 250, objectFit: 'contain' }} />,
                    title: <Text style={{ fontSize: 30, color: '#ffffff' }}>Incubez</Text>,
                    subtitle: "Faire éclore l’innovation, nourrir le succès L'œuf intelligent Incubateur",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.hen} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 30, color: '#ffffff' }}>Suivie</Text>,
                    subtitle: "Éclosion de précision, l'avenir entre vos mains L'incubateur d'œufs intelligent",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.hen2} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 30, color: '#ffffff' }}>Succès</Text>,
                    subtitle: "Éclosion de précision, l'avenir entre vos mains L'incubateur d'œufs intelligent",
                },


            ]}
        />
    )
}

export default Second


