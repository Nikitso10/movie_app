import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

const SavedMovieCard= ({
                       movie_id,
                       poster_url,
                       title,
                       user_id,
                   }: SavedMovie) => {


    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_url
                            ? `https://image.tmdb.org/t/p/w500${poster_url}`
                            : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {title}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default SavedMovieCard;