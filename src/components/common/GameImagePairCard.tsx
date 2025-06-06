import { Image, ImageSourcePropType, View } from "react-native";

type GameImagePairCardProps = {
  image1: ImageSourcePropType;
  image2: ImageSourcePropType;
};

export default function GameImagePairCard({
  image1,
  image2,
}: GameImagePairCardProps) {
  return (
    <View className="flex-row space-x-2">
      <Image
        source={image1}
        style={{ flex: 1, height: 120, borderRadius: 8 }}
        resizeMode="cover"
      />
      <Image
        source={image2}
        style={{ flex: 1, height: 120, borderRadius: 8 }}
        resizeMode="cover"
      />
    </View>
  );
}
