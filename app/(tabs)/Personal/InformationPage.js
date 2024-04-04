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

const { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet, Modal, TextInput, Pressable, Platform } = require("react-native")

const InformationPage = () => {
    const today = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('vi-VN', options);
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [showPicker, setShowPicker] = useState(false);

    const [userId, setUserId] = useState("");
    const [birthDate, setBirthDate] = useState(formattedDate);

    const [date, setDate] = useState("");

    const [selectedId, setSelectedId] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [avatar, setAvatar] = useState("");

    const [rerenderFlag, setRerenderFlag] = useState(false);

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

    const uploadImage = async (mode)=>{
        try {
            let result = {};
            if(mode === "gallery"){
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1,
                })
            }else{
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1,1],
                    quality: 1,
                });
            }   
            if(!result.canceled){
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log("Error uploading Image: " + error)
            setModalVisible(false)
        }
    }
    const saveImage = async (avatar) =>{
        try {
            setAvatar(avatar)
            console.log("anh: ", avatar)
            editAvatarHandle()
            setModalVisible(false)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchUser();
    }, [rerenderFlag]);
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
                `http://localhost:3000/users/${userId}/editProfile`,
                {
                    name,
                    gender: selectedId === "1" ? "male" : "female",
                    birthDate
                }
            );
            console.log("Profile updated successfully", response.data);
        } catch (error) {
            console.error("Error editing profile", error);
        }
    };
    const editAvatarHandle = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/users/${userId}/editAvatar`,
                {
                    avatar: avatar,
                }
            );
            console.log("Profile updated successfully", response.data);
        } catch (error) {
            console.error("Error editing profile", error);
        }
    };
    const handleButtonEdit = async () => {
        try {
            await editProfileHandle();
            setRerenderFlag(true);
            setRerenderFlag(false)
            selectedId === "1" ? setGender("male") : setGender("female")
            setVisible(false)

        } catch (error) {
            console.error("Error editing profile", error);
        }
    };


    return (

        <View>
            <View style={{ width: '100%', height: 200, justifyContent: 'flex-start' }}>
                <ImageBackground style={{ width: '100%', height: 200, flex: 1, justifyContent: 'flex-start' }} source={{ uri: 'https://tophinhanh.net/wp-content/uploads/2023/11/avatar-heo-cute-1.jpg' }}>
                    <TouchableOpacity style={{ width: '15%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}
                        onPress={() => { router.replace('/Personal/settingPage') }}>
                        <AntDesign name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { setModalVisible(true) }}
                        >
                            <Image style={{ height: 60, width: 60, marginTop: 85, borderWidth: 1, borderColor: 'white', borderRadius: 100, margin: 10 }} 
                            source={{ uri: avatar? avatar :  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMFC3U38jR45Fkualvk5jLmpyDt7AmijHDOA&s' }}></Image>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 23, fontWeight: '600', marginTop: 100, color: 'white' }}>{name}</Text>
                    </View>

                </ImageBackground>
            </View>
            <UploadModal
                modalVisible={modalVisible}
                onBackPress={() => setModalVisible(false)}
                cancelable
                onCameraPress={()=> uploadImage()}
                onGalleryPress={()=> uploadImage("gallery")}

            >

            </UploadModal>
            <View style={{ padding: 20, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Thông tin cá nhân</Text>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                    <Text style={{ width: '30%' }}>Giới tính:</Text>
                    <Text>{gender === "male" ? "Nam" : "Nữ"}</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 2 }}>
                    <Text style={{ width: '30%' }}>Ngày sinh:</Text>
                    <Text>{birthDate}</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 2 }}>
                    <Text style={{ width: '30%' }}>Điện thoại:</Text>
                    <Text>+84 {phone}</Text>
                </View>

                <Modal
                    visible={visible}
                    animationType="slide"
                    onRequestClose={() => setVisible(false)}
                >
                    <View style={styles.container}>
                        <View style={{ height: 'auto', width: '100%', backgroundColor: '#00abf6', flexDirection: 'row', alignItems: 'center', padding: 10, gap: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setVisible(false)
                                }}
                            >
                                <Feather name="x" size={24} color="white" />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 20, fontStyle: 'normal' }}>Thông tin cá nhân</Text>
                        </View>
                        <View style={{ height: '40%', width: '100%', backgroundColor: '#fff', padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 60,
                                    resizeMode: "contain"
                                }} source={{ uri: 'data:image/jpeg;base64,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' }} />
                                <View style={{ marginLeft: 15, width: '70%', justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                        <TextInput
                                            value={name}
                                            onChangeText={(txt) => setName(txt)}
                                            style={{ width: '100%', height: 20, padding: 15 }}
                                        />
                                        <AntDesign name="edit" size={24} color="black" />
                                    </View>
                                    {showPicker && (
                                        <DateTimePicker
                                            mode="date"
                                            display="spinner"
                                            value={date}
                                            onChange={onChange}
                                        />
                                    )}
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-end', borderBottomWidth: 0.5, borderColor: 'grey' }}>
                                        {!showPicker && (
                                            <Pressable
                                                onPress={toggleDatePicker}
                                            >
                                                <TextInput
                                                    value={birthDate}
                                                    onChangeText={setBirthDate}
                                                    style={{ width: '100%', height: 20, padding: 15 }}
                                                />
                                            </Pressable>
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

                            <TouchableOpacity
                                onPress={handleButtonEdit}
                                style={{ height: 50, width: '95%', backgroundColor: '#00abf6', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: 20 }}>
                                <Text style={{ color: 'white', fontSize: 20, fontStyle: 'normal' }}>Lưu</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>
                <View>
                    <TouchableOpacity
                        onPress={() => { setVisible(true) }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height: 40, backgroundColor: 'grey', borderRadius: 20 }}>
                            <FontAwesome name="pencil-square-o" size={18} color="black" />
                            <Text style={{ padding: 3, fontWeight: '500' }}>Chỉnh sửa</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
export default InformationPage;