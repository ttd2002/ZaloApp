import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";

const { View, ImageBackground, Image, TouchableOpacity, Text } = require("react-native")

const InformationPage = () => {
    const navigation = useNavigation();
    const router = useRouter();
    return (
        <View>
            <View style={{ width: '100%', height: 200, justifyContent: 'flex-start' }}>
                <ImageBackground style={{ width: '100%', height: 200, flex: 1, justifyContent: 'flex-start' }} source={{ uri: 'https://tophinhanh.net/wp-content/uploads/2023/11/avatar-heo-cute-1.jpg' }}>
                    <TouchableOpacity style={{ width: '15%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <AntDesign name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 60, width: 60, marginTop: 85, borderWidth: 1, borderColor: 'white', borderRadius: 100, margin: 10 }} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMFC3U38jR45Fkualvk5jLmpyDt7AmijHDOA&s' }}></Image>
                        <Text style={{ fontSize: 23, fontWeight: '600', marginTop: 100, color: 'white' }}>Tran Van A</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={{ padding: 20, backgroundColor: 'white' }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>Thông tin cá nhân</Text>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center' }}>
                    <Text style={{ width: '30%' }}>Giới tính:</Text>
                    <Text>Nam</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 2 }}>
                    <Text style={{ width: '30%' }}>Ngày sinh:</Text>
                    <Text>12/08/2002</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', marginTop: 2 }}>
                    <Text style={{ width: '30%' }}>Điện thoại:</Text>
                    <Text>+84 707156556</Text>
                </View>
                <TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, height:40, backgroundColor:'grey', borderRadius:20 }}>
                        <FontAwesome name="pencil-square-o" size={18} color="black" />
                        <Text style={{ padding: 3, fontWeight:'500'}}>Chỉnh sửa</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}
export default InformationPage;