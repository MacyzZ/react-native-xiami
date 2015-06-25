'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Animation = require('AnimationExperimental');
var {width ,height} = Dimensions.get('window');
var {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet
} = React;

class SongCell extends React.Component {
  render() {
    var song = this.props.song;
    return (
      <View style={styles.pdcontainer}>
        <TouchableHighlight onPress={this.props.onHandleSelect}>
          <Image source={{uri:song.cover}} style={styles.thumbnail} />
        </TouchableHighlight>
        <View style={styles.info}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.author}>{song.author}</Text>
        </View>
      </View>
    )
  }
}

var styles = {
  pdcontainer: {
    width: width/2 - 1,
  },
  info: {
    width: width/2 - 1,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  thumbnail: {
    width: width/2 - 1,
    height: width/2 - 1,
  },
  title: {
    fontSize: 12,
  },
  author: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 4
  },

}

module.exports = SongCell;
