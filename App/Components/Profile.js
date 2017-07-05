import React from 'react';
import{
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
const Badge = require('../Components/Badge.js');

class Profile extends React.Component {
  getRowTitle(user,item){
    item = (item === 'id') ? item.replace('_',' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) :item ;
  }
  render() {
       var userInfo = this.props.userInfo;
       var topicArr = ['id','type','html_url'];
       var list = topicArr.map((item,index) =>{
            if(!userInfo[item]){
              return <View key={index} />
            }
            else {
              return(
              <View key={index}>
                <View tyle={styles.rowContainer}>
                <Text style = {styles.rowTitle}>{this.getRowTitle(userInfo,item)}</Text>
                <Text style = {styles.rowContainer}>{userInfo[item]}</Text>
                </View>
              <View style={styles.seperator}></View>
              </View>
              )
            }
       });
       return(
       <ScrollView style={styles.container}>
          <Badge userInfo={this.props.userInfo}/>
          {list}
       </ScrollView>
     )
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  buttonText:{
    color:'white',
    fontSize:18,
    alignSelf:'center'
  },
  rowContainer:{
    padding:10
  },
  rowTitle:{
    fontSize:16,
    color:'#48BBEC',
    marginLeft:10
  },
  rowContent:{
    fontSize:19
  },
  seperator:{
    height:1,
    flex:1,
    backgroundColor:'#E4E4E4',
    marginLeft:15
  }

});


module.exports = Profile;
