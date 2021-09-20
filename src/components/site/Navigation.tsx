import * as React from 'react';
import { Component } from 'react';
import {
  Collapse,
  NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
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
            <Navbar color="light" expand="md">
            <NavbarBrand
              style={{ marginLeft: "1em" }}
            >
                <img src={logo} alt="nedge logo" height="32px" width="32px"></img>
            &nbsp; NEDGE
            </NavbarBrand>
            
            <NavbarToggler
              onClick={this.toggleNavbar}
              className="mr-2" />
            <Collapse
             isOpen={this.state.isOpen} navbar >
            
              
          <Nav navbar>
            <NavItem>
                <NavLink
                  className="btn-nav"
                    // onClick={this.props.GroceryListGet}
                  >Goals
                  </NavLink>
              </NavItem>

                
        
                    
            <NavItem>
                <NavLink
                  className="btn-nav"
                    // onClick=
                  >Profile
                  </NavLink>
              </NavItem>
              
              <NavItem>
                <NavLink
                  className="btn-nav"
                  onClick={this.props.clearSessionToken}
                  >Sessions
                </NavLink>
              </NavItem>

                
                    <NavItem>
                  <Button
                  className="btn-nav"
                    onClick={this.props.clearSessionToken}
                  >Logout
                  </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
 );
    }
}
 
export default Navigation;