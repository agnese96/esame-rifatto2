import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet, FlatList } from 'react-native';
import {
  Content,
  Text,
  Spinner,
  Right,
  Button,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';

import CardElement from './CardElement';


export default class FavoritesList extends Component {
  
  render() {
    console.log(this.props);
    return (
        <Content>
          {this.props.loading ? (
            <Spinner color="blue" />
          ) : (
            <FlatList
              data={this.props.data}
              renderItem={obj => <CardElement item={obj.item} onPress={this.props.onDetails}/>}
              keyExtractor={item => item.id}
            />
          )}
        </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});