import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
import Icon from '@mdi/react';
import { mdiAccountMultiple, mdiContacts } from '@mdi/js';
import { AntDesign, Feather, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
const Friend = () => {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  userId = "65f6fb27160e6b248a03dd1a"
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`http://192.168.1.165:3000/phonebook/${userId}/friends`); 
        setFriends(response.data.friends); 
        
      } catch (error) {
        console.error('Error fetching friends:', error);
      }

    };

    fetchFriends(); 
  }, [userId]);
  console.log(friends);
  return (
    <View style={styles.container}>
      <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', padding: 15 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'space-between', width: '100%', height: 60, alignItems: 'center', gap: 18 }}
          onPress={() => {
            router.navigate({
              pathname: '/PhoneBook/friendRequest',
            })
          }}>
          <FontAwesome5 name="user-friends" size={24} color="black" />
          <Text style={{ fontWeight: '700', fontSize: 15 }}>Lời mời kết bạn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'space-between', width: '100%', height: 60, alignItems: 'center', gap: 18 }}
          onPress={() => {
            router.navigate({
              pathname: '/PhoneBook/phoneBook',
            })
          }}
        >
          <AntDesign name="contacts" size={28} color="black" />
          <View style={{ width: '70%' }}>
            <Text style={{ fontWeight: '700', fontSize: 15 }}>Danh bạ máy</Text>
            <Text style={{ fontWeight: '400', fontSize: 13 }}>Các liên hệ có dùng Zalo</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={{ flexDirection: 'row', alignContent: 'space-between', width: '100%', height: 60, alignItems: 'center', gap: 18 }}>
          <Image style={{ width: 30, height: 30 }} source={require('../../../assets/icon.png')} />
          <View style={{ width: '100%' }}>
            <Text style={{ fontWeight: '700', fontSize: 15 }}>Lịch sinh nhật</Text>
            <Text style={{ fontWeight: '400', fontSize: 13 }}>Theo dõi sinh nhật của bạn bè</Text>
          </View>
        </View> */}
      </View>




      <View style={{ flexDirection: 'row', width: '100%', height: 54, marginTop: 8, backgroundColor: 'white', padding: 13, gap: 15 }}>
        <TouchableOpacity style={{ height: 30, width: 80, borderRadius: 20, border: '1px solid grey', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {

          }}>
          <Text>Tất cả </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ height: 30, width: 110, borderRadius: 20, border: '1px solid grey', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => {

          }}>
          <Text>Mới truy cập </Text>
        </TouchableOpacity>
      </View>



      <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', padding: 15, marginTop: 2 }}>
        <Text>A</Text>
        <View style={{ flexDirection: 'row', alignContent: 'space-between', width: '100%', height: 60, alignItems: 'center', gap: 18 }}>
          <Image style={{ width: 45, height: 45, borderRadius: 60, border: 'solid 2px black' }} source={require('../../../assets/icon.png')} />
          <View style={{ width: '58%' }}>
            <Text style={{ fontWeight: '450', fontSize: 18 }}>Nguyen Van A</Text>
          </View>
          <Ionicons name="call-outline" size={26} color="black" />
          <Feather name="video" size={24} color="black" />


        </View>
      </View>

    </View>
  )
}



export default Friend

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7C8CC',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  HideTextInput: {
    outlineColor: 'transparent',
    fontSize: 18,
    color: 'white',
    // position: 'absolute',
  },
})