import React from 'react' ;
import ReactDOM from 'react-dom' ;
import Logon from "./logon";
import MyToDoList from "./App";
import Header from "./header";



function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}


export var userName123 = getCookie('userName');
console.log(userName123);

if(userName123 !== "")
ReactDOM.render(<MyToDoList />, document.getElementById("logon"));
else ReactDOM.render(<Logon />, document.getElementById("logon"));
ReactDOM.render(<Header />, document.getElementById("header"));
