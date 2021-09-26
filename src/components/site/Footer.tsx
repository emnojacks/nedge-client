import { Component } from "react";

interface FooterProps {}

interface FooterState {}

class Footer extends Component<FooterProps, FooterState> {
  constructor(props: FooterProps) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    return (
      <div className="footer">
        <small className="text-muted">
          <p> &copy; 2021 | DigitalGhost | privacy policy | contact </p>
        </small>
      </div>
    );
  }
}

export default Footer;
