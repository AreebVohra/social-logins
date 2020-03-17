import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';

import GoogleScreen from '../screens/GoogleScreen';
import FacebookScreen from '../screens/FacebookScreen';
import TwitterScreen from '../screens/TwitterScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Google')
                            iconName = 'google';
                        else if (route.name === 'Facebook')
                            iconName = 'facebook-square';
                        else if (route.name === 'Twitter')
                            iconName = 'twitter'

                        return <AntDesign name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Google" component={GoogleScreen} />
                <Tab.Screen name="Facebook" component={FacebookScreen} />
                <Tab.Screen name="Twitter" component={TwitterScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;