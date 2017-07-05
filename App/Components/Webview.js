import React from 'react';
import{
  View,
  StyleSheet,
  WebView
} from 'react-native';

class Webview extends React.Component {
  render() {
    return(
        <View style={styles.container}>
           <WebView url={this.props.url}/>
        </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flexDirection:'column',
    backgroundColor:'#F6F6EF',
    flex:1
  }
});

Webview.propTypes = {
  url:React.PropTypes.string.isRequired
}

module.exports = Webview;
