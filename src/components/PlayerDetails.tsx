import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PLAYER_DETAILS_DUMMY } from "../constants/mockData";
import { PlayerDetailsProps } from "../types";

export default function PlayerDetails({
  onBack,
  isFromJoinEarn = false,
}: PlayerDetailsProps) {
  const { coins, recentGameActivity, recentPurchases, userInfo } =
    PLAYER_DETAILS_DUMMY;
  const [address, setAddress] = useState(userInfo.address);

  return (
    <ScrollView className="w-full px-2 pt-2">
      {/* Coins Collected */}
      <View className="bg-darkGray rounded-md mb-4 p-6 flex-row items-center">
        <Image
          source={require("../../assets/images/vector.png")}
          style={{ width: 60, height: 60, marginRight: 16 }}
          resizeMode="contain"
        />
        <View>
          <Text className="text-white text-lg">Coins Collected</Text>
          <Text className="text-primaryGreen text-5xl font-bold">{coins}</Text>
        </View>
      </View>

      {/* Recent Game Activity */}
      <Text className="text-white text-xl font-semibold mb-2">
        Recent Game Activity
      </Text>
      <View className="bg-darkGray rounded-md mb-4">
        <View className="flex-row px-4 py-2 border-b border-gray-700">
          <Text className="flex-1 text-white font-semibold">Date</Text>
          <Text className="flex-1 text-white font-semibold">Time</Text>
          <Text className="flex-1 text-white font-semibold">Gameplayed</Text>
          <Text className="flex-1 text-white font-semibold">
            Coins Collected
          </Text>
        </View>
        {recentGameActivity.map((item, idx) => (
          <View
            key={idx}
            className="flex-row px-4 py-1 border-b border-gray-800"
          >
            <Text className="flex-1 text-gray-200">{item.date}</Text>
            <Text className="flex-1 text-gray-200">{item.time}</Text>
            <Text className="flex-1 text-gray-200">{item.game}</Text>
            <Text className="flex-1 text-primaryGreen">{item.coins} Coins</Text>
          </View>
        ))}
        <View className="flex-row justify-end px-4 py-2">
          <Text className="text-primaryGreen text-right">
            View all more &gt;
          </Text>
        </View>
      </View>

      {/* Recent Purchases */}
      <Text className="text-white text-xl font-semibold mb-2">
        Recent Purchases
      </Text>
      <View className="bg-darkGray rounded-md mb-4 px-4 py-4">
        {recentPurchases.length === 0 ? (
          <Text className="text-gray-300">No purchases made yet</Text>
        ) : (
          // Map purchases here
          recentPurchases.map((purchase, idx) => (
            <Text key={idx} className="text-gray-200">
              {purchase}
            </Text>
          ))
        )}
      </View>

      {/* Your Informations */}
      <Text className="text-white text-xl font-semibold mb-2">
        Your Informations
      </Text>
      <View className="flex-row items-start mb-4">
        <View className="flex-1 mr-4">
          <TextInput
            className="bg-darkGray text-white rounded-md px-4 py-3 mb-3"
            placeholder="Email"
            placeholderTextColor="#888"
            value={userInfo.email}
            editable={false}
          />
          <TextInput
            className="bg-darkGray text-white rounded-md px-4 py-3 mb-3"
            placeholder="Name"
            placeholderTextColor="#888"
            value={userInfo.name}
            editable={false}
          />
          <TextInput
            className="bg-darkGray text-white rounded-md px-4 py-3 mb-3"
            placeholder="Phone"
            placeholderTextColor="#888"
            value={userInfo.phone}
            editable={false}
          />
          <TextInput
            className="bg-darkGray text-white rounded-md px-4 py-3 mb-3"
            placeholder="Address"
            placeholderTextColor="#888"
            value={address}
            onChangeText={setAddress}
          />
        </View>
        <Image
          source={require("../../assets/images/profile.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 4,
            borderColor: "#A1FF00",
          }}
        />
      </View>
      <TouchableOpacity
        className="bg-primaryGreen rounded-md px-4 py-3 mb-8 self-end"
        style={{ minWidth: 200 }}
      >
        <Text className="text-black text-lg font-semibold text-center">
          Verify Address with OTP
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
