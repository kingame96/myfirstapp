import React from 'react' ;
import firebase from 'firebase';

  var todos;
  var items;
  var itemsss = [];

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

var userName123 = getCookie('userName');

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
      this.Logout = this.Logout.bind(this);
    }

    handleDelete(a){
      firebase.database().ref('ToDoList1/'+ userName123 + '/' + a).remove()
    }
    handleSubmit(event) {
      event.preventDefault();
      const itemsArray = this.state.userInput;
      this.setState({
        toDoList: itemsArray
      });
      firebase.database().ref('ToDoList1/' + userName123).push({
        "valueee": this.state.userInput
      });
    }

    handleChange(e) {
      this.setState({
        userInput: e.target.value
      });
    }

    Logout() {
      document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      window.location.reload();
    }

    componentDidMount(){
      firebase.database().ref('ToDoList1/' + userName123).on('value', (dataSnapshot) => {
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
      firebase.database().ref('ToDoList1/' + userName123).once('value')
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
          <button onClick={this.Logout} className="btn btn-primary">Logout</button>
          <ul>
            {this.state.itemss}
          </ul>
        </div>
      );
    }
  };
 
  export default MyToDoList;

