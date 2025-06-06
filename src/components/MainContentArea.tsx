import { Image, View } from "react-native";
import MrecAdPlaceholder from "./common/MrecAdPlaceholder";

export default function MainContentArea({
  isMediumScreen,
  isLargeScreen,
  cards,
}: {
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  cards: any[];
}) {
  // Group cards into rows based on screen size
  const cardsPerRow = isLargeScreen ? 4 : isMediumScreen ? 3 : 2;
  const rows = [];
  for (let i = 0; i < cards.length; i += cardsPerRow) {
    rows.push(cards.slice(i, i + cardsPerRow));
  }

  return (
    <View
      className="w-full px-2 pt-2"
      style={{
        position: "relative",
        minHeight: 300,
      }}
    >
      <View
        className="bg-darkGray rounded-md mb-4 overflow-hidden"
        style={{ minHeight: 200, padding: 8 }}
      >
        {rows.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`}>
            <View className="flex flex-row">
              {row.map((img, idx) => (
                <View
                  key={`game-${rowIndex * cardsPerRow + idx}`}
                  className="w-1/2 md:w-1/3 lg:w-1/4 px-1 mb-2"
                >
                  <View
                    className="bg-black rounded-md overflow-hidden flex-1 items-center justify-center"
                    style={{ aspectRatio: 1 }}
                  >
                    <Image
                      source={img}
                      style={{ width: "100%", height: "100%", borderRadius: 8 }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              ))}
            </View>
            {/* Insert MrecAd after every 2 rows on mobile */}
            {!isMediumScreen && !isLargeScreen && rowIndex % 2 === 1 && (
              <View className="w-full mt-4 mb-4">
                <MrecAdPlaceholder />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
