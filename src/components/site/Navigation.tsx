import * as React from 'react';
import { Component } from 'react';
import {
  Collapse,
  NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  //NavLink,
  NavbarBrand,
  //NavbarText,
  Button
} from 'reactstrap';
import logo from '../../assets/logo.svg'


interface NavigationProps {
  clearSessionToken: () => void;
  sessionToken: string;
  updateSessionToken: (newToken: string) => void;
}
 
interface NavigationState {
  isOpen: boolean
}
 
class Navigation extends Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }
  toggleNavbar=()=>{
    this.setState({
      isOpen:!this.state.isOpen
    })
  }
  
  logout=()=>{

  }
    render() {
        return ( 
            <Navbar light>
            <NavbarBrand
             style={{ marginLeft: "1em"}}>
                <img src={logo} alt="nedge logo" height="32px" width="32px"></img>
            </NavbarBrand>
            
            <NavbarToggler
              onClick={this.toggleNavbar}
              className="mr-2" />
            <Collapse
             isOpen={this.state.isOpen} navbar >
            
              
          <Nav navbar>
            <NavItem>
                  <Button
                  className="btn-nav"
                    style={{ marginLeft: "1em", marginBottom: ".5em" }}
                    onClick={this.props.clearSessionToken}
                  >Logout
                  </Button>
            </NavItem>
                    
            <NavItem>
                <Button
                  className="btn-nav"
                  style={{ marginLeft: "1em",marginBottom: ".5em" }}
                    // onClick={this.props.GroceryListGet}
                  >Update Profile
                  </Button>
              </NavItem>
              
              <NavItem>
                <Button
                  className="btn-nav"
                  style={{ marginLeft: "1em",marginBottom: ".5em" }}
                    // onClick={this.props.GroceryListGet}
                  >Sessions
                </Button>
              </NavItem>
                
          </Nav>
        </Collapse>
      </Navbar>
 );
    }
}
 
export default Navigation;