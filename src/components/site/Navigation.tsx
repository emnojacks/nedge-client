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
          <img src={logo} alt="nedge logo" height="35px" width="35px"></img>
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
              <Button className="btn-nav">
                <Link to="/">beta</Link>
              </Button>
            </NavItem>

            <NavItem>
              <Button className="btn-nav">
                <Link to="/climber/goals">goals</Link>
              </Button>
            </NavItem>

            {/* SESSIONS LINK */}

            <NavItem>
              <Button className="btn-nav">
                <Link to="/climber/sessions">sessions</Link>
              </Button>
            </NavItem>

            {/* GYM VIEW LINK */}
            <NavItem>
              <Button className="btn-nav">
                <Link to="/gym">gym</Link>
              </Button>
            </NavItem>
            {/* ABOUT LINK */}
            <NavItem>
              <Button className="btn-nav">
                <Link to="/about">about</Link>
              </Button>
            </NavItem>

            {/* LOGOUT LINK */}
            <NavItem>
              <Button
                className="btn-nav"
                onClick={this.props.clearSessionToken}
              >
                logout
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
