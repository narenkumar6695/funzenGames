import { Image, Text, TouchableOpacity, View } from "react-native";

interface JoinEarnCardProps {
  onPress: () => void;
}

export default function JoinEarnCard({ onPress }: JoinEarnCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="bg-primaryGreen p-2 rounded-md">
        <Text className="text-darkerGray text-lg font-semibold mb-2 text-center">
          Join & Earn
        </Text>
        <View className="flex-row items-center justify-center">
          <Image
            source={require("../../../assets/images/vector.png")}
            style={{ width: 18, height: 18, marginTop: 2 }}
            tintColor="#000"
            resizeMode="contain"
          />
          <Text className="text-darkerGray text-2xl font-bold ml-2">1,000</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
