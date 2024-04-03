import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from '@mdi/react';
import { mdilMagnify } from '@mdi/light-js';
import { mdiAccountMultiple, mdiAccountPlus, mdiContacts } from '@mdi/js';
import Group from './group';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import Friend from './friend';

const index = () => {
  const Tab = createMaterialTopTabNavigator();
  const [selectedTab, setSelectedTab] = useState('Bạn bè');
  return (
    <View style={{ flex: 1 }}>
      {/* <Tab.Navigator
        initialRouteName="Bạn bè"
        tabBarOptions={{
          labelStyle: { fontSize: 15, fontWeight: '700' },
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
        tabBar={(props) => (
          <View style={{ flexDirection: 'row' }}>
            {props.state.routes.map((route, index) => (
              <TouchableOpacity
                key={index}
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10, height: 40, borderBottom: selectedTab === route.name ? '2px solid black' : '' }}
                onPress={() => {
                  setSelectedTab(route.name);
                  props.navigation.navigate(route.name);
                }}
              >
                <Text style={{ color: selectedTab === route.name ? 'blue' : 'gray', }}>{route.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      > */}
      <Tab.Navigator initialLayout={"Bạn bè"}>
        <Tab.Screen name="Bạn bè" component={Friend} />
        <Tab.Screen name="Nhóm" component={Group} />
      </Tab.Navigator>
    </View>
    // </View>
  )
}

export default index;


