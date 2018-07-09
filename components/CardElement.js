import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card, CardItem, Text, H2, Left, Right, Badge } from 'native-base';

export default class CardElement extends Component {
  render() {
    const { item } = this.props;
    return (
      <Card style={styles.container} >
        <CardItem cardBody button onPress={this._press}>
          <Image source={{ uri: this.props.item.img }} style={styles.image} />
        </CardItem>
        <CardItem style={styles.description} button onPress={this._press}>
          <H2>{item.name}</H2>
          <Text>{item.address}</Text>
        </CardItem>
        <CardItem cardBody style={styles.tags} button onPress={this._press}>
          {item.tags.map(this.renderTag)}
        </CardItem>
      </Card>
    );
  }

  renderTag(tag) {
    return (
      <Badge style={styles.tag} info>
        <Text>{tag}</Text>
      </Badge>
    );
  }
  _press = () => {
      this.props.onPress(this.props.item);
  }
  
  
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  image: {
    height: 200,
    width: null,
    flex: 1,
  },
  description: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  tags: {
    padding: 15,
    paddingBottom: 25,
  },
  tag: {
    marginRight: 8
  }
});