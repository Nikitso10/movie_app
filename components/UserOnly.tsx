import { useUser } from '@/services/useUser'
import {Tabs, useRouter} from 'expo-router'
import React, { useEffect } from 'react'
import { Text } from 'react-native'

interface UserOnlyProps {
    children: React.JSX.Element | React.JSX.Element[]
}

const UserOnly = ({ children } : UserOnlyProps) => {
    const { user, authChecked } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (authChecked && user !== null) {
            router.replace("/login")
        }
    }, [user, authChecked])

    if (!authChecked || !user) {
        return (
            <Text>Loading</Text>
        )
    }

    return children
}

export default UserOnly