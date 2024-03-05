import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'

const register = () => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const handleRegister = () => {
        const user = {
            name: name,
            phone: phone,
            password: password,
        };
        axios
            .post("http://localhost:3000/register", user)
            .then((response) => {
                console.log(response);
                alert("success");
                setName("");
                setPhone("");
                setPassword("");
            })
            .catch((error) => {
                alert("fail" );
                console.log("registration failed", error);
            });
    };
    return (

        <SafeAreaView style={styles.container}>
            <TextInput
                value={name}
                onChangeText={(txt) => setName(txt)}
                placeholder='Tên'
                style={{ width: '100%', height: 50, padding: 15, borderBottomWidth: 1, borderBottomColor: 'grey' }}
            />
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
                onPress={handleRegister}
                style={{ marginTop: 20, height: 50, width: 150, borderWidth: 1, borderColor: '#00abf6', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
                <Text style={{ color: 'black', fontSize: 20, fontStyle: 'normal' }}>Đăng ký</Text>
            </Pressable>
        </SafeAreaView>
    )
}

export default register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
})