import { ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setLoginPopupOpen,
  setRegisterPopupOpen,
} from "../store/slices/userSlice";

import { useState } from "react";
import AllRewards from "../components/common/AllRewards";
import GameImagePairCard from "../components/common/GameImagePairCard";
import JoinEarnCard from "../components/common/JoinEarnCard";
import LoginPopup from "../components/common/LoginPopup";
import MrecAdPlaceholder from "../components/common/MrecAdPlaceholder";
import RegisterPopup from "../components/common/RegisterPopup";
import RewardsCard from "../components/common/RewardsCard";
import ViewAllRewardsCard from "../components/common/ViewAllRewardsCard";
import FooterAd from "../components/FooterAd";
import Header from "../components/layout/Header";
import MainContentArea from "../components/MainContentArea";
import TopPlayersList from "../components/TopPlayersList";
import { TOP_PLAYERS } from "../constants/mockData";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768 && width < 1024;
  const dispatch = useDispatch();
  const { isRegisterPopupOpen, isLoginPopupOpen } = useSelector(
    (state: RootState) => state.user
  );

  const [showAllRewards, setShowAllRewards] = useState(false);

  const gameImages = [
    require("../../assets/images/game1.png"),
    require("../../assets/images/game2.png"),
    require("../../assets/images/game3.png"),
    require("../../assets/images/game4.png"),
  ];
  const cards = Array.from({ length: 48 }, (_, i) => gameImages[i % 4]);

  const handleRegisterPress = () => {
    dispatch(setRegisterPopupOpen(true));
  };

  // Handler to show all rewards, pass to header and ViewAllRewardsCard
  const handleShowAllRewards = () => setShowAllRewards(true);
  const handleLogoClick = () => setShowAllRewards(false);

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header, pass handler for mobile menu and logo click */}
      <Header
        onShowAllRewards={handleShowAllRewards}
        onLogoClick={handleLogoClick}
      />

      {/* Left Sidebar (fixed, outside flex row) */}
      <View className="hidden md:block md:fixed md:left-0 md:top-20 md:bottom-0 md:w-[260px] py-3 px-1 z-10 bg-transparent">
        <View className="space-y-4">
          <JoinEarnCard onPress={handleRegisterPress} />
          <RewardsCard />
          <ViewAllRewardsCard onPress={handleShowAllRewards} />
        </View>
        <View className="mt-2">
          <MrecAdPlaceholder />
        </View>
        <View className="mt-2">
          <GameImagePairCard
            image1={require("../../assets/images/game1.png")}
            image2={require("../../assets/images/game2.png")}
          />
        </View>
      </View>

      {/* Right Sidebar (fixed, outside flex row) */}
      <View className="hidden md:block md:fixed md:right-0 md:top-20 md:bottom-0 md:w-[260px] py-3 px-1 z-10 bg-transparent">
        <View className="space-y-4">
          <TopPlayersList players={TOP_PLAYERS} />
        </View>
        <View className="mt-2">
          <MrecAdPlaceholder />
        </View>
        <View className="mt-2">
          <GameImagePairCard
            image1={require("../../assets/images/game3.png")}
            image2={require("../../assets/images/game4.png")}
          />
        </View>
      </View>

      {/* Desktop Layout */}
      {(isLargeScreen || isMediumScreen) && (
        <View className="flex-1 flex flex-col min-h-screen relative md:ml-[260px] md:mr-[260px]">
          <ScrollView
            className="flex-1 bg-black"
            showsVerticalScrollIndicator={false}
          >
            {showAllRewards ? (
              <AllRewards />
            ) : (
              <MainContentArea
                isMediumScreen={isMediumScreen}
                isLargeScreen={isLargeScreen}
                cards={cards}
              />
            )}
            <FooterAd />
          </ScrollView>
        </View>
      )}

      {/* Mobile Layout */}
      {!(isLargeScreen || isMediumScreen) && (
        <View className="flex-1 bg-black">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 140 }}
          >
            <View className="flex-col space-y-2">
              {showAllRewards ? (
                <AllRewards />
              ) : (
                <MainContentArea
                  isMediumScreen={isMediumScreen}
                  isLargeScreen={isLargeScreen}
                  cards={cards}
                />
              )}
            </View>
          </ScrollView>
          <FooterAd />
        </View>
      )}

      <RegisterPopup
        visible={isRegisterPopupOpen}
        onClose={() => dispatch(setRegisterPopupOpen(false))}
      />
      <LoginPopup
        visible={isLoginPopupOpen}
        onClose={() => dispatch(setLoginPopupOpen(false))}
      />
    </SafeAreaView>
  );
}
