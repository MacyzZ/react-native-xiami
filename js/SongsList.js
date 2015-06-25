'use strict';

var React = require('react-native');
var Dimensions = require('Dimensions');
var Animation = require('AnimationExperimental');
var {width ,height} = Dimensions.get('window');
var {
  ActivityIndicatorIOS, 
  Image,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
} = React;

var SongCell = require('./SongCell');
//TODO:
//var SongScreen = require('./SongScreen');

class SongsList extends React.Component {

  constructor(props) {
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      data: [],
      isLoading: false,
      loaded: false,
      hasMore: true
    };
    this.title = 'once';
    this.page = 1;
    this.updateUrl(this.title,this.page);
  }

  componentDidMount() {
    //this.fetchData(true);
  }
  
  fetchData(isSearch) {
    if (isSearch) this.setState({isLoading: true});
    console.log(this.REQUEST_URL)
    fetch(this.REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData === null) {
          this.setState({hasMore: false});
          return
        }
        var data = isSearch?responseData:this.state.data.concat(responseData);
        this.setState({
          data: data,
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true,
          isLoading: false
        });
      })
      .then(() => {
        if (isSearch) {
          Animation.startAnimation({
            node: this.refs.list, 
            duration: 1000, 
            easing: 'linear', 
            property: 'opacity',
            toValue: 1,
          });
        }
      })
      .done();

  }

  updateUrl(title, page) {
    this.REQUEST_URL = `http://www.xiami.com/web/search-songs/key/${title}/page/${page}`;
  }

  selectProduct(product: Object) {
    //TODO: native audio play page
    /*
    this.props.navigator.push({
      title: song.name,
      component: SongScreen,
      passProps: {song}
    });
    */
  }

  onEndReached() {
    console.log('end')
    if (!this.state.hasMore) {
      return
    }
    this.page++;
    this.updateUrl(this.title,this.page);
    this.fetchData(false)

  }
  
  onSubmitEditing(event: Object) {
    this.title = event.nativeEvent.text;
    this.page=1
    this.updateUrl(this.title,this.page);
    this.fetchData(true);
    if (this.refs.list) {
      console.log(this.refs.list.getScrollResponder())
      this.refs.list.getScrollResponder().scrollTo(0, 0)
      //this.refs.list.refs.listviewscroll.scrollTo(0,0);
    }
  }

  render() {
    if (!this.state.loaded && !this.state.isLoading) {
      return this.renderSearchBar();
    }
    if (!this.state.loaded && this.state.isLoading) {
      return this.renderLoadingView();
    }
    console.log(this.state.dataSource)

    return (
      <View style={styles.container}>
        <SearchBar onSubmitEditing={this.onSubmitEditing.bind(this)} />
        <View style={styles.separator} />
        <ListView
          ref='list'
          dataSource={this.state.dataSource}
          renderRow={this.renderSong.bind(this)}
          contentContainerStyle={styles.box}
          automaticallyAdjustContentInsets={false}
          //keyboardDismissMode="onDrag"
          //keyboardShouldPersistTaps={true}
          showsVerticalScrollIndicator={false}
          onEndReached={this.onEndReached.bind(this)}
        />
      </View>
    );
  }

  renderSearchBar() {
    return (
      <View style={styles.container}>
        <SearchBar onSubmitEditing={this.onSubmitEditing.bind(this)} />
        <View style={styles.separator} />
      </View>
    )
  }
  
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <SearchBar onSubmitEditing={this.onSubmitEditing.bind(this)} />
        <View style={styles.separator} />
        <View style={styles.normalContainer}>
          <ActivityIndicatorIOS size='large'/>
        </View>
      </View>
    )
  }

  renderSong(song: Object) { 
    
    return (
      <SongCell 
        onHandleSelect={() => this.selectProduct(song)}
        song={song}  
      />
    )
  }

}

class SearchBar extends React.Component {
  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          clearButtonMode="while-editing"
          autoCorrect={false}
          keyboardType="web-search"
          //onChange={this.props.onSearchChange}
          //onEndEditing={this.props.onEndEditing}
          onSubmitEditing={this.props.onSubmitEditing}
          placeholder="Search a song..."
          //onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
      </View>
    ); 
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  box: {
    flexDirection: 'row',
    backgroundColor : '#eeeeee',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  normalContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
});

module.exports = SongsList;
