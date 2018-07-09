import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, AsyncStorage, View } from "react-native";
const REMOTE_FAVORITES_URL =
  "http://www.dmi.unict.it/~calanducci/LAP2/favorities.json";
import { createStackNavigator } from "react-navigation";

import ListComponent from "../components/ListComponent";
import Details from "../screens/Details";

class PrivateFavorites extends Component {
  // va aggiunta tutta la roba per l'header con react navigation
  state = {
    list: [],
    loading: true
  };
  componentWillMount() {
    this.getFavorites();
  }
  render() {
    return (
      <View style={styles.container}>
        <ListComponent
          data={this.state.list}
          loading={this.state.loading}
          onDetails={this._details}
        />
      </View>
    );
  }
  async getFavorites() {
    try {
      const value = await AsyncStorage.getItem("places");
      if (value != null) {
        console.log("trovato asyncstorage");
        this.setState({ list: JSON.parse(value), loading: false });
      }
      throw "Places not found";
    } catch (err) {
      console.log(err);
      this.getRemoteFavorites();
    }
  }

  getRemoteFavorites = () => {
    fetch(REMOTE_FAVORITES_URL).then(response =>
      response.json().then(res => {
        this.setState({ list: res.data, loading: false });
        AsyncStorage.setItem("places", JSON.stringify(res.data));
      })
    );
  };
  // la navigate deve essere chiamata qui, la passiamo come callback così che può essere chiamata dal pulsante
  _details = id => {
    const item = this.state.list.find(item => item.id === id);
    console.log("private", item);
    this.props.navigation.navigate("Details", { item });
  };
}

export default createStackNavigator(
  {
    Home: {
      screen: PrivateFavorites
    },
    Details: {
      screen: Details
    }
  },
  {
    headerMode: "none",
    initialRouteName: "Home"
  }
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  }
});
