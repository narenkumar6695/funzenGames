import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/ui";
import { RootState } from "../store";

interface PlayerDetailsProps {
  onBack: () => void;
  isFromJoinEarn?: boolean;
}

export default function PlayerDetails({
  onBack,
  isFromJoinEarn = false,
}: PlayerDetailsProps) {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <View className="w-full px-2 pt-2">
      <View className="bg-darkGray rounded-md mb-4 overflow-hidden">
        {/* Header with back button */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-700">
          <TouchableOpacity
            onPress={onBack}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg mr-2">←</Text>
            <Text className="text-white text-lg font-semibold">
              Back to Games
            </Text>
          </TouchableOpacity>
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/vector.png")}
              style={{ width: 20, height: 20 }}
              tintColor={COLORS.PRIMARY.GREEN}
              resizeMode="contain"
            />
            <Text className="text-white text-xl font-bold ml-2">
              {(currentUser?.points || 1, 250)}
            </Text>
          </View>
        </View>

        {/* Player Profile Section */}
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Image
              source={require("../../assets/images/profile.png")}
              style={{ width: 80, height: 80, borderRadius: 40 }}
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                {isFromJoinEarn
                  ? currentUser?.username || "Player"
                  : "Player123"}
              </Text>
              <Text className="text-gray-400 text-sm">
                {isFromJoinEarn
                  ? `Email: ${currentUser?.email || "player@example.com"}`
                  : "Member since March 2024"}
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="bg-green-500 w-3 h-3 rounded-full mr-2"></View>
                <Text className="text-green-500 text-sm">Online</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View className="grid grid-cols-2 gap-4 mb-6">
            <View className="bg-black rounded-lg p-4">
              <Text className="text-gray-400 text-sm mb-1">Games Played</Text>
              <Text className="text-white text-2xl font-bold">
                {isFromJoinEarn ? "0" : "247"}
              </Text>
            </View>
            <View className="bg-black rounded-lg p-4">
              <Text className="text-gray-400 text-sm mb-1">Win Rate</Text>
              <Text className="text-white text-2xl font-bold">
                {isFromJoinEarn ? "0%" : "68%"}
              </Text>
            </View>
            <View className="bg-black rounded-lg p-4">
              <Text className="text-gray-400 text-sm mb-1">Total Earnings</Text>
              <Text className="text-white text-2xl font-bold">
                {isFromJoinEarn ? "₿0" : "₿2.5K"}
              </Text>
            </View>
            <View className="bg-black rounded-lg p-4">
              <Text className="text-gray-400 text-sm mb-1">Rank</Text>
              <Text className="text-white text-2xl font-bold">
                {isFromJoinEarn ? "Unranked" : "#42"}
              </Text>
            </View>
          </View>

          {/* Recent Activity */}
          <View className="mb-6">
            <Text className="text-white text-xl font-semibold mb-4">
              Recent Activity
            </Text>
            <View className="space-y-3">
              {isFromJoinEarn ? (
                <View className="bg-black rounded-lg p-6">
                  <Text className="text-gray-400 text-center text-lg">
                    No activity yet. Start playing games to see your activity
                    here!
                  </Text>
                </View>
              ) : (
                [
                  {
                    game: "Puzzle Master",
                    result: "Won",
                    amount: "+150",
                    time: "2 hours ago",
                  },
                  {
                    game: "Speed Runner",
                    result: "Lost",
                    amount: "-50",
                    time: "4 hours ago",
                  },
                  {
                    game: "Memory Match",
                    result: "Won",
                    amount: "+200",
                    time: "1 day ago",
                  },
                  {
                    game: "Logic Quest",
                    result: "Won",
                    amount: "+100",
                    time: "2 days ago",
                  },
                ].map((activity, index) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-between bg-black rounded-lg p-3"
                  >
                    <View className="flex-1">
                      <Text className="text-white font-medium">
                        {activity.game}
                      </Text>
                      <Text className="text-gray-400 text-sm">
                        {activity.time}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text
                        className={`font-bold mr-2 ${
                          activity.result === "Won"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {activity.amount}
                      </Text>
                      <View
                        className={`px-2 py-1 rounded-full ${
                          activity.result === "Won"
                            ? "bg-green-900"
                            : "bg-red-900"
                        }`}
                      >
                        <Text
                          className={`text-xs font-medium ${
                            activity.result === "Won"
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        >
                          {activity.result}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>

          {/* Achievements */}
          <View>
            <Text className="text-white text-xl font-semibold mb-4">
              Achievements
            </Text>
            <View className="grid grid-cols-3 gap-3">
              {isFromJoinEarn ? (
                <View className="col-span-3 bg-black rounded-lg p-6">
                  <Text className="text-gray-400 text-center text-lg">
                    No achievements yet. Play games to unlock achievements!
                  </Text>
                </View>
              ) : (
                [
                  { name: "First Win", icon: "🏆", unlocked: true },
                  { name: "10 Games", icon: "🎮", unlocked: true },
                  { name: "100 Points", icon: "⭐", unlocked: true },
                  { name: "Win Streak", icon: "🔥", unlocked: false },
                  { name: "Speed Demon", icon: "⚡", unlocked: false },
                  { name: "Puzzle Master", icon: "🧩", unlocked: true },
                ].map((achievement, index) => (
                  <View
                    key={index}
                    className={`rounded-lg p-3 items-center ${
                      achievement.unlocked ? "bg-green-900" : "bg-gray-800"
                    }`}
                  >
                    <Text className="text-2xl mb-1">{achievement.icon}</Text>
                    <Text
                      className={`text-xs text-center ${
                        achievement.unlocked
                          ? "text-green-300"
                          : "text-gray-500"
                      }`}
                    >
                      {achievement.name}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
