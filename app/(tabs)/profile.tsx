import { icons } from "@/constants/icons";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/services/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { LetteredAvatar } from "@/components/LetteredAvatar";
import { updateEmail, updateName, updatePassword } from "@/services/appwrite";


const Profile = () => {
    const { user, logout, authChecked } = useUser();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState<string | null>(null);

    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);
    const [editName, setEditName] = useState(false);

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("../login");
        }
        if (user!==null && authChecked) {
            setEmail(user.email || "");
            setName(user.name || "");
        }
    }, [authChecked, user]);

    if (!authChecked || !user) return <Text>Loading...</Text>;

    const handleSubmit = async () => {
        setError(null);
        try {
            if (editEmail) {
                await updateEmail(email, oldPassword); // requires password
                setEditEmail(false);
            }
            if (editPassword) {
                await updatePassword(newPassword, oldPassword);
                setEditPassword(false);
                setNewPassword("");
                setOldPassword("");
            }
            if (editName) {
                await updateName(name);
                setEditName(false);
            }
        } catch (err: any) {
            console.error("Error updating profile:", err);
            setError(err?.message || "Something went wrong");
        }
    };

    return (
        <SafeAreaView className="bg-primary flex-1 px-10 ">
            <View className="flex flex-row gap-5 py-4">
                <LetteredAvatar />
                <Text className="text-white mb-2">Hi, {name}</Text>

            </View>

            <View className="mt-10 w-full max-w-sm self-center gap-3">
                <View className="justify-center items-center">
                    <Text className="text-white font-bold  text-base">Profile</Text>
                </View>

                {/* Name */}
                <View className="mb-6">
                    <Text className="text-white mb-2">Name</Text>
                    <TextInput
                        editable={editName}
                        className="mt-2 w-full rounded-md bg-white/15 px-3 py-2 text-base text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity
                        className="mt-2"
                        onPress={() => setEditName(!editName)}
                    >
                        <View className="flex flex-row justify-end">
                            <Text className="text-indigo-400">
                                {editName ? "Cancel" : "Edit"}
                            </Text>
                            <Image source={icons.pen} className="size-6" />
                        </View>

                    </TouchableOpacity>
                </View>

                {/* Email */}
                <View className="mb-6">
                    <Text className="text-white mb-2">Email</Text>
                    <TextInput
                        editable={editEmail}
                        className="mt-2 w-full rounded-md bg-white/15 px-3 py-2 text-base text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Email"
                        placeholderTextColor="#888"
                    />
                    {editEmail && (
                        <TextInput
                            className="mt-2 w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline outline-1 outline-white/10"
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            placeholder="Current Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                        />
                    )}
                    <TouchableOpacity
                        className="mt-2"
                        onPress={() => setEditEmail(!editEmail)}
                    >
                        <View className="flex flex-row justify-end">
                            <Text className="text-indigo-400">
                                {editEmail ? "Cancel" : "Edit"}
                            </Text>
                            <Image source={icons.pen} className="size-6" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Password */}
                <View className="mb-6">
                    <Text className="text-white mb-2">Password</Text>
                    {editPassword ? (
                        <>
                            <TextInput
                                className="mt-2 w-full rounded-md bg-white/15 px-3 py-2 text-base text-white outline outline-1 outline-white/10"
                                value={oldPassword}
                                onChangeText={setOldPassword}
                                placeholder="Current Password"
                                placeholderTextColor="#888"
                                secureTextEntry
                            />
                            <TextInput
                                className="mt-2 w-full rounded-md bg-white/15 px-3 py-2 text-base text-white outline outline-1 outline-white/10"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="New Password"
                                placeholderTextColor="#888"
                                secureTextEntry
                            />
                        </>
                    ) : (
                        <Text className="text-gray-400 bg-white/15 mt-2 px-3 py-2 rounded-md">********</Text>
                    )}
                    <TouchableOpacity
                        className="mt-2"
                        onPress={() => setEditPassword(!editPassword)}
                    >
                        <View className="flex flex-row justify-end">
                            <Text className="text-indigo-400">
                                {editPassword ? "Cancel" : "Edit"}
                            </Text>
                            <Image source={icons.pen} className="size-6" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {error && (
                <Text className="text-red-500 text-center mb-4">{error}</Text>
            )}

            {(editEmail || editName || editPassword) && (
                <TouchableOpacity
                    className="w-full rounded-md bg-green-500 px-3 py-2 mb-4 gap-2"
                    onPress={handleSubmit}
                >
                    <Text className="text-center text-white font-bold">Save Changes</Text>
                </TouchableOpacity>
            )}
            <View className="justify-center items-center">
                <TouchableOpacity
                    className="w-full rounded-md bg-indigo-500 max-w-sm px-3 py-1 gap-3 items-end "
                    onPress={logout}
                >
                    <Text className="mx-auto text-white font-bold mt-1 mb-1 ">Log Out</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default Profile;
