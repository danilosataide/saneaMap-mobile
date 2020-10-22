import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthContext from './contexts/auth';

import Routes from './routes';

const SaneaMapApp: React.FC = () => {
    return (
        <NavigationContainer>
            <AuthContext.Provider value={{ signed: true }}>
                <Routes/>
            </AuthContext.Provider>
        </NavigationContainer>
    );
};

 export default SaneaMapApp;