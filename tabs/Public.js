import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Body, Title, Button, Right, Content, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
const REMOTE_FAVORITES_URL ='http://www.dmi.unict.it/~calanducci/LAP2/favorities.json';
import { createStackNavigator } from 'react-navigation';
import ListComponent from '../components/ListComponent';
import Details from '../screens/Details';
import * as firebase from 'firebase';

class PublicFavorites extends Component {
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
            <Title>Public places</Title>
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
    async getFavorites() {
        firebase.database().ref('public').on('value',snap => {
            let list = [];
            snap.forEach(child => {
              list.push({
                ...child.val()
              });
            })
            this.setState({list, loading: false})
          })
    }
    
    _details = (id) => {
        const item = this.state.list.find(item => item.id===id)
        console.log('private',item);
        this.props.navigation.navigate('Details',{item});
    }
}

export default createStackNavigator({
    Home: {
        screen: PublicFavorites
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
