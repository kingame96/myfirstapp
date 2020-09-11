import React from 'react' ;
import firebase from 'firebase';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Logon from './logon'

var firebaseConfig = {
    apiKey: "AIzaSyBIHX8ZyuVx4trAU1R43OjIaPHRGr6q1g4",
    authDomain: "kingame-project.firebaseapp.com",
    databaseURL: "https://kingame-project.firebaseio.com",
    projectId: "kingame-project",
    storageBucket: "kingame-project.appspot.com",
    messagingSenderId: "223723811224",
    appId: "1:223723811224:web:87fb2a999331401f477bed"
  };
firebase.initializeApp(firebaseConfig);
var name = [];
firebase.database().ref('ToDoList/').once('value').then(
    (dataSnapshot) => {
        name = Object.keys(dataSnapshot.val());
    }
)



class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            userNamee: '',
            userPassWord: '',
            isLogon: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.userName = this.userName.bind(this)
        this.passWord = this.passWord.bind(this)
    }
    userName(e){
        this.setState({
            userNamee: e.target.value
          });
    }

    passWord(e){
        this.setState({
            userPassWord: e.target.value
          });
    }

    handleSubmit(event){
        event.preventDefault();
        const checkUserName = this.state.userNamee;
        const checkPassWord = this.state.userPassWord;

        for(var i = 0; i < name.length ;i++) {
            if(name[i] === checkUserName) {
                alert("Tai khoan da co nguoi su dung. Vui long tao tai khoan khac");
                return;
            }
        }

        if((checkUserName !== '') & (checkPassWord !== '')) {
            firebase.database().ref('ToDoList/'+this.state.userNamee).set({
                "password" : this.state.userPassWord
            })
            alert("tao tai khoan thanh cong");
            this.setState({
                isLogon: true
            })
        } else {
            alert("tai khoan hoac mat khau ko dc de trong")
        }

    }

    render(){
        if(this.state.isLogon === true) {
            return(
                <BrowserRouter>
                    <Redirect to="/"></Redirect>
                    <Route exact path="/" component={Logon} />
                </BrowserRouter>
            )
        }
        return(

            <div>
                <p>Register</p>
                <p>User Name</p>
                <input
                    onChange={this.userName}
                    value={this.state.userNamee}
                    className="form-control"
                    required="required"/><br />
                <p>Pass Word</p>
                <input
                    onChange={this.passWord}
                    value={this.state.userPassWord}
                    className="form-control"
                    required
                    /><br />
                <button onClick={this.handleSubmit} className="btn btn-primary btn-lg">Submit</button>
            </div>

        );
    }
};

export default Register;