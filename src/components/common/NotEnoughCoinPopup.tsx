import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function NotEnoughCoinPopup({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-black rounded-lg w-[90%] max-w-md px-6 py-8 relative items-center">
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-3 right-4 z-10"
          >
            <Text className="text-white text-2xl font-bold">×</Text>
          </TouchableOpacity>
          {/* Sad Emoji */}
          <Text className="text-6xl mb-2">😕</Text>
          {/* Title */}
          <Text className="text-white text-2xl font-bold text-center mb-2">
            Not enough Coins
          </Text>
          {/* Subtitle */}
          <Text className="text-white text-center mb-8 text-base">
            To Earn More, Play More
          </Text>
          {/* Play More Button */}
          <TouchableOpacity
            className="bg-primaryGreen rounded-md w-full py-3"
            onPress={onClose}
          >
            <Text className="text-black text-lg font-semibold text-center">
              PLAY MORE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
