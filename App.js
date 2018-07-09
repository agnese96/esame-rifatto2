import { MaterialIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import React, { Component } from 'react';
import { Font } from 'expo';
import Public from './tabs/Public';
import Private from './tabs/Private';
import { Spinner } from 'native-base'

export default class Home extends Component {
  state = {
    loading: true
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({loading: false});
  }
  render() {
    return this.state.loading ? <Spinner></Spinner> : <MaterialTabNavigator />
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
          case 'Public':
            iconName = 'chat-bubble';
            break;
          case 'Private':
            iconName = 'person-add';
            break;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <MaterialIcons name={iconName} size={25} color={tintColor} />;
      },
    }),
    initialRouteName: 'Public',
    labeled: true,
    barStyle: { backgroundColor: '#3F51B5' },
    tabBarOptions: {
      activeTintColor: '#3F51B5',
      inactiveTintColor: 'gray',
    },
    shifting: true,
  }
);