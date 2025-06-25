import {
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setLoginPopupOpen,
  setRegisterPopupOpen,
} from "../../store/slices/userSlice";
import { FormData, FormErrors, FormMessage, PopupProps } from "../../types";
import {
  getPasswordError,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../utils/validation";

import { useEffect, useState } from "react";

export default function RegisterPopup({ visible, onClose }: PopupProps) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.user);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formMessage, setFormMessage] = useState<FormMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      email: "",
      name: "",
      phone: "",
      password: "",
    });
    setErrors({});
    setFormMessage(null);
    setIsChecked(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    dispatch(setRegisterPopupOpen(false));
    onClose();
  };

  const handleSwitchToLogin = () => {
    resetForm();
    dispatch(setRegisterPopupOpen(false));
    dispatch(setLoginPopupOpen(true));
  };

  const validateField = (field: keyof FormData, value: string) => {
    let error = "";
    switch (field) {
      case "email":
        if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "name":
        if (!validateName(value)) {
          error = "Name must be at least 4 characters long";
        }
        break;
      case "phone":
        if (!validatePhone(value)) {
          error = "Phone number must be 10 digits";
        }
        break;
      case "password":
        if (!validatePassword(value)) {
          error = getPasswordError(value);
        }
        break;
    }
    return error;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    // Clear form message when user starts typing
    if (formMessage) {
      setFormMessage(null);
    }
  };

  const handleInputBlur = (field: keyof FormData) => {
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const isFormValid = () => {
    const emailValid = validateEmail(formData.email);
    const nameValid = validateName(formData.name);
    const phoneValid = validatePhone(formData.phone);
    const passwordValid = validatePassword(formData.password);

    return emailValid && nameValid && phoneValid && passwordValid && isChecked;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      setFormMessage({
        type: "success",
        message: "Registration successful! Welcome to Funzen Games.",
      });

      // Reset form after successful submission
      setFormData({
        email: "",
        name: "",
        phone: "",
        password: "",
      });
      setIsChecked(false);

      // Close popup after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      setFormMessage({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when modal visibility changes
  useEffect(() => {
    if (!visible) {
      resetForm();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      style={{ pointerEvents: "auto" }}
    >
      <View className="flex-1 justify-center items-center bg-[#D5D5D5]/50">
        <View className="bg-black rounded-lg w-[90%] max-w-md">
          {/* Close Button */}
          <View className="flex-row justify-end p-2">
            <TouchableOpacity onPress={handleClose} className="px-2">
              <Text className="text-white text-3xl font-bold">×</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="px-6 pb-6">
            {/* Header */}
            <View className="items-center">
              <Text className="text-white text-xl font-semibold">
                Join to play on
              </Text>
              <Image
                source={require("../../../assets/images/nameLogo.png")}
                style={{ width: 250, height: 70 }}
                resizeMode="contain"
              />
            </View>

            {/* Form Message */}
            {formMessage && (
              <View
                style={{
                  backgroundColor:
                    formMessage.type === "success" ? "#16a34a" : "#dc2626",
                  borderWidth: 2,
                  borderColor:
                    formMessage.type === "success" ? "#22c55e" : "#ef4444",
                }}
                className="p-4 rounded-lg mb-4"
              >
                <Text className="text-center font-semibold text-base text-white">
                  {formMessage.message}
                </Text>
              </View>
            )}

            {/* Form Fields */}
            <View className="space-y-4">
              <View>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="white"
                  className="bg-[#444444] text-white px-2 py-2 rounded-md border-0 text-lg"
                  style={{ outline: "none" }}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  onBlur={() => handleInputBlur("email")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
                {errors.email && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>

              <View>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="white"
                  className="bg-[#444444] text-white px-2 py-2 rounded-md border-0 text-lg"
                  style={{ outline: "none" }}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  onBlur={() => handleInputBlur("name")}
                  autoCapitalize="words"
                  editable={!isSubmitting}
                />
                {errors.name && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </Text>
                )}
              </View>

              <View>
                <TextInput
                  placeholder="Phone"
                  placeholderTextColor="white"
                  className="bg-[#444444] text-white px-2 py-2 rounded-md border-0 text-lg"
                  style={{ outline: "none" }}
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange("phone", value)}
                  onBlur={() => handleInputBlur("phone")}
                  keyboardType="phone-pad"
                  maxLength={10}
                  editable={!isSubmitting}
                />
                {errors.phone && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </Text>
                )}
              </View>

              <View>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="white"
                  className="bg-[#444444] text-white px-2 py-2 rounded-md border-0 text-lg"
                  style={{ outline: "none" }}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  onBlur={() => handleInputBlur("password")}
                  secureTextEntry
                  editable={!isSubmitting}
                />
                {errors.password && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </Text>
                )}
              </View>
            </View>

            {/* Checkbox */}
            <TouchableOpacity
              className="flex-row items-center mt-6"
              onPress={() => setIsChecked(!isChecked)}
              disabled={isSubmitting}
            >
              <View
                className={`w-5 h-5 border-2 rounded mr-2 ${
                  isChecked
                    ? "bg-primaryGreen border-primaryGreen"
                    : "border-white"
                }`}
              >
                {isChecked && <Text className="text-black text-center">✓</Text>}
              </View>
              <TouchableOpacity onPress={handleSwitchToLogin}>
                <Text className="text-white text-sm">
                  I have read the terms conditions & privacy policy.
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              className={`mt-6 py-3 rounded-md ${
                isFormValid() && !isSubmitting
                  ? "bg-primaryGreen"
                  : "bg-gray-500"
              }`}
              disabled={!isFormValid() || isSubmitting}
              onPress={handleSubmit}
            >
              <Text className="text-darkerGray font-semibold text-center">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity onPress={handleSwitchToLogin} className="mt-4">
              <Text className="text-white text-sm text-center underline">
                I already have an existing account
              </Text>
            </TouchableOpacity>

            {error && (
              <Text className="text-red-500 mt-4 text-center">{error}</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
