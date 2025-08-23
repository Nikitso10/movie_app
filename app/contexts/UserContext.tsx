import {createContext, ReactNode, useEffect, useState} from "react"
import {account} from "@/services/appwrite";
import {ID, Models} from "react-native-appwrite";


// Define what the context provides
interface UserContextType {
    user: Models.User<Models.Preferences> | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    authChecked: boolean;
}

// Create context with proper type
export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children } : { children: ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [authChecked, setAuthChecked] = useState(false)

    async function login(email: string, password: string) {
        try {
            await account.createEmailPasswordSession(email, password)
            const response = await account.get()
            setUser(response)

        } catch (error) {
            throw Error((error as Error).message)
        }
    }

    async function signUp(email: string, password: string) {
        try {
            await account.create(ID.unique(), email, password)
            await login(email, password)
        } catch (error) {
            throw Error((error as Error).message)
        }
    }

    async function logout() {
        await account.deleteSession("current")
        setUser(null)
    }

    async function getInitialUserValue() {
        try {
            const response = await account.get()
            setUser(response)
        } catch (error) {
            setUser(null)
        } finally {
            setAuthChecked(true)
        }
    }

    useEffect(() => {
        getInitialUserValue()
    }, [])



// Wrap the UserProvider component around the root layout stack
    return (
        <UserContext.Provider value={{
            user, login, logout, signUp, authChecked,
        }}>
            {children}
        </UserContext.Provider>
    );

}

export default UserContext;