import { Image, Text, View } from "react-native";

export default function RewardsCard() {
  return (
    <View className="bg-darkGray p-2 rounded-md">
      <View className="flex-row items-center mb-2">
        {/* Left: Text Content */}
        <View className="flex-1">
          <Text className="text-white text-2xl font-bold">Rewards</Text>
          <Text className="text-white text-xs mt-1">
            Hammer Headset worth Rs.5000
          </Text>
        </View>
        {/* Right: Image */}
        <Image
          source={require("../../../assets/images/reward1.png")}
          style={{ width: 48, height: 48, borderRadius: 8, marginLeft: 16 }}
          resizeMode="contain"
        />
      </View>
      {/* Progress Bar */}
      <View
        className="flex-row items-center w-full rounded-md overflow-hidden mb-2"
        style={{ backgroundColor: "#fff", height: 20 }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "10%",
              backgroundColor: "#A1FF00",
            }}
          />
          <View
            style={{ flexDirection: "row", alignItems: "center", zIndex: 1 }}
          >
            <Image
              source={require("../../../assets/images/vector.png")}
              style={{ width: 14, height: 14, marginRight: 3 }}
              resizeMode="contain"
            />
            <Text className="text-darkGray text-sm font-semibold">1,000</Text>
            <Text className="text-darkGray text-sm font-semibold">
              {" "}
              / 10,000
            </Text>
          </View>
        </View>
      </View>
      <Text className="text-rewardLightGreen text-[10px] text-center mt-2">
        You just need 9000 coins to redeem your gift
      </Text>
    </View>
  );
}
