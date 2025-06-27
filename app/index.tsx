import { ScrollView, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/store";
import {
  setLoginPopupOpen,
  setRegisterPopupOpen,
} from "../src/store/slices/userSlice";

import { useState } from "react";
import AllRewards from "../src/components/common/AllRewards";
import GameImagePairCard from "../src/components/common/GameImagePairCard";
import JoinEarnCard from "../src/components/common/JoinEarnCard";
import LoginPopup from "../src/components/common/LoginPopup";
import MrecAdPlaceholder from "../src/components/common/MrecAdPlaceholder";
import RegisterPopup from "../src/components/common/RegisterPopup";
import RewardsCard from "../src/components/common/RewardsCard";
import ViewAllRewardsCard from "../src/components/common/ViewAllRewardsCard";
import FooterAd from "../src/components/FooterAd";
import Header from "../src/components/layout/Header";
import MainContentArea from "../src/components/MainContentArea";
import PlayerDetails from "../src/components/PlayerDetails";
import TopPlayersList from "../src/components/TopPlayersList";
import { TOP_PLAYERS } from "../src/constants/mockData";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;
  const isMediumScreen = width >= 768 && width < 1024;
  const dispatch = useDispatch();
  const { isRegisterPopupOpen, isLoginPopupOpen, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );

  const [showAllRewards, setShowAllRewards] = useState(false);
  const [showPlayerDetails, setShowPlayerDetails] = useState(false);
  const [isFromJoinEarn, setIsFromJoinEarn] = useState(false);

  const gameImages = [
    require("../assets/images/game1.png"),
    require("../assets/images/game2.png"),
    require("../assets/images/game3.png"),
    require("../assets/images/game4.png"),
  ];
  const cards = Array.from({ length: 48 }, (_, i) => gameImages[i % 4]);

  const handleJoinEarnPress = () => {
    if (isLoggedIn) {
      if (showAllRewards || showPlayerDetails) {
        // If not on MainContentArea, go to MainContentArea
        setShowAllRewards(false);
        setShowPlayerDetails(false);
        setIsFromJoinEarn(false);
      } else {
        // On MainContentArea, open PlayerDetails
        setIsFromJoinEarn(true);
        setShowPlayerDetails(true);
      }
    } else {
      dispatch(setRegisterPopupOpen(true));
    }
  };

  const handleShowPlayerDetails = () => {
    setIsFromJoinEarn(true);
    setShowPlayerDetails(true);
  };

  const handleBackToGames = () => {
    setShowPlayerDetails(false);
    setIsFromJoinEarn(false);
  };

  const handleLogoClick = () => {
    setShowAllRewards(false);
    setShowPlayerDetails(false);
    setIsFromJoinEarn(false);
  };

  // Handler to show all rewards, pass to header and ViewAllRewardsCard
  const handleShowAllRewards = () => {
    setShowAllRewards(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Header, pass handler for mobile menu and logo click */}
      <Header
        onShowAllRewards={handleShowAllRewards}
        onLogoClick={handleLogoClick}
        onShowPlayerDetails={handleShowPlayerDetails}
      />

      {/* Left Sidebar (fixed, outside flex row) */}
      <View className="hidden md:block md:fixed md:left-0 md:top-20 md:bottom-0 md:w-[260px] py-3 px-1 z-10 bg-transparent">
        <View className="space-y-4">
          <JoinEarnCard
            showUserDetails={showPlayerDetails && !showAllRewards}
            onPress={handleJoinEarnPress}
          />
          <RewardsCard />
          <ViewAllRewardsCard onPress={handleShowAllRewards} />
        </View>
        <View className="mt-2">
          <MrecAdPlaceholder />
        </View>
        <View className="mt-2">
          <GameImagePairCard
            image1={require("../assets/images/game1.png")}
            image2={require("../assets/images/game2.png")}
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
            image1={require("../assets/images/game3.png")}
            image2={require("../assets/images/game4.png")}
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
            ) : showPlayerDetails ? (
              <PlayerDetails
                onBack={handleBackToGames}
                isFromJoinEarn={isFromJoinEarn}
              />
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
              ) : showPlayerDetails ? (
                <PlayerDetails
                  onBack={handleBackToGames}
                  isFromJoinEarn={isFromJoinEarn}
                />
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
