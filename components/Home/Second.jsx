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
        <Text style={{ color: "#ffffff", fontSize: 18 }}> Login</Text>
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
            skipLabel='Ignore'
            nextLabel='Next'
            showPagination
            // skipToPage={2}
            bottomBarHeight={100}
            // imageContainerStyles={{ backgroundColor: COLORS.primary }}
            pages={[
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.logo} style={{ width: Dimensions.get('window').width, height: 250, objectFit: 'contain' }} />,
                    title: <Text style={{ fontSize: 30, color: '#ffffff' }}>Incubate</Text>,
                    subtitle: "Hatching innovation, nurturing success The intelligent incubator egg",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.hen} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 30, color: '#ffffff' }}>Tracked</Text>,
                    subtitle: "Precision hatching, the future in your hands The intelligent egg incubator",
                },
                {
                    backgroundColor: COLORS.primary,
                    image: <Image source={images.hen2} style={{ width: Dimensions.get('window').width, height: 250 }} />,
                    title: <Text style={{ fontSize: 30, color: '#ffffff' }}>Success</Text>,
                    subtitle: "Precision hatching, the future in your hands The intelligent egg incubator",
                },


            ]}
        />
    )
}

export default Second


