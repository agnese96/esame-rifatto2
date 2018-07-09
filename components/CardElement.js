import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card, CardItem, Text, H2, Left, Right, Badge } from 'native-base';

export default class CardElement extends Component {
  render() {
    const { item } = this.props;
    const img = this.props.item.img || require('../assets/icon.png');
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
          {item.tags ? item.tags.map(this.renderTag): <Text>Nessun tag</Text>}
        </CardItem>
      </Card>
    );
  }

  renderTag(tag, index) {
    return (
      <Badge style={styles.tag} info key={index}>
        <Text>{tag}</Text>
      </Badge>
    );
  }
  _press = () => {
      this.props.onPress(this.props.item.id);
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