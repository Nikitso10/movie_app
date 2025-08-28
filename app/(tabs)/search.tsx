import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { q } = useLocalSearchParams<{ q: string }>();

    if (q) {
        setSearchQuery(q);
    }

    const {
        data: movies = [],
        loading,
        error,
        refetch: loadMovies,
        reset,
    } = useFetch(() => fetchMovies({ query: searchQuery }), false);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    // Debounced search effect
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Call updateSearchCount only if there are results
    useEffect(() => {
        if (movies?.length! > 0 && movies?.[0]) {

                updateSearchCount(searchQuery, movies[0]);
            }
        }, [movies]);



    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />

            <FlatList
                className="px-5"
                data={movies as Movie[]}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MovieCard {...item} />}
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

                        <View className="my-5">
                            <SearchBar
                                placeholder={q!}
                                value={searchQuery}
                                onChangeText={(text: string) =>setSearchQuery(text)}
                            />
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
                            !error &&
                            searchQuery.trim() &&
                            movies?.length! > 0 && (
                                <Text className="text-xl text-white font-bold">
                                    Search Results for{" "}
                                    <Text className="text-accent">{searchQuery}</Text>
                                </Text>
                            )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim()
                                    ? "No movies found"
                                    : "Search for a movie"}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default Search;