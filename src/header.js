import React from 'react' ;
import {userName123} from './index'

class Header extends React.Component {
    render() {
        if(userName123 !== "") {
            return(
                <div>
                    Hello, {userName123}
                </div>
            );
        }
        else {
            return(
                <div>
                    My ToDo List
                </div>
            );
        }
        }
    };

export default Header;