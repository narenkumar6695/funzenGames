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
  loginUser,
  setLoginPopupOpen,
  setRegisterPopupOpen,
} from "../../store/slices/userSlice";
import {
  FormMessage,
  LoginFormData,
  LoginFormErrors,
  PopupProps,
} from "../../types";
import { validateEmail, validatePhone } from "../../utils/validation";

import { useEffect, useState } from "react";

export default function LoginPopup({ visible, onClose }: PopupProps) {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.user);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [formMessage, setFormMessage] = useState<FormMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      identifier: "",
      password: "",
    });
    setErrors({});
    setFormMessage(null);
    setIsChecked(false);
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    dispatch(setLoginPopupOpen(false));
    onClose();
  };

  const handleSwitchToRegister = () => {
    resetForm();
    dispatch(setLoginPopupOpen(false));
    dispatch(setRegisterPopupOpen(true));
  };

  const validateField = (field: keyof LoginFormData, value: string) => {
    let error = "";
    switch (field) {
      case "identifier":
        if (!value.trim()) {
          error = "Email or phone is required";
        } else if (!validateEmail(value) && !validatePhone(value)) {
          error = "Please enter a valid email or phone number";
        }
        break;
      case "password":
        if (!value.trim()) {
          error = "Password is required";
        }
        break;
    }
    return error;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
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

  const handleInputBlur = (field: keyof LoginFormData) => {
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const isFormValid = () => {
    const identifierValid =
      validateEmail(formData.identifier) || validatePhone(formData.identifier);
    const passwordValid = formData.password.trim() !== "";

    return identifierValid && passwordValid;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    setFormMessage(null);

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call

      // Create user object and dispatch login action
      if (validateEmail(formData.identifier)) {
        const user = {
          id: "1",
          username: formData.identifier.split("@")[0], // Use email prefix as username
          email: formData.identifier,
          points: 1000,
          isRegistered: true,
        };
        dispatch(loginUser(user));
      }

      setFormMessage({
        type: "success",
        message: "Login successful! Welcome back.",
      });

      // Reset form after successful submission
      setFormData({
        identifier: "",
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
            : "Login failed. Please try again.",
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
                Continue playing on
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
                  placeholder="Email / Phone"
                  placeholderTextColor="white"
                  className="bg-[#444444] text-white px-2 py-2 rounded-md border-0 text-lg"
                  style={{ outline: "none" }}
                  value={formData.identifier}
                  onChangeText={(value) =>
                    handleInputChange("identifier", value)
                  }
                  onBlur={() => handleInputBlur("identifier")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSubmitting}
                />
                {errors.identifier && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.identifier}
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

            {/* Remember Me Checkbox */}
            <TouchableOpacity
              className="flex-row items-center mt-4"
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
              <Text className="text-white text-sm">Remember me</Text>
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
                {isSubmitting ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity onPress={handleSwitchToRegister} className="mt-4">
              <Text className="text-white text-sm text-center underline">
                I want to create a new account.
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
