import React, { Component } from 'react';
import { Constants } from 'expo';
import { StyleSheet } from 'react-native';
import { Container, Header, Body, Title, Content, Text } from 'native-base';

export default class Login extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Login</Title>
          </Body>
        </Header>

        <Content>
          <Text> Login </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
