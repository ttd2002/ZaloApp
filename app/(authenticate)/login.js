import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ipAddress } from '../../config/env'
const login = () => {
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = () => {
        const user = {
          phone: phone,
          password: password,
        };
        axios.post(`http://${ipAddress}:3000/login`,user).then((response) => {

        //axios.post("http://10.0.2.2:3000/login",user).then((response) => {
            //console.log(response);
            const token = response.data.token;
            AsyncStorage.setItem("auth",token);
            router.replace("/(tabs)/Message")
        })
      };
    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                value={phone}
                onChangeText={(txt) => setPhone(txt)}
                placeholder='Số điện thoại'
                style={{ width: '100%', height: 50, padding: 15, borderBottomWidth: 1, borderBottomColor: 'grey' }}
            />
            <TextInput
                value={password}
                onChangeText={(txt) => setPassword(txt)}
                placeholder='Mật khẩu'
                secureTextEntry
                style={{ width: '100%', height: 50, padding: 15, borderBottomWidth: 1, borderBottomColor: 'grey' }}
            />
            <Pressable
                onPress={handleLogin}
                style={{ height: 50, width: 150, backgroundColor: '#00abf6', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 20 }}>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'normal' }}>Đăng nhập</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})