import React from "react";
import namor from "namor";
/*import "./index.css";*/

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  
  /* fetch('http://localhost:3400/api/users/getallnaiccodes')
  .then(response => {
    if(response.status == 200){
      return response.json();
    }
  })
  .then(function(apidata) {    
    //console.log("Api data",  apidata.naiccodes);
    return apidata;
  }); */ 
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

/* export function makeData(len = 100) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
} */


export function makeData(len = 10) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
} 

