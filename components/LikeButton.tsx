import React, {useEffect, useState} from 'react';
import { TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import {checkLikedMovie, updateSavedMovie} from "@/services/appwrite";
import {icons} from "@/constants/icons";
import ShowToast from "@/components/ShowToast";


interface Props {
    onPress?: () => void;
    query: string;
    movie: SavedMovie;
    }

const LikeButton = ({ onPress, query, movie } : Props)=> {
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const fetchLikedStatus = async () => {
            try {
                const isLiked = await checkLikedMovie(query, movie.movie_id);
                setLiked(isLiked);
            } catch (error) {
                console.error('Error fetching liked status:', error);
            } finally {
                setChecking(false);
            }
        };
        fetchLikedStatus();
    }, [query, movie.movie_id]);


    const toggleLike = async () => {
        const newLiked = !liked;
        setLiked(newLiked); // Optimistic UI
        setLoading(true);

        try {
            await updateSavedMovie(query, movie);
            if (onPress) onPress();
        } catch (error) {
            console.error('Failed to save like status:', error);
            setLiked(!newLiked); // Revert
        } finally {
            setLoading(false);
        }
    };

    if (checking) {
        // Show loading state while checking DB
        return (
            <ActivityIndicator color="#ff4444" className="absolute right-5" />
        );
    }

    return (
        <TouchableOpacity
            // onPress={() => {
            //     toggleLike();
            //     ShowToast("Saved movie ", movie?.title); }}
            onPress={toggleLike}
            disabled={loading} className="absolute right-5">

            {loading ? (
                <ActivityIndicator color="#ff4444" />
            ) : (
                <Image
                    source={liked ? icons.heart : icons.heartbt}
                    className=" pr-5 mr-20 w-6 h-6 ml-1"
                    resizeMode="stretch"
                />
            )}

        </TouchableOpacity>
    );
}


export default LikeButton;
