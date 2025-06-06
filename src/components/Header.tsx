import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRegisterPopupOpen } from "../store/slices/userSlice";
import RegisterPopup from "./common/RegisterPopup";

export default function Header() {
  const dispatch = useDispatch();
  const { isRegisterPopupOpen } = useSelector((state: RootState) => state.user);

  const handleRegisterPress = () => {
    dispatch(setRegisterPopupOpen(true));
  };

  return (
    <View className="bg-darkGray px-4 py-2">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          />
          <Text className="text-white text-xl font-bold ml-2">
            Funzen Games
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleRegisterPress}
          className="bg-primaryGreen px-4 py-2 rounded-md"
        >
          <Text className="text-darkerGray font-semibold">Register & Earn</Text>
        </TouchableOpacity>
      </View>

      <RegisterPopup
        visible={isRegisterPopupOpen}
        onClose={() => dispatch(setRegisterPopupOpen(false))}
      />
    </View>
  );
}
