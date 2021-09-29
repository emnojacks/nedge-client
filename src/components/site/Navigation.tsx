import { Component } from "react";
import {
  Collapse,
  NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavbarBrand,
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
  isCollapsed: boolean;
}

class Navigation extends Component<NavigationProps, NavigationState> {
  constructor(props: NavigationProps) {
    super(props);
    this.state = {
      isCollapsed: false,
    };
  }
  toggleNavbar = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  };

  render() {
    return (
      //NAV LOGO
      <Navbar expand="sm" color="faded" light className="navBar">
        <NavbarBrand style={{ marginLeft: "1em" }}>
          <img src={logo} alt="nedge logo" height="32px" width="32px"></img>
          &nbsp;
        </NavbarBrand>
        {/* TOGGLE HAMBURGER */}

        <NavbarToggler
          style={{ marginRight: "1em" }}
          onClick={this.toggleNavbar}
          className="mr-2"
        />

        <Collapse isOpen={this.state.isCollapsed} navbar>
          {/* GOALS LINK */}
          <Nav navbar>
            <NavItem>
              <Button size="sm" color="warning" className="btn-nav">
                <Link to="/">Home</Link>
              </Button>
            </NavItem>

            <NavItem>
              <Button size="sm" color="warning" className="btn-nav">
                <Link to="/climber/goals">Goals</Link>
              </Button>
            </NavItem>

            {/* SESSIONS LINK */}

            <NavItem>
              <Button size="sm" color="warning" className="btn-nav">
                <Link to="/climber/sessions">Sessions</Link>
              </Button>
            </NavItem>

            {/* GYM VIEW LINK */}
            <NavItem>
              <Button size="sm" color="warning" className="btn-nav">
                <Link to="/gym">Gym View</Link>
              </Button>
            </NavItem>
            {/* LOGOUT LINK */}
            <NavItem>
              <Button
                size="sm"
                color="warning"
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
