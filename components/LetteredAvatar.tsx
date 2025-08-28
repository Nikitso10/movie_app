import React, {useEffect, useState} from "react";
import {View, Text} from "react-native";
import {useUser} from "@/services/useUser";


export const LetteredAvatar = () => {
    const {user, authChecked} = useUser();
    const [username, setUsername] = useState<string>("");
    const [bgColor, setBgColor] = useState<string>("#ccc");

    useEffect(() => {
        if (user !== null && authChecked) {
            let initial = "";
            if (!user.name) {
                initial = user.email.split('@')[0][0];
            } else {
                initial = user.name.split(' ')[0][0];
            }
            setUsername(initial.toUpperCase());
            setBgColor(generateBackground(initial));
        }
    }, [user, authChecked]);

    function generateBackground(username: string) {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        // name.charCodeAt() return an int between 0 and 65535
        // left shift (<<)  operator moves to left by number of specified
        // bites after <<. The whole for loop will create a color hash
        // based on username length
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        return color;
    }

    return (
        <View
            style={{ backgroundColor: bgColor }}
            className="flex h-14 w-14 rounded-full items-center justify-center border-2 border-gray-700"
        >
            <Text className="font-bold text-3xl uppercase align-text-bottom text-white ">
                {username}
            </Text>
        </View>
    );
};

