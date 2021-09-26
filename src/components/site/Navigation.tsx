import { Component } from "react";
import {
  Collapse,
  NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
  //NavbarText,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

interface NavigationProps {
  clearSessionToken: () => void;
  sessionToken: string;
  updateSessionToken: (newToken: string) => void;
}

interface NavigationState {
  isOpen: boolean;
}

class Navigation extends Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  toggleNavbar = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      //NAV LOGO
      <Navbar color="light" expand="sm">
        <NavbarBrand style={{ marginLeft: "1em" }}>
          <img src={logo} alt="nedge logo" height="32px" width="32px"></img>
          &nbsp; NEDGE
        </NavbarBrand>
        {/* TOGGLE HAMBURGER */}
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={this.state.isOpen} navbar>
          {/* GOALS LINK */}
          <Nav navbar>
              <NavItem>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/climber/goals">Goals</Link>
            </NavItem>
            {/* SESSIONS LINK */}
            <NavItem>
              <Link to="/climber/sessions">Sessions</Link>
            </NavItem>
            {/* GYM VIEW LINK */}
            <NavItem>
              <Link to="/gym">Gym View</Link>
            </NavItem>
 {/* LOGOUT LINK */}
            <NavItem>
              <Button
                className="btn-nav"
                onClick={this.props.clearSessionToken}
              >
                Logout
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
