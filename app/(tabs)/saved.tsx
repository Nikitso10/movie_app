import {View, Text, Image, ActivityIndicator, FlatList} from "react-native";
import React, {useEffect} from "react";

import {useUser} from "@/services/useUser";
import useFetch from "@/services/useFetch";
import {images} from "@/constants/images";
import SavedMovieCard from "@/components/SavedMovieCard";
import {getSavedMovies} from "@/services/appwrite";
import {router} from "expo-router";

const Saved = () => {
    const { user, authChecked } = useUser()

    useEffect(() => {
        if (authChecked && !user) {
            router.replace("../login");
        }

    }, [authChecked, user]);

    console.log('Saved user is: ', user)
    const query :string = user!.$id

    const {
            data: savedmovies = [],
            loading,
            error,
            refetch: loadMovies,
            reset,
        } = useFetch(() => getSavedMovies( query), Boolean(user!==null && authChecked) );


    const splitName = user?.email.split("@")[0]


    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                className="px-5"
                data={savedmovies as SavedMovie[]}
                keyExtractor={(item) => item.movie_id.toString()}
                renderItem={({ item }) => <SavedMovieCard {...item} />}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-16 items-center">
                            <Image source={images.movieflexlogo} className="w-16 h-16 mb-4" />
                        </View>

                        {loading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="my-3"
                            />
                        )}

                        {error && (
                            <Text className="text-red-500 px-5 my-3">
                                Error: {error.message}
                            </Text>
                        )}

                        {!loading &&
                            !error  &&
                            savedmovies?.length! > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Your saved movies,
                                    <Text className="text-accent"> {!user?.name ? splitName : user.name}</Text>
                                </Text>
                            )}
                    </>
                }

                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {user !== null
                                    ? "No saved movies found"
                                    : "Save a movie"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    )
}

export default Saved;