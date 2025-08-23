import { icons } from "@/constants/icons";
import {View, Text, Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useUser} from "@/services/useUser";
import {useEffect} from "react";
import {useRouter} from "expo-router";


const Profile = () => {
    const { user, logout, authChecked } = useUser()
    const router = useRouter();

    console.log('Profile user is: ', user)

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("/login");
        }
    }, [authChecked, user]);

    if (!authChecked || !user) return <Text>Loading...</Text>;

    return (
        <SafeAreaView className="bg-primary flex-1 px-10">
            <View className="flex justify-center items-center flex-col gap-5 py-4">
                <Image source={icons.person} className="size-10" tintColor="#fff" />
                <Text className="text-gray-500 text-base">Profile</Text>
            </View>
            <View className="flex justify-center items-center flex-col gap-5 py-4">
                <Text className=" text-white text-base">{user?.email}</Text>
            </View>
            <TouchableOpacity className="w-full rounded-md bg-indigo-500 px-3 py-2"
                              onPress={logout} >
                <Text className="mx-auto text-white font-bold mt-5 mb-3">Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Profile;