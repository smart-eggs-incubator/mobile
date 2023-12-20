import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator, Button, Flex, TextInput } from '@react-native-material/core'
import { COLORS } from '../../../assets/constants/theme'
import { useDoActionMutation } from '../../../src/services/api/HomeApi'
import { useNoteIncubationMutation } from '../../../src/services/api/HomeApi'
const NoteScreen = ({ route, navigation }) => {
    const { id, token } = route.params
    const [doAction] = useDoActionMutation()
    const [NoteIncubation] = useNoteIncubationMutation()

    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        setIsLoading(true)
        // const res = await CreateIncubation({ token: LoggedUser.user.payload.access, body: postData })
        // if (res.data) {
        //     alert('Success')
        // }
        // else {
        //     alert('Some Fields is required')
        // }7
        const res1 = await NoteIncubation({ id: id, token: token, body: postData })
        if (res1.data) {
            const res = await doAction({ token: token, id: id, body: { action: "STOP" } })
            console.log("RESPONSE", res);
            if (res.data) {
                alert('NOTE AND STATE ARE SAVED')
                navigation.pop()
            }

        }
        else {
            console.log(res1.error);
        }

        setIsLoading(false)
    }
    const [postData, setPostData] = useState({
        "note": 0,
        "result": true,
        "comment": "",
        "incubation": id
    })
    return (
        <View>
            <Flex p={20} >

                <Text>
                    Note your incubation
                </Text>

                <Text style={{ marginTop: 25, fontSize: 21 }} >
                    Note
                </Text>
                <TextInput
                    style={{ marginTop: 30 }}
                    variant='outlined'
                    placeholder='Note'
                    inputMode='decimal'
                    value={postData.note}
                    onChangeText={(target) => setPostData({ ...postData, note: target })}

                />
                <Text style={{ marginTop: 25, fontSize: 21 }} >
                    Comment
                </Text>
                <TextInput
                    style={{
                        marginTop: 30,
                        height: 100, // Définissez la hauteur souhaitée pour le TextArea
                        textAlignVertical: 'top', // Alignement du texte en haut


                    }}
                    variant='outlined'
                    placeholder='Comment'
                    inputMode='text'
                    multiline={true}
                    numberOfLines={5}
                    value={postData.comment}
                    onChangeText={(target) => setPostData({ ...postData, comment: target })}

                />

                <Button
                    disabled={isLoading}
                    title={!isLoading ? 'Note incubation' : ''}
                    style={{
                        backgroundColor: COLORS.primary,
                        marginTop: 20,
                        padding: 10,
                    }}
                    onPress={handleSubmit}
                >
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Text style={{ color: 'white' }}>Note incubation</Text>
                    )}
                </Button>
            </Flex>
        </View>
    )
}

export default NoteScreen

const styles = StyleSheet.create({})