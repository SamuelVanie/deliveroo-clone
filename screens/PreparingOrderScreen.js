import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <SafeAreaView className="bg-[#FFF740] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/ordering.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-black font-bold text-center"
      >
        Preparing your order
      </Animatable.Text>

      <Progress.CircleSnail size={60} indeterminate={true} color="black" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
