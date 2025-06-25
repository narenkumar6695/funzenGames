import { Text, TouchableOpacity, View } from "react-native";
import { ViewAllRewardsCardProps } from "../../types";

export default function ViewAllRewardsCard({
  onPress,
}: ViewAllRewardsCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="bg-secondaryLightGreen rounded-md py-3 items-center mt-2">
        <Text className="text-black font-semibold text-base">
          View All Rewards &gt;
        </Text>
      </View>
    </TouchableOpacity>
  );
}
