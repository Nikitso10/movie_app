import {View, Image, TextInput} from 'react-native'
import React from 'react';
import { icons } from "@/constants/icons";

interface Props {
    placeholder: string;
    onPress?: () => void;
    value?: string;
    onChangeText?: (text: string) => void;
    onSubmitEditing?: (e: any) => void
    onFocus?: () => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText, onFocus, onSubmitEditing } : Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
                tintColor="#AB8BFF"
            />
            <TextInput
                onFocus={onFocus}
                //onSubmitEditing={onPress}
                onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                className="flex-1 ml-2 text-white"
                placeholderTextColor="#A8B5DB"
            />
        </View>
    )
}
export default SearchBar
