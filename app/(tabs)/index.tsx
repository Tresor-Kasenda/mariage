import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-[#fef3c7] dark:bg-black items-center justify-center">
      <Text className="text-4xl font-semibold leading-8 text-primary">Welcome</Text>
      <Link href='/splashscreen' className="text-2xl font-semibold leading-8 text-primary">
        Go to Splashscreen
      </Link>
    </View>
  );
}
