import React, { createContext, useState, useEffect, useContext } from 'react';
// import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth'; 
import api from '../services/api';

interface User {
    name: string;
    email: string;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn(): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStoragedData() {
            const storagedUser = await AsyncStorage.getItem('@RNSaneaMap:user');
            const storagedToken = await AsyncStorage.getItem('@RNSaneaMap:token');

            await new Promise(resolve => setTimeout(resolve, 2000));

            if(storagedUser && storagedToken) {
                api.defaults.headers.Authorization = `Bearer ${storagedToken}`

                setUser(JSON.parse(storagedUser));
            } 
            setLoading(false);
        }

        loadStoragedData();
    }, []);

    async function signIn() {
        const response = await auth.signIn();
      
        setUser(response.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.token}`

        await AsyncStorage.setItem('@RNSaneaMap:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@RNSaneaMap:token', response.token);
    }

    async function signOut() {
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }

    // if(loading){
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //             <ActivityIndicator size="large" color="#656" />
    //         </View>
    //     );
    // }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
                {children}
        </AuthContext.Provider>
    );
};

// export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);
    
    return context;
}