import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Button, Right, Content, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
const REMOTE_FAVORITES_URL ='http://www.dmi.unict.it/~calanducci/LAP2/favorities.json';
import { createStackNavigator } from 'react-navigation';

import ListComponent from '../components/ListComponent';
import Details from '../screens/Details';

class PrivateFavorites extends Component {
  state = {
      list: [],
      loading: true
  }
    componentWillMount() {
        this.getFavorites();
      }
  render() {
    return (
        <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Your favorite places</Title>
          </Body>
          <Right>
            <Button transparent onPress={this._navToAdd}>
              <MaterialIcons name='add' size={25} color='white' />
            </Button>
          </Right>
        </Header>
      
        <Content>
          <ListComponent data={this.state.list} loading={this.state.loading} onDetails={this._details}/>
        </Content>
      </Container>
    );
  }
    getFavorites() {
        this.getRemoteFavorites();
    }

    getRemoteFavorites = () => {
        fetch(REMOTE_FAVORITES_URL).then(response =>
          response.json().then(res => {
            this.setState({ list: res.data, loading: false });
            //AsyncStorage.setItem('places', JSON.stringify(res.data));
          })
        );
      };
    
    _details = (id) => {
        const item = this.state.list.filter(item => item.id===id)
        this.props.navigation.navigate('Details',{item});
    }
}

export default createStackNavigator({
    Home: {
        screen: PrivateFavorites
    },
    Details: {
        screen: Details
    }
},{
    headerMode: 'none',
    initialRouteName: 'Home'
});


const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
