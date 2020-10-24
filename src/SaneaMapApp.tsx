import 'react-native-gesture-handler';

import React, { useState, useEffect }  from 'react';
import { AppLoading } from 'expo';
import { ThemeProvider } from 'styled-components';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { AuthProvider } from './hooks/auth';
import AppProvider from './hooks';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import ThemeSwitcher from './components/ThemeSwitcher';

import light from './styles/themes/light';
import dark from './styles/themes/dark';

import Routes from './routes';

const SaneaMapApp: React.FC = () => {
    const [theme, setTheme] = useState(dark);

    const toggleTheme = (): void => {
      setTheme(theme.title === 'dark' ? light : dark)
    }
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Ubuntu_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />
    } 
    
    return (
        <NavigationContainer>
            <ThemeProvider theme={theme}>
                <StatusBar
                barStyle="light-content"
                backgroundColor="#312e38"
                translucent
                />
                <AppProvider>
                <View
                    style={{
                    flex: 1,
                    backgroundColor: '#312e38',
                    }}
                >
                    <StatusBar barStyle="dark-content" backgroundColor="white" translucent/>
                    <Routes />
                    <ThemeSwitcher toggleTheme={toggleTheme} />
                </View>
                </AppProvider>
            </ThemeProvider>
        </NavigationContainer>
    );
};

 export default SaneaMapApp;