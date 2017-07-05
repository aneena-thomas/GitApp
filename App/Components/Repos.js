import React from 'react';
import{
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

const Badge = require('../Components/Badge.js');
const Webview = require('../Components/Webview.js');
class Repos extends React.Component {
  openPage(url){
    console.log('the url ',url);
    this.props.navigator.push({
    component:Webview,
    title:'Web View',
    passProps:{url}
   });
  }
  render() {

    var repos = this.props.repos;
    var list = repos.map((item,index) =>{
      var desc = repos[index].description ? <Text style={styles.description}>{repos[index].description}</Text> : <View />;
      return(
        <View key={index}>
          <View style={styles.rowContainer}>
           <TouchableHighlight
             onPress={this.openPage.bind(this,repos[index].html_url)}
             underlayColor='transparent'>
             <Text style={styles.name}>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>{repos[index].stargazers_count}</Text>
            {desc}
            <View style={styles.seperator}></View>
          </View>
        </View>
      )
    })
    return(
        <ScrollView style ={styles.container}>
           <Badge userInfo={this.props.userInfo}/>
           {list}
        </ScrollView>
    )
  }
};
Repos.propTypes ={
  userInfo:React.PropTypes.object.isRequired,
  repos:React.PropTypes.array.isRequired
};
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  rowContainer:{
    flexDirection:'column',
    flex:1,
    padding:10
  },
  name:{
    color:'#48BBEC',
    fontSize:18,
    paddingBottom:5
  },
  stars:{
    color:'#48BBEC',
    fontSize:14,
    paddingBottom:5
  },
  description:{
    fontSize:14,
    paddingBottom:5
  },
  seperator:{
    height:1,
    flex:1,
    backgroundColor:'#E4E4E4',
    marginLeft:15
  },
  webstyle:{
    flex:1,
    backgroundColor:'#F6F6EF',
    flexDirection:'column'
  }
});

module.exports = Repos;
