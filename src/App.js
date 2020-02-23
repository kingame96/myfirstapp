import React from 'react' ;
import firebase from 'firebase';
import {excuName} from './logon'

  var todos;
  var items;
  var itemsss = [];


  class MyToDoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        userInput: '',
        toDoList: '',
        itemss: [],
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleDelete(a){
      firebase.database().ref('ToDoList1/'+ excuName + '/' + a).remove()
    }
    handleSubmit(event) {
      event.preventDefault();
      const itemsArray = this.state.userInput;
      this.setState({
        toDoList: itemsArray
      });
      firebase.database().ref('ToDoList1/' + excuName).push({
        "valueee": this.state.userInput
      });
    }

    handleChange(e) {
      this.setState({
        userInput: e.target.value
      });
    }

    componentDidMount(){
      firebase.database().ref('ToDoList1/' + excuName).on('value', (dataSnapshot) => {
        const value = dataSnapshot.val();

        if(value != null) {

        todos = Object.keys(value).map((key) => value[key]); 

        const Id = Object.keys(value);

        items = todos.map(i => i['valueee']); 

        //itemsss = items.map(i => <li>{i}</li>)

        for(var i = 0; i < items.length; i++){

          itemsss[i] =<div>
            <li>{items[i]}</li>
            <button onClick={this.handleDelete.bind(this, Id[i])} className="btn btn-danger">Delete</button>
          </div>
        }
        
        this.setState({
          itemss: itemsss
        })
        }    
        console.log(this.state.itemss)   
      }
      );
      firebase.database().ref('ToDoList1/' + excuName).once('value')
      .then((dataSnapshot) => {

        const value = dataSnapshot.val();

        if(value != null) {

        todos = Object.keys(value).map((key) => value[key]); 

        const Id = Object.keys(value);

        items = todos.map(i => i['valueee']); 

        //itemsss = items.map(i => <li>{i}</li>)

        for(var i = 0; i < items.length; i++){

          itemsss[i] =<div>
            <li>{items[i]}</li>
            <button onClick={this.handleDelete.bind(this, Id[i])} className="btn btn-danger">Delete</button>
          </div>
        }
        
        this.setState({
          itemss: itemsss
        })
        }       
      }
      );
    }

    

    render() {   
     return (
        <div className="mainArea">
          <textarea
            onChange={this.handleChange}
            value={this.state.userInput}
            /><br />
          <button onClick={this.handleSubmit} className="btn btn-primary">Create List</button>
          <ul>
            {this.state.itemss}
          </ul>
        </div>
      );
    }
  };
 
  export default MyToDoList;

