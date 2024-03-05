import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import {jwtDecode} from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const index = () => {
  const [userId,setUserId] = useState("");
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");

  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("auth");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        const name = decodedToken.uName;
        const phone = decodedToken.phone;

        setUserId(userId)
        setName(name)
        setPhone(phone)

    }

    fetchUser();
  },[])
  return (
    <View>
      <Text>Personal</Text>
      <Text>id: {userId}</Text>
      <Text>name: {name}</Text>
      <Text>phone: {phone}</Text>
      <Pressable 
      onPress={()=>{router.replace('(authenticate)/home')}}
      style={{backgroundColor: 'red'}}>
        <Text>log out</Text>
      </Pressable>

    </View>
  )
}

export default index

const styles = StyleSheet.create({})