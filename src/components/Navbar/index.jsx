import React, {Component} from "react";
import "./_navbar.sass";

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggleSidebar: false
        };
        this.toggleSidebarDisplay = this.toggleSidebarDisplay.bind(this);
    }
    toggleSidebarDisplay() {
        this.setState(prevState => ({
            toggleSidebar: !prevState.toggleSidebar
        }));
        this.props.toggleSidebar(this.state.toggleSidebar);
    }
    render(){
      return (
          <div className="navbar">
              <i className="fa fa-bars" onClick={this.toggleSidebarDisplay}/>
          </div>
      );
    }
}

export default Navbar;
