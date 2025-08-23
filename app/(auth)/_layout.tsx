import { StatusBar } from 'react-native'
import { Stack } from "expo-router"
import React from 'react'
import {useUser} from "@/services/useUser";
import {account} from "@/services/appwrite";

const _Layout = () => {

    const { user } = useUser()
    console.log('authlayout user is: ', user)


    return (
        <>
            <StatusBar hidden={true} />
            <Stack>
                <Stack.Screen
                    name="login"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="signUp"
                    options={{ headerShown: false }}
                />
            </Stack>
        </>
    )
}
export default _Layout
