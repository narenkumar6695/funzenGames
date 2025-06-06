import { Image, Text, View } from "react-native";
import { Player } from "../types"; // adjust path as needed

export default function TopPlayersList({ players }: { players: Player[] }) {
  // Top 5 and last player
  const top5 = players.slice(0, 5);
  const last = players[49];

  return (
    <View className="bg-darkerGray rounded-md px-2 py-4">
      <Text className="text-white text-xl font-semibold mb-2">
        Top in Today
      </Text>
      {top5.map((player, idx) => (
        <View
          key={player.id}
          className="flex-row items-center justify-between bg-gray-500 rounded mb-1 px-2 py-0.5"
        >
          <Text className="text-white text-base">{`${idx + 1}. ${
            player.name
          }`}</Text>
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/vector.png")}
              style={{ width: 22, height: 22, marginRight: 4 }}
              tintColor="#A1FF00"
              resizeMode="contain"
            />
            <Text className="text-white text-base">{player.score}</Text>
          </View>
        </View>
      ))}
      <View className="my-1 flex-row justify-center">
        <Text className="text-white text-lg">••••••••</Text>
      </View>
      <View className="flex-row items-center justify-between bg-gray-500 rounded px-2 py-0.5">
        <Text className="text-white text-base">{`50. ${last.name}`}</Text>
        <View className="flex-row items-center">
          <Image
            source={require("../../assets/images/vector.png")}
            style={{ width: 22, height: 22, marginRight: 4 }}
            tintColor="#A1FF00"
            resizeMode="contain"
          />
          <Text className="text-white text-base">{last.score}</Text>
        </View>
      </View>
    </View>
  );
}
