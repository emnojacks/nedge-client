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
  NavbarText,
  Button
} from 'reactstrap';
import logo from '../../assets/logo.svg'


interface NavigationProps {
    
}
 
interface NavigationState {
    
}
 
class Navigation extends Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }
    render() {
        return ( 
            <Navbar dark>
            <NavbarBrand>
                    <img src={logo} alt="nedge logo" height="32px" width="32px"></img>
            </NavbarBrand>
            <NavbarToggler
              // onClick={toggleNavbar}
              className="mr-2" />
            <Collapse
              // isOpen={!collapsed} navbar
            >
          <Nav navbar>
            <NavItem>
                <Button
                  className="btn-nav"
                  style={{ marginLeft: "1em" }}
                  >Logout</Button>
                        </NavItem>
                        <br></br>
            <NavItem>
                <Button
                  className="btn-nav"
                  style={{ marginLeft: "1em" }}
                    // onClick={props.GroceryListGet}
                  
                  >Goals</Button>
                </NavItem>
                         <NavItem>
                <Button
                  className="btn-nav"
                  style={{ marginLeft: "1em" }}
                    // onClick={props.GroceryListGet}
                  
                  >Sessions</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
 );
    }
}
 
export default Navigation;