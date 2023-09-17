import AsyncStorage from "@react-native-async-storage/async-storage";

const storeToken = async (token) => {
    try {
        const jsonValue = JSON.stringify(token)
        await AsyncStorage.setItem('token', jsonValue)
    } catch (error) {

    }
}

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token')
        if (token !== null) {
            return token
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('token')
    } catch (error) {
        console.log(error)
    }
}

export { storeToken, getToken, removeToken }