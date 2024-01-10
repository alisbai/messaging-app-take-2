import React from "react";
import { Image, SafeAreaView, Text, View } from "react-native";

import AuthButton from "../../components/AuthButton";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "../../styles/index.styles";
import gettingStartedImage from "../../assets/images/getting-started-img.png";

function Welcome({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Image source={gettingStartedImage} />

      <View style={styles.textContainer}>
        <Text style={styles.title}>Never get lost with FYE</Text>

        <Text style={styles.subtitle}>
          The first-year experience phone app is all you need to have a smooth
          and stress-free experience during your stay at AUI
        </Text>
      </View>

      <AuthButton
        value={"Get Started"}
        onPress={() => navigation.navigate("Register")}
      />
    </SafeAreaView>
  );
}

export default Welcome;
