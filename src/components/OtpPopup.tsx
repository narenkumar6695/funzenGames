import { useRef, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function OtpPopup({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[idx] = text;
      setOtp(newOtp);
      if (text && idx < 5) {
        inputRefs[idx + 1].current?.focus();
      }
    }
  };

  const handleVerify = () => {
    // Add your OTP verification logic here
    onClose();
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-black rounded-lg w-[90%] max-w-md px-6 py-6 relative">
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-3 right-4 z-10"
          >
            <Text className="text-white text-2xl font-bold">×</Text>
          </TouchableOpacity>
          {/* Title */}
          <Text className="text-white text-2xl font-bold text-center mb-1">
            Verify Address
          </Text>
          {/* Subtitle */}
          <Text className="text-white text-center mb-6">
            Enter the number that is mentioned in the card
          </Text>
          {/* OTP Inputs */}
          <View className="flex-row justify-center mb-8 space-x-2">
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputRefs[idx]}
                value={digit}
                onChangeText={(text) => handleChange(text, idx)}
                keyboardType="number-pad"
                maxLength={1}
                className="bg-gray-400 text-black text-2xl rounded-md text-center"
                style={{ width: 44, height: 54, marginHorizontal: 4 }}
              />
            ))}
          </View>
          {/* Verify Button */}
          <TouchableOpacity
            className={`bg-primaryGreen rounded-md w-full ${
              isOtpComplete ? "" : "opacity-50"
            } mt-2`}
            style={{ height: 36, justifyContent: "center" }}
            onPress={handleVerify}
            disabled={!isOtpComplete}
          >
            <Text className="text-black text-base font-semibold text-center">
              VERIFY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
