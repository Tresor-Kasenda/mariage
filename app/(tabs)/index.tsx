import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const particles = Array(20).fill().map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    opacity: Math.random() * 0.5 + 0.3,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3
  }));

  return (
    <View className="flex-1 bg-[#fef3c7] dark:bg-black items-center justify-center">
      <Text className="text-4xl font-semibold leading-8 text-primary">Welcome</Text>
      <Link href='/splashscreen' className="text-2xl font-semibold leading-8 text-primary">
        Go to Splashscreen
      </Link>
    </View>
  );
}
