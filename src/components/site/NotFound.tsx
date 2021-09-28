import { Component } from 'react';
import { Container } from 'reactstrap';
import Cat404 from "../../assets/404.jpeg";

interface NotFoundProps {
     sessionToken: string
}
 
interface NotFoundState {
    
}
 
class NotFound extends Component<NotFoundProps, NotFoundState> {
constructor(props: NotFoundProps) {
    super(props);
    this.state = {
    }
  }
    render() { 
        return (
            <Container>
                {Cat404}
                 <>Nice try but this page doesn't exist</>
            </Container>
  )
    }
}
 
export default NotFound;