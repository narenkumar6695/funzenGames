import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setRegisterPopupOpen } from "../../store/slices/userSlice";
import RegisterPopup from "../common/RegisterPopup";

interface HeaderProps {
  onShowAllRewards?: () => void;
  onLogoClick?: () => void;
}

export default function Header({ onShowAllRewards, onLogoClick }: HeaderProps) {
  const { width } = useWindowDimensions();
  const isMediumScreen = width >= 768;
  const isLargeScreen = width >= 1024;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Geometry Arrow");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const dispatch = useDispatch();
  const { isRegisterPopupOpen } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Check if user is logged in on component mount and when session storage changes
    const checkLoginStatus = () => {
      const userEmail = sessionStorage.getItem("funzernUseremail");
      setIsLoggedIn(!!userEmail);
    };

    // Initial check
    checkLoginStatus();

    // Listen for storage changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const toggleMenu = () => {
    const toValue = isMenuOpen ? -width : 0;
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRegisterPress = () => {
    dispatch(setRegisterPopupOpen(true));
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  const renderNavigationLinks = () => (
    <>
      {/* All Rewards menu item for all views if needed, or just for mobile if you want */}
      {!isMediumScreen && (
        <TouchableOpacity
          className="py-3"
          onPress={() => {
            setSelectedMenu("All Rewards");
            if (onShowAllRewards) onShowAllRewards();
            if (isMenuOpen) toggleMenu();
          }}
        >
          <View className={isMediumScreen ? "" : "items-start"}>
            <Text
              className={`text-base ${
                selectedMenu === "All Rewards"
                  ? "text-primaryGreen border-b-2 border-primaryGreen"
                  : "text-lightGray"
              }`}
            >
              All Rewards
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="py-3"
        onPress={() => setSelectedMenu("Geometry Arrow")}
      >
        <View className={isMediumScreen ? "" : "items-start"}>
          <Text
            className={`text-base ${
              selectedMenu === "Geometry Arrow"
                ? "text-primaryGreen border-b-2 border-primaryGreen"
                : "text-lightGray"
            }`}
          >
            Geometry Arrow
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-3"
        onPress={() => setSelectedMenu("Tetris")}
      >
        <View className={isMediumScreen ? "" : "items-start"}>
          <Text
            className={`text-base ${
              selectedMenu === "Tetris"
                ? "text-primaryGreen border-b-2 border-primaryGreen"
                : "text-lightGray"
            }`}
          >
            Tetris
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-3"
        onPress={() => setSelectedMenu("Chess")}
      >
        <View className={isMediumScreen ? "" : "items-start"}>
          <Text
            className={`text-base ${
              selectedMenu === "Chess"
                ? "text-primaryGreen border-b-2 border-primaryGreen"
                : "text-lightGray"
            }`}
          >
            Chess
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );

  const renderActionButton = () => (
    <TouchableOpacity
      onPress={isLoggedIn ? handleLogout : handleRegisterPress}
      className={`px-4 py-2 rounded-md ${
        isLoggedIn ? "bg-[#FFD0D0]" : "bg-[#A1FF00]"
      }`}
      style={isLoggedIn ? { backgroundColor: "#FFD0D0" } : undefined}
    >
      <View className="flex-row items-center justify-center space-x-2">
        {isLoggedIn && (
          <FontAwesome name="power-off" size={16} color="#8B3A3A" />
        )}
        <Text
          className={`font-semibold ${isLoggedIn ? "text-base" : ""}`}
          style={isLoggedIn ? { color: "#8B3A3A" } : undefined}
        >
          {isLoggedIn
            ? "Logout"
            : isMediumScreen
            ? "Register & Earn"
            : "Join & Earn"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View
        className={`flex-row items-center justify-between py-3 bg-darkerGray ${
          isLargeScreen ? "" : "px-4"
        }`}
      >
        {/* Logo and Title/Nav */}
        <View
          className={`flex-row items-center ${isLargeScreen ? "pl-4" : ""}`}
        >
          {!isMediumScreen && (
            <TouchableOpacity className="mr-2" onPress={toggleMenu}>
              <FontAwesome name="bars" size={24} color="white" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onLogoClick}>
            <Image
              source={require("../../../assets/images/logo.png")}
              style={{
                width: isMediumScreen ? 120 : 90,
                height: isMediumScreen ? 60 : 45,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Right side container for nav links and button */}
        <View
          className={`flex-row items-center space-x-4 ${
            isLargeScreen ? "pr-4" : ""
          }`}
        >
          {/* Navigation Links */}
          {isMediumScreen && (
            <View className="flex-row space-x-6">
              {renderNavigationLinks()}
            </View>
          )}

          {/* Action Button */}
          {renderActionButton()}
        </View>
      </View>

      {/* Mobile Menu Overlay */}
      {!isMediumScreen && (
        <>
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#191919",
              padding: 20,
              transform: [{ translateX: slideAnim }],
              elevation: 10000,
              zIndex: 10000,
            }}
          >
            <View className="flex-row justify-between items-center mb-8">
              <TouchableOpacity
                onPress={toggleMenu}
                className="flex-row items-center space-x-2"
              >
                <FontAwesome name="times" size={20} color="#A1FF00" />
                <Text className="text-primaryGreen text-lg">Close</Text>
              </TouchableOpacity>
              {renderActionButton()}
            </View>
            <View className="mt-4">{renderNavigationLinks()}</View>
          </Animated.View>
          {isMenuOpen && (
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
              }}
              onPress={toggleMenu}
            />
          )}
        </>
      )}

      <RegisterPopup
        visible={isRegisterPopupOpen}
        onClose={() => dispatch(setRegisterPopupOpen(false))}
      />
    </>
  );
}
