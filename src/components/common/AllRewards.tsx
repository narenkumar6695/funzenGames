import {
  Image,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

// Remove statusKeys, define StatusType directly
// const statusKeys = ["Limited", "Low", "Available", "Unavailable"] as const;
type StatusType = "Limited" | "Low" | "Available" | "Unavailable";

const rewards = Array.from({ length: 10 }).map((_, i) => ({
  name: "Hammer Headset",
  worth: "Rs.5000",
  points: "100,000",
  status: (i % 3 === 0
    ? "Limited"
    : i % 3 === 1
    ? "Low"
    : i % 3 === 2
    ? "Available"
    : "Unavailable") as StatusType,
  image: require("../../../assets/images/reward1.png"),
}));

const statusColors: Record<StatusType, { color: string; label: string }> = {
  Limited: { color: "#FFA600", label: "Limited" },
  Low: { color: "#FF0000", label: "Low" },
  Available: { color: "#00FF6A", label: "Available" },
  Unavailable: { color: "#828282", label: "Unavailable" },
};

export default function AllRewards() {
  const { width } = useWindowDimensions();
  const isXL = width >= 1280;

  return (
    <ScrollView className="flex-1 bg-black pt-4 pb-6">
      <Text
        className="text-white font-extrabold text-center mt-4 px-3"
        style={{ fontSize: 60 }}
      >
        All Rewards
      </Text>
      <View className="w-full px-2 py-6">
        {isXL
          ? Array.from({ length: Math.ceil(rewards.length / 2) }).map(
              (_, rowIdx) => (
                <View key={rowIdx} className="flex flex-row w-full mb-4">
                  {[0, 1].map((colIdx) => {
                    const idx = rowIdx * 2 + colIdx;
                    const reward = rewards[idx];
                    if (!reward)
                      return <View key={colIdx} className="flex-1" />;
                    return (
                      <View key={colIdx} className="w-1/2 px-2">
                        <View
                          className="bg-darkGray rounded-md p-4 flex-row"
                          style={{
                            flex: 1,
                            minWidth: 0,
                            alignItems: "stretch",
                          }}
                        >
                          {/* Left column: name, points, worth */}
                          <View className="flex-1 flex-col justify-between pr-4">
                            <Text
                              className="text-white font-extrabold mb-2 leading-tight"
                              style={{ fontSize: 30 }}
                            >
                              {reward.name}
                            </Text>
                            <View
                              className="w-full bg-primaryGreen flex-row items-center justify-center rounded-md px-4 py-2 mb-2 mx-auto"
                              style={{ minHeight: 48, maxWidth: 220 }}
                            >
                              <Image
                                source={require("../../../assets/images/vector.png")}
                                style={{
                                  width: 20,
                                  height: 20,
                                  marginRight: 8,
                                }}
                                resizeMode="contain"
                                tintColor="#000"
                              />
                              <Text className="text-black font-bold text-xl">
                                {reward.points}
                              </Text>
                            </View>
                            <Text className="text-white text-base mt-2">
                              worth {reward.worth}
                            </Text>
                          </View>
                          {/* Right column: image and status */}
                          <View
                            className="flex flex-col items-center justify-center"
                            style={{ width: 160 }}
                          >
                            <View
                              className="bg-[#E5E5E5] rounded-lg items-center justify-center mb-3"
                              style={{ width: 140, height: 140 }}
                            >
                              <Image
                                source={reward.image}
                                style={{
                                  width: 110,
                                  height: 110,
                                  borderRadius: 12,
                                }}
                                resizeMode="contain"
                              />
                            </View>
                            <View className="flex-row items-center justify-center mt-1">
                              <View
                                style={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: 6,
                                  backgroundColor:
                                    statusColors[reward.status].color,
                                  marginRight: 6,
                                }}
                              />
                              <Text
                                style={{
                                  color: statusColors[reward.status].color,
                                  fontSize: 18,
                                  fontWeight: "bold",
                                }}
                              >
                                {statusColors[reward.status].label}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )
            )
          : rewards.map((reward, idx) => (
              <View key={idx} className="w-full mb-4">
                <View
                  className="bg-darkGray rounded-md p-4 flex-row"
                  style={{ flex: 1, minWidth: 0, alignItems: "stretch" }}
                >
                  {/* Left column: name, points, worth */}
                  <View className="flex-1 flex-col justify-between pr-4">
                    <Text
                      className="text-white font-extrabold mb-2 leading-tight"
                      style={{ fontSize: 30 }}
                    >
                      {reward.name}
                    </Text>
                    <View
                      className="w-full bg-primaryGreen flex-row items-center justify-center rounded-md px-4 py-2 mb-2 mx-auto"
                      style={{ minHeight: 48, maxWidth: 220 }}
                    >
                      <Image
                        source={require("../../../assets/images/vector.png")}
                        style={{ width: 20, height: 20, marginRight: 8 }}
                        resizeMode="contain"
                        tintColor="#000"
                      />
                      <Text className="text-black font-bold text-xl">
                        {reward.points}
                      </Text>
                    </View>
                    <Text className="text-white text-base mt-2">
                      worth {reward.worth}
                    </Text>
                  </View>
                  {/* Right column: image and status */}
                  <View
                    className="flex flex-col items-center justify-center"
                    style={{ width: 160 }}
                  >
                    <View
                      className="bg-[#E5E5E5] rounded-lg items-center justify-center mb-3"
                      style={{ width: 140, height: 140 }}
                    >
                      <Image
                        source={reward.image}
                        style={{ width: 110, height: 110, borderRadius: 12 }}
                        resizeMode="contain"
                      />
                    </View>
                    <View className="flex-row items-center justify-center mt-1">
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: statusColors[reward.status].color,
                          marginRight: 6,
                        }}
                      />
                      <Text
                        style={{
                          color: statusColors[reward.status].color,
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {statusColors[reward.status].label}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
      </View>
    </ScrollView>
  );
}
