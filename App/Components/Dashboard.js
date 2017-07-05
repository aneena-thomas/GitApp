import React,{ Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';
const Badge = require('../Components/Badge.js');
const api = require('../Utils/api.js');
const Profile = require('../Components/Profile.js');
const Repos = require('../Components/Repos.js');
const Notes = require('../Components/Notes.js');

class Dashboard extends React.Component {

  goToProfile(){
       console.log('Going to profile');

           this.props.navigator.push({
             title:""|| "Select an option",
             component: Profile,
             passProps:{userInfo:this.props.userInfo}
           });

  }
  goToRepos(){
    console.log('Going to Repo');
    console.log('UERLOG',this.props.userLg);
    api.getRepos(this.props.userLg)
    .then((res) =>{
    this.props.navigator.push({
      title:""|| "Select an option",
      component: Repos,
      passProps:{
        userInfo:this.props.userInfo,
        repos:res
      }

     });
    });
  }
  goToNotes(){
    console.log('Going to notes');
    api.getNotes(this.props.userLg)
    .then((res) =>{
      res = res || {};
      this.props.navigator.push({
        component:Notes,
        title:'Notes',
        passProps:{
          notes:res,
          userInfo:this.props.userInfo
        }
      })
    });

  }
  render() {
    return(
      <View style={styles.container}>
      <Image source={{uri:this.props.userInfo.avatar_url}} style={styles.image}/>
       <TouchableHighlight
         style={styles.highStyle1}
         onPress={this.goToProfile.bind(this)}
         underlayColor='#88D4F5'>
           <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
        style={styles.highStyle2}
          onPress={this.goToRepos.bind(this)}
          underlayColor='#88D4F5'>
            <Text style={styles.buttonText}>View Repos</Text>
         </TouchableHighlight>
         <TouchableHighlight
         style={styles.highStyle3}
           onPress={this.goToNotes.bind(this)}
           underlayColor='#88D4F5'>
             <Text style={styles.buttonText}>View Notes</Text>
          </TouchableHighlight>
      </View>
    )
  }
};
var styles = StyleSheet.create({
  container:{
    marginTop:65,
    flex: 1
  },
  image:{
    height:350
  },
  buttonText:{
    fontSize:24,
    color:'black',
    alignSelf:'center'
  },
  highStyle1:{
    backgroundColor:'#E77AAE',
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent:'center',
    flex:1
  },
  highStyle2:{
    backgroundColor:'#758BF4',
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent:'center',
    flex:1
  },
  highStyle3:{
    backgroundColor:'#E77AAE',
    flexDirection:'row',
    alignSelf:'stretch',
    justifyContent:'center',
    flex:1
  }
});
module.exports = Dashboard;
