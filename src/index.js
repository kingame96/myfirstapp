import React from 'react' ;
import ReactDOM from 'react-dom' ;
import firebase from 'firebase';

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

const textAreaStyles = {
    width: 235,
    margin: 5
  };

  var todos;
  var items;
  var itemsss;

  class MyToDoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userInput: '',
        toDoList: '',
        itemss: []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit() {
      const itemsArray = this.state.userInput;
      this.setState({
        toDoList: itemsArray
      });
      firebase.database().ref('ESP8266/number').push({
        "valueee": this.state.userInput
      });
    }
    handleChange(e) {
      this.setState({
        userInput: e.target.value
      });

    }
    componentWillMount(){
      firebase.database().ref('ESP8266/number').once('value')
      .then((dataSnapshot) => {
        const value = dataSnapshot.val();
        todos = Object.keys(value).map((key) => value[key]);     
        items = todos.map(i => i['valueee']);
        itemsss = items.map(i => <li>{i}</li>)
        this.setState({
          itemss: itemsss
        })
      }
      );
    }

    render() {   
     return (
        <div>
          <textarea
            onChange={this.handleChange}
            value={this.state.userInput}
            style={textAreaStyles}
            placeholder="Separate Items With Commas" /><br />
          <button onClick={this.handleSubmit}>Create List</button>
          <h1>My "To Do" List:</h1>
          <ul>
            {this.state.itemss}
            <li>{this.state.toDoList}</li>
          </ul>
        </div>
      );
    }
  };
  
  ReactDOM.render(<MyToDoList />, document.getElementById("root"));
