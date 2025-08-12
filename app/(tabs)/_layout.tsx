import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Tabs} from "expo-router";

import { images } from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({ focused, icon, title }) => {
    return (
        <ImageBackground
            source = {images.highlight}
            className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
        >
            <Image source = {icon} tintColor="#151312" className="size-5"
            />
            <Text className="text-secondary text-base font-semibold">{title}</Text>
        </ImageBackground>
    )
}

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
            name="index"
            options={{
                headerShown: false,
                title: 'Home',
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        focused={focused}
                        icon={icons.home}
                        title="Home"
                    />
                )
            }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    headerShown: false,
                    title: 'Search',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    headerShown: false,
                    title: 'Saved',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    )
                }}
            />
        </Tabs>
    )
}
export default _Layout
