import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TextInput, Pressable } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { io } from "socket.io-client"
import axios from 'axios';
import { ipAddress } from '../../../config/env';
const chatRoom = () => {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const params = useLocalSearchParams();
    const router = useRouter();
    const socket = io("http://192.168.56.1:8000");
    socket.on("connect", () => {
        console.log("Connected to the Socket server")
    })
    socket.emit("connected", params?.senderId)
    socket.on("receiveMessage", (newMessage) => {
        console.log("reiceiver message")
        console.log("new Message", newMessage)
        setMessages((prevMessages) => [...prevMessages, newMessage])
    })
    const handleMessaged = async () => {
        try {
            await axios.post(`http://${ipAddress}:3000/add-messaged`, {

                //await axios.post("http://10.0.2.2:3000/add-messaged", {
                currentUserId: params?.senderId,
                receiverId: params?.receiverId,
            });
        } catch (error) {
            console.log("error", error);
        }
    };
    const sendMessage = async (senderId, receiverId) => {
        socket.emit("sendMessage", { senderId, receiverId, message });
        setMessage("");
        setTimeout(() => {
            fetchMessages();
            console.log(messages)
            if (messages.length === 0) {
                handleMessaged()
            }
        }, 200)


    }
    const fetchMessages = async () => {
        try {
            const senderId = params?.senderId;
            const receiverId = params?.receiverId;
            const response = await axios.get(`http://${ipAddress}:3000/messages`, {
                //const response = await axios.get("http://10.0.2.2:3000/messages", {
                params: { senderId, receiverId },
            });

            setMessages(response.data);

        } catch (error) {
            console.log("Error fetching the messages", error);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, []);
    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("vn-VN", options);
    };
    
    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#e2e8f1" }}>
            <View style={{ backgroundColor: '#00abf6', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", alignItems: "center", gap: 10, height: 50 }}>
                <Pressable onPress={()=>{router.replace('/Message')}}>
                    <Ionicons name="chevron-back" size={24} color="white" />
                </Pressable>
                <Text style={{fontSize: 20, color: 'white'}}>{params?.uName}</Text>

                
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
                {messages?.map((item, index) => (
                    <Pressable
                        style={[
                            item?.senderId === params?.senderId
                                ? {
                                    alignSelf: "flex-end",
                                    backgroundColor: "#cff0fe",
                                    padding: 8,
                                    maxWidth: "60%",
                                    borderRadius: 7,
                                    margin: 10,
                                }
                                : {
                                    alignSelf: "flex-start",
                                    backgroundColor: "white",
                                    padding: 8,
                                    margin: 10,
                                    borderRadius: 7,
                                    maxWidth: "60%",
                                },
                        ]}
                    >
                        <Text style={{ fontSize: 18, textAlign: "left", fontWeight: "500" }}>
                            {item?.message}
                        </Text>
                        <Text style={{ fontSize: 12, textAlign: "right", marginTop: 5 }}>{formatTime(item?.timestamp)}</Text>
                    </Pressable>
                ))}

            </ScrollView>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderTopColor: "#dddddd",
                    marginBottom: 1,
                }}
            >
                <Entypo
                    style={{ marginRight: 7 }}
                    name="emoji-happy"
                    size={24}
                    color="gray"
                />
                <TextInput
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    style={{
                        flex: 1,
                        height: 40,
                        borderWidth: 1,
                        borderColor: "#dddddd",
                        borderRadius: 20,
                        paddingHorizontal: 10,
                    }}
                    placeholder="Type your message..."
                />

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                        marginHorizontal: 8,
                    }}
                >
                    <Entypo name="camera" size={24} color="gray" />

                    <Feather name="mic" size={24} color="gray" />
                </View>

                <Pressable
                    onPress={() => {
                        sendMessage(params?.senderId, params?.receiverId);

                    }}
                    style={{
                        backgroundColor: "#007bff",
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 20,
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white" }}>Send</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default chatRoom

const styles = StyleSheet.create({})