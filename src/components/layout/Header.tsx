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
import { COLORS } from "../../constants/ui";
import { RootState } from "../../store";
import {
  checkLoginStatus,
  logout,
  setRegisterPopupOpen,
} from "../../store/slices/userSlice";
import RegisterPopup from "../common/RegisterPopup";

interface HeaderProps {
  onShowAllRewards?: () => void;
  onLogoClick?: () => void;
  onShowPlayerDetails?: () => void;
}

export default function Header({
  onShowAllRewards,
  onLogoClick,
  onShowPlayerDetails,
}: HeaderProps) {
  const { width } = useWindowDimensions();
  const isMediumScreen = width >= 768;
  const isLargeScreen = width >= 1024;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Geometry Arrow");
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const dispatch = useDispatch();
  const { isRegisterPopupOpen, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Initial check
    dispatch(checkLoginStatus());

    // Listen for storage changes
    const handleStorageChange = () => {
      dispatch(checkLoginStatus());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
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
      {isLoggedIn && !isMediumScreen && (
        <TouchableOpacity
          className="mt-4"
          onPress={() => {
            handleLogout();
            if (isMenuOpen) toggleMenu();
          }}
        >
          <View className="bg-[#FFD0D0] px-4 py-2 rounded-md">
            <View className="flex-row items-center justify-center space-x-2">
              <FontAwesome name="power-off" size={16} color="#8B3A3A" />
              <Text
                className="text-base font-semibold"
                style={{ color: "#8B3A3A" }}
              >
                Logout
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  const renderActionButton = () => (
    <View className="flex-row items-center space-x-3">
      {isLoggedIn && isMediumScreen && (
        <TouchableOpacity
          onPress={() => {
            // TODO: Implement watch ad functionality
            console.log("Watch ad clicked");
          }}
          className="px-4 py-2 rounded-md items-center justify-center"
          style={{ backgroundColor: "#9FFC8F" }}
        >
          <Text
            className="text-base font-semibold text-center"
            style={{ color: "#666666" }}
          >
            Earn 100 coins{"\n"}watch Ad
          </Text>
        </TouchableOpacity>
      )}
      {isLoggedIn && !isMediumScreen && (
        <TouchableOpacity
          onPress={onShowPlayerDetails}
          className="flex-row items-center space-x-2"
          activeOpacity={0.8}
        >
          <View className="bg-white px-3 py-1 rounded-lg">
            <Text className="text-darkerGray text-base font-semibold mb-0.5">
              My Balance
            </Text>
            <View className="flex-row items-center">
              <Image
                source={require("../../../assets/images/vector.png")}
                style={{ width: 16, height: 16, marginTop: 1 }}
                tintColor={COLORS.PRIMARY.GREEN}
                resizeMode="contain"
              />
              <Text className="text-darkerGray text-lg font-bold ml-1">
                1,000
              </Text>
            </View>
          </View>
          <Image
            source={require("../../../assets/images/profile.png")}
            style={{ width: 52, height: 52, borderRadius: 26 }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      {isLoggedIn && isMediumScreen && (
        <TouchableOpacity
          onPress={handleLogout}
          className="px-4 py-2 rounded-md bg-[#FFD0D0]"
        >
          <View className="flex-row items-center justify-center space-x-2">
            <FontAwesome name="power-off" size={16} color="#8B3A3A" />
            <Text
              className="text-base font-semibold"
              style={{ color: "#8B3A3A" }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {!isLoggedIn && (
        <TouchableOpacity
          onPress={handleRegisterPress}
          className="px-4 py-2 rounded-md bg-[#A1FF00]"
        >
          <Text className="font-semibold">
            {isMediumScreen ? "Register & Earn" : "Join & Earn"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
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
