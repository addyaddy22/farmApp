import React, { useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";


type CustomHeaderProps = {
  title?: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title }) => {
  const [visible, setVisible] = useState(false);


  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = () => {
    closeMenu();
    // Add your logout logic here
    router.push("/home");
    Alert.alert("Logged Out", "You have been logged out successfully.");
  };

  return (
    <Appbar.Header>
      {/* Logo on the left */}
      <Image
        source={require("../assets/images/farm_logo.jpeg")} // Replace with your logo path
        style={styles.logo}
      />
      <Appbar.Content title={title} />
      {/* Logout icon with dropdown */}
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Appbar.Action icon="logout" color="white" onPress={openMenu} />
        }
      >
        <Menu.Item onPress={handleLogout} title="Logout" />
      </Menu>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
});

export default CustomHeader;