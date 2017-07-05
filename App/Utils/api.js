import React from 'react';
var api = {
  getBio(username){
    username = username;
    // var url = 'https://api.github.com/users/${username}/repos';
    var url = "https://api.github.com/users/"+username+"/repos";

    console.log('SUBMIT',url);

    return fetch(url).then((res) => res.json());
  },
  getRepos(username){
    username = username;
    var url = "https://api.github.com/users/"+username+"/repos";
    return fetch(url).then((res) => res.json());
  },
  getNotes(username){
    username=username;
    var url="https://gitapp-5bf41.firebaseio.com/"+username+".json";
    console.log('SUBMITNOTE',url);

    return fetch(url).then((res) => res.json());
  },
  addNotes(username,note){
     username=username;
     var url="https://gitapp-5bf41.firebaseio.com/"+username+".json";
     return fetch(url,{
       method:'post',
       body:JSON.stringify(note)
     }).then((res) => res.json());
  }
};
module.exports = api;
