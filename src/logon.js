import React from 'react' ;
import firebase from 'firebase';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Register from './login'
import MyToDoList from './app';


var name = [];
var password = '';
export var excuName = '';

firebase.database().ref('ToDoList/').once('value').then(
    (dataSnapshot) => {
        name = Object.keys(dataSnapshot.val());
    }
)

class Logon extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            userNamee:'',
            userPassWord: '',
            isRegister: false,
            isData: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.userName = this.userName.bind(this)
        this.passWord = this.passWord.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleRegister(){
        this.setState({
            isRegister: true
        })
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



    handleSubmit(){
        const checkpass = this.state.userPassWord;
        for(var i = 0; i < name.length ;i++) {
            const checkname = this.state.userNamee;
            if(name[i] === checkname) {
                excuName = name[i];
            }
        }
        if(excuName === '') {
            alert("sai tai khoan")
        } else {
            firebase.database().ref('ToDoList/'+ excuName).once('value').then(
                (dataSnapshot) => {
                    const value = dataSnapshot.val();
                    password = value.password;
                    if(checkpass !== password) {
                        alert("sai mat khau")
                    } 
                    else{
                        this.setState({
                            isData: true
                        })
                    }
                }
            )
        }


    }

    render(){
        if(this.state.isData === true) {
            return(
                <div>
                    <BrowserRouter>
                    <Redirect to="/home" ></Redirect>
                    <Route exact path="/home" component={MyToDoList} />
                    </BrowserRouter>
                </div>
            )
        }
        if(this.state.isRegister === true) {
            return(
                <div>
                    <BrowserRouter>
                    <Redirect to="/register" ></Redirect>
                    <Route exact path="/register" component={Register} />
                    </BrowserRouter>
                </div>
            )
        }
        return(
            <div>
                <p>User Name</p>
                <input type="text"
                    onChange={this.userName}
                    value={this.state.userNamee}
                    /><br />
                <p>Pass Word</p>
                <input type="text"
                    onChange={this.passWord}
                    value={this.state.userPassWord}
                    /><br />
                <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                <br />
                <button onClick={this.handleRegister} className="btn btn-primary">Register</button>
            </div>
        );
    }
};

export default Logon