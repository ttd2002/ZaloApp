import { AntDesign, FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Image, ImageBackground, Pressable, Text, TouchableOpacity, View } from "react-native";

const ProfilePage = () => {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <View style={{ width: '100%', height: 350, justifyContent: 'flex-start' }}>
                <ImageBackground style={{ width: '100%', height: 200, flex: 1, justifyContent: 'flex-start', alignItems: 'center' }} source={{ uri: 'https://tophinhanh.net/wp-content/uploads/2023/11/avatar-heo-cute-1.jpg' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ width: '8%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <AntDesign name="arrowleft" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: '78%', marginTop: 10 }}
                            onPress={() => {
                                router.navigate({
                                    pathname: '/Personal/settingPage',
                                })
                            }}>
                            <MaterialIcons name="more-horiz" size={30} color="white" />
                        </TouchableOpacity>
                    </View>


                    <TouchableOpacity>
                        <Image style={{ height: 130, width: 130, marginTop: 90, borderWidth: 5, borderColor: 'white', borderRadius: 100 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMFC3U38jR45Fkualvk5jLmpyDt7AmijHDOA&s' }}></Image>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 23, fontWeight: '600', marginTop: 3 }}>Tran Van A</Text>
                    <TouchableOpacity>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                            <FontAwesome name="pencil-square-o" size={18} color="blue" />
                            <Text style={{ padding: 3, color: 'blue' }}>Cập nhật giới thiệu bản thân</Text>
                        </View>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <Pressable style={{ backgroundColor: 'white', height: 55, margin: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 15, borderRadius: 10 }}>
                <Text style={{ color: 'grey', fontSize: 16, width: '85%', borderRightWidth: 1, borderRightColor: 'grey' }}>Bạn đang nghĩ gì?</Text>
                <FontAwesome6 name="image" size={24} color="green" />
            </Pressable>
        </View>
    )
}
export default ProfilePage;