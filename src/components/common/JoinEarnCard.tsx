import { useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../../constants/ui";
import { RootState } from "../../store";
import { checkLoginStatus } from "../../store/slices/userSlice";

declare const window: Window & typeof globalThis;

interface JoinEarnCardProps {
  onPress: () => void;
  showUserDetails?: boolean;
}

export default function JoinEarnCard({
  onPress,
  showUserDetails = false,
}: JoinEarnCardProps) {
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Initial check
    dispatch(checkLoginStatus());

    // Listen for storage changes
    const handleStorageChange = () => {
      dispatch(checkLoginStatus());
    };

    // Subscribe to storage changes
    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [dispatch]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        className={`${
          isLoggedIn ? "bg-darkGray" : "bg-primaryGreen"
        } p-2 rounded-md`}
      >
        {isLoggedIn ? (
          showUserDetails ? (
            // Show user details (name and email)
            <View className="flex-row items-center justify-between px-4 py-3">
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-1">
                  {currentUser?.username || "Player"}
                </Text>
                <Text className="text-gray-300 text-sm">
                  {currentUser?.email || "player@example.com"}
                </Text>
              </View>
              <Image
                source={require("../../../assets/images/profile.png")}
                style={{ width: 50, height: 50, borderRadius: 25 }}
                resizeMode="cover"
              />
            </View>
          ) : (
            // Show My Balance
            <View className="flex-row items-center justify-between px-4">
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-2">
                  My Balance
                </Text>
                <View className="flex-row items-center">
                  <Image
                    source={require("../../../assets/images/vector.png")}
                    style={{ width: 18, height: 18, marginTop: 2 }}
                    tintColor={COLORS.PRIMARY.GREEN}
                    resizeMode="contain"
                  />
                  <Text className="text-white text-2xl font-bold ml-2">
                    {currentUser?.points || 1000}
                  </Text>
                </View>
              </View>
              <Image
                source={require("../../../assets/images/profile.png")}
                style={{ width: 60, height: 60, borderRadius: 30 }}
                resizeMode="cover"
              />
            </View>
          )
        ) : (
          <>
            <Text className="text-darkerGray text-lg font-semibold mb-2 text-center">
              Join & Earn
            </Text>
            <View className="flex-row items-center justify-center">
              <Image
                source={require("../../../assets/images/vector.png")}
                style={{ width: 18, height: 18, marginTop: 2 }}
                tintColor="#000"
                resizeMode="contain"
              />
              <Text className="text-darkerGray text-2xl font-bold ml-2">
                1000
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
