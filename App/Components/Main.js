import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
}from 'react-native';
const api = require('../Utils/api.js');
const Dashboard = require('../Components/Dashboard.js');

class Main extends React.Component {
   constructor(props)
   {
     super(props);
     this.state = {
       username:'',
       isLoading:false,
       error:false
     }
   }
   handleChange(event)
   {
     this.setState({
       username:event.nativeEvent.text
     });
   }
   handleSubmit(){
     //fetch data from git
     this.setState({
       isLoading:true

     });
     console.log('SUBMIT',this.state.username);
     api.getBio(this.state.username)
     .then((res) => {
       if(res.message === 'Not Found'){
         this.setState({
           error:'User not found',
           isLoading:false
         })
       }
       else {
         this.props.navigator.push({
           title:res[0].owner.login || "Select an option",
           component: Dashboard,
           passProps:{userInfo: res[0].owner,userLg:res[0].owner.login},
         });
         this.setState({
           isLoading:false,
           error:false,
           username: ''
         })

       }
     });
   }
  render() {
    var showErr = (
      this.state.error ? <Text>{this.state.error}</Text> : <View></View>
    );
    return (
     <View style={styles.Maincontainer}>
        <Text style={styles.title}> Search for a User</Text>
        <TextInput
        style={styles.searchInput}
        value={this.state.username}
        onChange={this.handleChange.bind(this)}/>
         <TouchableHighlight
         style={styles.button}
         onPress={this.handleSubmit.bind(this)}
         underlayColor="white">
         <Text style={styles.buttonText}>SEARCH</Text>
         </TouchableHighlight>
         {showErr}
     </View>
   );
  }
}
const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    flexDirection:'column',
    marginTop:65,
    padding:30,
    justifyContent: 'center',
    backgroundColor: '#48BBEC',
  },
  title:{
    marginBottom:20,
    fontSize:25,
    textAlign:'center',
    color:'#fff'
  },
  searchInput:{
    height:50,
    padding:4,
    marginRight:5,
    fontSize:23,
    borderWidth:1,
    borderColor:'black',
    borderRadius:8,
    color:'black'
  },
  button:{
    height:45,
    flexDirection:'row',
    backgroundColor:'white',
    borderColor:'white',
    borderWidth:1,
    borderRadius:8,
    marginBottom:10,
    marginTop:10,
    alignSelf:'stretch',
    justifyContent:'center'
  },
  buttonText:{
    alignSelf:'stretch',
    justifyContent:'center',
    marginTop:15,

  }
});
module.exports = Main;
