import React from 'react';
import{
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Text,
  TextInput
} from 'react-native';
const api=require('../Utils/api.js');
const Badge=require('../Components/Badge.js');
class Notes extends React.Component {
  constructor(props)
  {
    super(props)
    this.ds = new ListView.DataSource({rowHasChanged: (row1,row2) => row1 !== row2});
    this.state ={
      dataSource:this.ds.cloneWithRows(this.props.notes),
      note:'',
      error:''
    }
  }
  renderRow(rowData){
    return(
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <View style={styles.seperator}></View>
      </View>
    )
  }
  handleChange(e){
    this.setState({
      note:e.nativeEvent.text
    });
  }
  handleSubmit(){
    var note = this.state.note;
    this.setState({
      note:''
    })
    console.log('NOTEUSER',this.props.userLg)
    api.addNotes(this.props.userLg,note)
    .then((data) => {
      api.getNotes(this.props.userLg)
      .then((data) => {
        this.setState({
          // dataSource:this.ds.cloneWithRows(data);
        })
      })
    }).catch((err) => {
      console.log('Request failed',err);
      this.setState({error});
    });
  }
  footer(){
    return(
      <View style={styles.footerContainer}>
         <TextInput
            style={styles.searchInput}
            placeholder="New Note"
            value={this.state.note}
            onChange={this.handleChange.bind(this)}/>
        <TouchableHighlight
        style={styles.button}
        onPress={this.handleSubmit.bind(this)}
        underlayColor="#88D4F5">
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    )
  }


  render() {
    return(
      <View style={styles.container}>
         <ListView
         dataSource={this.state.dataSource}
         renderRow={this.renderRow}
         renderHeader={() => <Badge userInfo={this.props.userInfo}/>} />
         {this.footer}
      </View>
    )
  }
};
Notes.propTypes ={
  userInfo:React.PropTypes.object.isRequired,
  notes:React.PropTypes.object.isRequired
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row'
  },
  buttonText:{
    fontSize:18,
    color:'white'
  },
  button:{
    height:60,
    backgroundColor:'#48BBEC',
    flex:3,
    alignItems:'center',
    justifyContent:'center'
  },
  searchInput:{
    height:60,
    padding:10,
    fontSize:18,
    color:'#111',
    flex:10
  },
  rowContainer:{
    padding:10
  },
  footerContainer:{
    backgroundColor:'#E3E3E3',
    alignItems:'center',
    flexDirection:'row'
  },
  seperator:{
    height:1,
    flex:1,
    backgroundColor:'#E4E4E4',
    marginLeft:15
  }
})
module.exports = Notes;
