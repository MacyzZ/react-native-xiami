/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  StatusBarIOS,
} = React;

var SongsList = require('./js/SongsList');

class Xiami extends React.Component {

  render() {
    
    StatusBarIOS.setStyle(StatusBarIOS.Style.lightContent)

    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor='#f57614'
        titleTextColor='#fff'
        initialRoute={{
          title: '搜索歌曲',
          component: SongsList
        }}
      />      
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('Xiami', () => Xiami);
