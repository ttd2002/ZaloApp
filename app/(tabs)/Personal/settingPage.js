import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const SettingPage = () => {
    const navigation = useNavigation();
    const router = useRouter();
    return (
        <View>
            <View style={{ height: 50, width: '100%', backgroundColor: '#00abf6', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 10 }}>
                <TouchableOpacity style={{ width: '8%', height: 50, alignItems: 'center', justifyContent: 'center', borderRadius: 40 }}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <AntDesign name="arrowleft" size={26} color="black" />
                </TouchableOpacity>
                <Text style={{ width: '85%', fontSize: 19, fontWeight: '600', color: 'white' }}>Tran Van A</Text>
            </View>
            <View style={{ paddingHorizontal: 15, backgroundColor:'white' }}>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center' }}
                onPress={()=>{
                    router.navigate({
                        pathname: '/Personal/InformationPage',
                    })
                }}
                >
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Đổi ảnh đại diện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Đổi ảnh bìa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Cập nhật giới thiệu bản thân</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Ví của tôi</Text>
                </TouchableOpacity>
            </View>


            <View style={{ padding: 15, backgroundColor:'white', marginTop:8 }}>
                <Text style={{color:'blue'}}>Cài đặt</Text>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Mã QR của tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Quyền riêng tư</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Quản lý tài khoản</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 55, backgroundColor: 'white', justifyContent: 'center', marginTop: 2 }}>
                    <Text style={{ fontSize: 17, fontWeight: '450' }}>Cài đặt chung</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default SettingPage;