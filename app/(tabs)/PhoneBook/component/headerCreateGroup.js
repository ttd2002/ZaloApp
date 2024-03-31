import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { mdiAccountGroupOutline, mdiArrowLeft } from '@mdi/js';
import { useRouter } from 'expo-router';
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack } from "expo-router";

const HeaderCreateGroup = () => {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <View style={{height:'auto', width:'100%'}}>
            <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#00abf6', padding: 20 }}>
                <TouchableOpacity style={{ width: '8%', height: 55, alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}
                    onPress={() => {
                        // router.navigate('(tabs)/PhoneBook');
                        navigation.goBack();
                    }}>
                    <AntDesign name="arrowleft" size={24} color="black" />

                </TouchableOpacity>
                <View style={{ height: 'auto', width: '85%' }}>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>Nhóm mới</Text>
                    <Text>Đã chọn: 0</Text>
                </View>
            </View>

            <View style={{ width: '100%', height: 75, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', padding: 30 }}>
                <Entypo name="camera" size={32} height={35} color="black" />
                <View style={{ height: 'auto', width: '80%' }}>
                    <TextInput style={styles.HideTextInput} placeholder='Đặt tên nhóm'></TextInput>
                </View>
            </View>

            <View style={{ width: '100%', height: 45, alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }}>
                <View style={{ borderRadius: 10, backgroundColor: '#F1EFEF', width: '90%', height: 35, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                    <Ionicons name="search" size={24} height={22} color="black" />
                    <View style={{ height: 15, width: '90%' }}>
                        <TextInput style={styles.HideTextInput} placeholder='Tìm tên hoặc số điện thoại'></TextInput>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default HeaderCreateGroup

const styles = StyleSheet.create({
    HideTextInput: {
        width: '100%',
        height: 20,
        outlineColor: 'transparent',
        fontSize: 18,
        color: 'grey',
    }, checkbox: {
        alignSelf: 'center',
    }
});