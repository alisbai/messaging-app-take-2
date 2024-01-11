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
        <Text style={styles.title}>Chat Savvy</Text>

        <Text style={styles.subtitle}>
          Make friend from home, join our chatroom where you can meet wonderful
          friends
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
