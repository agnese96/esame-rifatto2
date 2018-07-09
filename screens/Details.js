import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet,Image } from 'react-native';
import { Container, Header, Body, Title, Content, Text, Left, Button, Right } from 'native-base';

export default class Details extends Component {
  render() {
    const {item} = this.props.navigation.state.params;
    console.log(item);
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Details</Title>
          </Body>
          <Left>
            <Button transparent onPress={this.props.navigation.goBack}>
              <Text>Indietro</Text>
            </Button>
          </Left>
        </Header>

        <Content>
        <Image source={{ uri: item.img }} style={styles.image} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  }
});
