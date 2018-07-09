import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { Font } from "expo";

import Public from "./tabs/Public";
import Private from "./tabs/Private";
import * as firebase from "firebase";

export default class Home extends Component {
  state = {
    loading: true
  };
  async componentWillMount() {
    let config = {
      apiKey: "AIzaSyClhlrX24AECRXdq1nZvhEGdwC7BHymnNQ",
      authDomain: "myfavorities-49de3.firebaseapp.com",
      databaseURL: "https://myfavorities-49de3.firebaseio.com",
      projectId: "myfavorities-49de3",
      storageBucket: "myfavorities-49de3.appspot.com",
      messagingSenderId: "212535012908"
    };
    if (firebase.apps.length == 0) firebase.initializeApp(config);
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    return this.state.loading ? (
      <ActivityIndicator />
    ) : (
      <MaterialTabNavigator />
    );
  }
}

const MaterialTabNavigator = createMaterialBottomTabNavigator(
  {
    Public: { screen: Public },
    Private: { screen: Private }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Public":
            iconName = "chat-bubble";
            break;
          case "Private":
            iconName = "person-add";
            break;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <MaterialIcons name={iconName} size={25} color={tintColor} />;
      }
    }),
    initialRouteName: "Public",
    labeled: true,
    barStyle: { backgroundColor: "#3F51B5" },
    tabBarOptions: {
      activeTintColor: "#3F51B5",
      inactiveTintColor: "gray"
    },
    shifting: true
  }
);
