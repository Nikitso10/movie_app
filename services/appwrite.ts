import {Account, Client, Databases, ID, Query, Avatars } from "react-native-appwrite";
// Import type models for Appwrite
//import { type Models } from 'appwrite';
// define database variables
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const SAVED_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID!;
// Appwrite client
export const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
// export a new instance account
export const account = new Account(client);
// Avatars
const avatars = new Avatars(client);
// database instance
const database = new Databases(client);

// track the searches made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
    // check if a record of that search has already been stored
    // if a document is found increment the searchCount field
    // if no document is found create a new document in Appwrite database
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", query),
        ]);

        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1,
                }
            );
        } else {
            // create new document to store searchTerm
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                title: movie.title,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
        throw error;
    }
};
// function that queries for top user searches
export const getTrendingMovies = async (): Promise<
    TrendingMovie[] | undefined
> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(9),
            Query.orderDesc("count"),
        ]);

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const updateSavedMovie = async (userid: string, savemovie: SavedMovie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
            Query.and([
                Query.equal("movie_id", savemovie.movie_id),
                Query.equal("user_id", userid)])
        ]);
        console.log("results documentId is ", result);
        console.log("DB:", DATABASE_ID);
        console.log("Saved Collection:", SAVED_COLLECTION_ID);

        if (result.documents.length === 0) {
            console.log("No documents found to delete.");
            return;
        }

        // if already saved, delete -> Unlike
        if (result.documents.length > 0) {
            const doc = result.documents[0];
            const docId = doc.$id;
            if (!docId) {
                console.error("Document has no $id:", doc);
                return;
            }

            console.log("delete args:", DATABASE_ID, SAVED_COLLECTION_ID, docId);
            console.log("delete args:", DATABASE_ID, SAVED_COLLECTION_ID, result.documents[0]?.$id);

            await database.deleteDocument(
                '<DATABASE_ID>', // databaseId
                '<SAVED_COLLECTION_ID>', // collectionId
                docId // documentId
            );

        }
         else {
            // create new document to save movie -> like
            await database.createDocument(DATABASE_ID, SAVED_COLLECTION_ID, ID.unique(), {
                movie_id: savemovie.movie_id,
                title: savemovie.title,
                user_id: userid,
                poster_url: `https://image.tmdb.org/t/p/w500${savemovie.poster_path}`,
                });
            }
        console.log("create document Id is ", ID);
        } catch (error) {
            console.error("Error updating saved movie:", error);
            throw error;
        }
    };

    export const checkLikedMovie = async (userId: string, movieId: string) => {
        try {
            const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
                Query.equal('movie_id', movieId),
                Query.equal('user_id', userId),
            ]);
            return result.documents.length > 0;
        } catch (error) {
            console.error('Error checking liked status:', error);
            return false;
        }
    };

    export const getSavedMovies = async (query: string): Promise<
        SavedMovie[]
    > => {
        try {
            const result = await database.listDocuments(DATABASE_ID, SAVED_COLLECTION_ID, [
                Query.equal('user_id', query),
            ]);

            return result.documents as unknown as SavedMovie[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    export const updateEmail = async ( email: string, password: string) => {
        try {
            const result = await account.updateEmail(
                email, // email
                password // password
            );
            return result;
        } catch (error) {
            console.error("Error updating email:", error);
            throw error;
        }
    };

    export const updatePassword = async ( newpass: string, oldpass?: string) => {
        try {
            const result = await account.updatePassword(
                newpass, // password
                oldpass // oldPassword (optional)
            );
            return result;
        } catch (error) {
            console.error("Error updating password:", error);
            throw error;
        }
    };

    export const updateName = async ( newname: string) => {
        try {
            const result = await account.updateName(
                newname // name
            );
            return result;
        } catch (error) {
            console.error("Error updating name:", error);
            throw error;
        }
    };
