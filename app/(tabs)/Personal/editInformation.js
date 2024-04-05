import { AntDesign, Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useMemo, useState, useEffect } from "react";
import { RadioGroup } from "react-native-radio-buttons-group";
import DateTimePicker from "@react-native-community/datetimepicker"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode } from "base-64"
import axios from "axios";
import UploadModal from "./UploadModal";
global.atob = decode;
import * as ImagePicker from "expo-image-picker"
import { ipAddress } from "../../../config/env";
import CryptoJS from 'crypto-js';
import { getRandomBytes } from 'react-native-get-random-values';
const { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Pressable, Platform, TouchableWithoutFeedback } = require("react-native")

const EditInformation = () => {



    const today = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('vi-VN', options);
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const [showPicker, setShowPicker] = useState(false);

    const [userId, setUserId] = useState("");
    const [birthDate, setBirthDate] = useState(formattedDate);

    const [date, setDate] = useState(new Date());

    const [selectedId, setSelectedId] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");

    const radioButtons = useMemo(() => ([
        {
            id: '1',
            label: 'Nam',
            value: '1'
        },
        {
            id: '2',
            label: 'Nữ',
            value: '0'
        }
    ]), []);
    useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem("auth");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            const name = decodedToken.uName;
            const phone = decodedToken.phone;
            const avatar = decodedToken.uAvatar;
            const gender = decodedToken.uGender;
            const birthDate = decodedToken.uBirthDate;

            setUserId(userId);
            setName(name);
            setPhone(phone);
            setAvatar(avatar);
            setGender(gender);
            setBirthDate(birthDate !== "" ? birthDate : formattedDate);
            if (gender === "male") {
                setSelectedId("1");
            } else if (gender === "female") {
                setSelectedId("2");
            } else {
                setSelectedId("");
            }
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ({ type }, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (Platform.OS === "android") {
                toggleDatePicker();
                setBirthDate(currentDate.toLocaleDateString('vi-VN', options));
            }
        }
        else {
            toggleDatePicker();
        }
    };
    const editProfileHandle = async () => {
        try {
            const response = await axios.put(
                `http://${ipAddress}:3000/users/${userId}/editProfile`,
                {
                    name,
                    gender: selectedId === "1" ? "male" : "female",
                    birthDate
                }
            );
            const newToken = response.data.token;
            console.log(newToken);
            // Kiểm tra xem token mới có tồn tại không trước khi lưu vào AsyncStorage
            if (newToken) {
                await AsyncStorage.setItem("auth", newToken);
                console.log("Cập nhật thông tin thành công");
            } else {
                console.error("Token mới không hợp lệ");
            }
        } catch (error) {
            console.error("Lỗi khi chỉnh sửa thông tin", error);
        }
    };


    const handleButtonEdit = async () => {
        try {
            await editProfileHandle();
            router.replace("/Personal/InformationPage");
        } catch (error) {
            console.error("Error editing profile", error);
        }
    };


    const uploadImage = async (mode) => {
        try {
            let result = {};
            if (mode === "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            }
            if (!result.canceled) {
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log("Error uploading Image: " + error)
            setModalVisible(false)
        }
    }
    const saveImage = async (avatar) => {
        try {
            setAvatar(avatar)
            console.log("anh: ", avatar)
            editAvatarHandle()
            setModalVisible(false)
        } catch (error) {
            throw error
        }
    }
    const editAvatarHandle = async () => {
        try {
            const response = await axios.put(
                `http://${ipAddress}:3000/users/${userId}/editAvatar`,
                {
                    avatar: avatar,
                }
            );
            console.log("Profile updated successfully", response.data);
        } catch (error) {
            console.error("Error editing profile", error);
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ height: 'auto', width: '100%', backgroundColor: '#00abf6', flexDirection: 'row', alignItems: 'center', padding: 10, gap: 15 }}>
                <TouchableOpacity
                    onPress={() => {
                        router.replace('/Personal/InformationPage')
                    }}
                >
                    <Feather name="x" size={24} color="white" />
                </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 20, fontStyle: '600' }}>Thông tin cá nhân</Text>
            </View>
            <View style={{ height: '40%', width: '100%', backgroundColor: '#fff', padding: 15, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => { setModalVisible(true) }}
                    >
                        <Image style={{
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            resizeMode: "contain",
                            borderWidth: 1,
                            borderColor: 'white'

                        }} source={{ uri: avatar ? avatar : 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-15.jpg' }} />
                    </TouchableOpacity>

                    <View style={{ marginLeft: 15, width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', height: 35, flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'grey', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TextInput
                                value={name}
                                onChangeText={(txt) => setName(txt)}
                                style={{ width: '80%', height: 25, fontSize: 18 }}
                            />
                            <AntDesign name="edit" size={24} color="black" />
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChange}
                                maximumDate={new Date()}
                            />
                        )}
                        <View style={{ width: '100%', height: 35, flexDirection: 'row', alignItems: 'flex-end', borderBottomWidth: 0.5, borderColor: 'grey', justifyContent: 'space-between', marginBottom: 5 }}>
                            {!showPicker && (
                                <TouchableOpacity onPress={toggleDatePicker}>
                                    <TextInput
                                        value={birthDate}
                                        onChangeText={setBirthDate}
                                        style={{ width: '100%', height: 25, color: 'black', fontSize: 18 }}
                                        editable={false} // editable = false để ko kích hoạt bàn phím
                                    />
                                </TouchableOpacity>
                            )}
                            <AntDesign name="edit" size={24} color="black" />
                        </View>
                        <RadioGroup
                            radioButtons={radioButtons}
                            onPress={setSelectedId}
                            selectedId={selectedId}
                            layout='row'

                        />
                    </View>
                </View>
                <UploadModal
                    modalVisible={modalVisible}
                    onBackPress={() => setModalVisible(false)}
                    cancelable
                    onCameraPress={() => uploadImage()}
                    onGalleryPress={() => uploadImage("gallery")}
                ></UploadModal>
                <TouchableOpacity
                    onPress={handleButtonEdit}
                    style={{ height: 50, width: '95%', backgroundColor: '#00abf6', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 20 }}>
                    <Text style={{ color: 'white', fontSize: 20, fontStyle: 'normal' }}>Lưu</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff9',
        alignItems: 'center',
    },
})
export default EditInformation;