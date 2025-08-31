import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Image,
    FlatList, TouchableOpacity,
} from "react-native";
import {useRouter} from "expo-router";

import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import {useUser} from "@/services/useUser";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import React, {useEffect, useState} from "react";



const Index = () => {
    const router = useRouter();
    const { user } = useUser();


    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() => fetchMovies({ query: "" }));


    function SelectLink ()  {
        const router = useRouter();
        const { user, authChecked } = useUser();
        const [ selected, setSelected ] = useState<"../login" | "../profile">("../login" );
        const [ linkName, setLinkName ] = useState("Login");

        useEffect(() => {

            if (!authChecked && user == null) {
                setSelected( "../login")
                setLinkName("Login")
            }
            if (authChecked && user !== null) {
                setSelected( "../profile")
                setLinkName("Profile")
            } else {
                setSelected( "../login")
                setLinkName("Login")
            }

        }, [user, authChecked])

        return (
            <>
                <TouchableOpacity
                    onPress={() => router.push(selected)} >
                    <Text className="mx-auto text-white font-bold mt-5 mb-3">{linkName}</Text>
                </TouchableOpacity>
            </>
        )
    }


    console.log('Index user is: ', user)
    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full justify-items-center grow z-0"
                resizeMode="cover"
            />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >

                <Image source={images.movieflexlogo} className="w-16 h-16 mt-16 mb-5 mx-auto" />
                <View className="flex flex-row justify-end lg:pl-10 lg:mr-10">
                    <SelectLink />
                </View>

                {/*<TouchableOpacity*/}
                {/*    onPress={() => router.push("../login")} >*/}
                {/*    <Text className="mx-auto text-white font-bold mt-5 mb-3">Go to Login</Text>*/}
                {/*</TouchableOpacity>*/}

                {moviesLoading || trendingLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : moviesError || trendingError ? (
                    <Text>Error: {moviesError?.message || trendingError?.message}</Text>
                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar
                            // onPress={() => {
                            //     router.push("/(tabs)/search");
                            // }}
                            onFocus={() => {
                                router.push("../search");}}
                            // onSubmitEditing={(e) => {
                            //     const query = e.nativeEvent.text; // <- get entered value
                            //     router.push({
                            //         pathname: "/(tabs)/search",
                            //         params: {q: query},
                            //     });
                            //}}
                            placeholder="Search for a movie"
                        />

                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mb-3">
                                    Trending Movies
                                </Text>
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    className="mb-4 mt-3"
                                    data={trendingMovies}
                                    contentContainerStyle={{
                                        gap: 26,
                                    }}
                                    renderItem={({ item, index }) => (
                                        <TrendingCard movie={item} index={index} />
                                    )}
                                    keyExtractor={(item) => item.movie_id.toString()}
                                    ItemSeparatorComponent={() => <View className="w-4" />}
                                />
                            </View>
                        )}

                        <>
                            <Text className="text-lg text-white font-bold mt-5 mb-3">
                                Latest Movies
                            </Text>

                            <FlatList
                                data={movies}
                                renderItem={({ item }) => <MovieCard {...item} />}
                                keyExtractor={(item) => item.id.toString()}
                                numColumns={3}
                                columnWrapperStyle={{
                                    justifyContent: "center",
                                    gap: 20,
                                    paddingRight: 5,
                                    paddingLeft: 5,
                                    marginBottom: 10,
                                }}
                                className="mt-2 pb-32 "
                                scrollEnabled={false}
                            />
                        </>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Index;
