import { Text, View } from "react-native";

export default function FooterAd() {
  return (
    <View className="w-full md:px-2 md:relative fixed bottom-0 left-0 right-0 bg-black z-50 md:pb-20 md:mb-2">
      <View className="bg-gray-300 h-[120px] items-center justify-center rounded-md">
        <Text className="text-darkGray font-bold text-lg">BANNER ADS</Text>
      </View>
    </View>
  );
}
