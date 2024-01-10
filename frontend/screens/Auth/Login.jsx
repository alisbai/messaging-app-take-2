import React, { useContext, useState } from "react";
import * as Device from "expo-device";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import logo from "../../assets/images/logo.png";
import AuthButton from "../../components/AuthButton";
import InputError from "../../components/InputError";
import { AuthContext } from "../../context/AuthContext";
import { globalStyles } from "../../styles/global.styles";
import { styles } from "./Auth.styles";

function Login({ navigation }) {
  const { authenticate, isLoading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = () => {
    authenticate({
      action: "login",
      setErrors,
      email,
      password,
      device_name: Device.deviceName,
    });
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <Image source={logo} />

      <View style={styles.inputsContainer}>
        <View>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.inputStyle}
            placeholder="Email"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <InputError error={errors.email} />
        </View>

        <View>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.inputStyle}
            placeholder="Password"
            secureTextEntry={true}
          />
          <InputError error={errors.password} />
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <AuthButton
          value={"Login"}
          onPress={() => onSubmit()}
          isLoading={isLoading}
        />

        <View style={styles.alreadyHaveAccountContainer}>
          <Text style={styles.already}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signInText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
