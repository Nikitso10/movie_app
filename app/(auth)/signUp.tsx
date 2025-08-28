import {View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {useState} from "react";
import {router} from "expo-router";
import {useUser} from "@/services/useUser";


const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null);
    const { user, signUp } = useUser()

    const handleSubmit = async () => {
        setError(null)

        try {
            await signUp(email, password)
            console.log('current user is: ', user)
        } catch (error) {
            setError(error instanceof Error ? error.message : String(error))
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 bg-primary">
                <Image
                    source={images.bg}
                    className="absolute w-full z-0"
                    resizeMode="cover"
                />
                <View className="items-center">
                    <View >
                        <Image source={images.movieflexlogo} className="w-16 h-16 mt-16 mb-5 mx-auto" />
                        <Text className="mt-10 text-center text-xl font-bold tracking-tight text-white">
                            Create an account
                        </Text>
                    </View>
                    <View className="mt-10 w-full max-w-sm self-center">
                        <View className="mb-6">
                            <TextInput className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                                       placeholder="Email"
                                       value={email}
                                       onChangeText={setEmail}
                                       keyboardType="email-address"
                                       placeholderTextColor="#0000ff"
                            />
                        </View>
                        <View className="mb-6">
                            <TextInput className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                                       placeholder="Password"
                                       value={password}
                                       onChangeText={setPassword}
                                       placeholderTextColor="#0000ff"
                                       secureTextEntry={true}
                            />
                        </View>
                        <TouchableOpacity className="w-full rounded-md bg-indigo-500 px-3 py-2"
                                          onPress={handleSubmit} >
                            <Text className="mx-auto text-white font-bold mt-5 mb-3">Submit</Text>
                        </TouchableOpacity>
                        <View className="mt-5">
                            {error && <Text className="mx-auto text-white mt-5 mb-3">{String(error)}</Text>}

                            <TouchableOpacity
                                onPress={() => router.push("/login")} >
                                <Text className="mx-auto text-white font-bold mt-5 mb-3">Go to Login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
export default SignUp
