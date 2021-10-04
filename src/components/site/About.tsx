import { Component } from "react";
import { Row, Col, Container, Card, CardHeader, CardText } from "reactstrap";

interface AboutProps {
  sessionToken: string;
}

interface AboutState {}

class About extends Component<AboutProps, AboutState> {
  constructor(props: AboutProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Container>
          <br></br>
          <h2>NEDGE: for the common climber</h2>
          <div className="tagline-div">
            <p><mark className="mark-text">
            Nudging users closer to the edge of their climbing ability by
              catalyzing healthier mental pathways and physical conditions.</mark>
            </p>
</div>
          <p>
            As climbers, we’ve all experienced the plateau. Most of us reach it
            before we are internally satisfied with our performance. While in
            the dreaded plateau, we either give up our conscious or unconscious
            goals, carry on for years wondering why we never advance, or give up
            climbing entirely out of growing resentment.</p>
            <p><mark className="mark-text">Nedge is an application
            for rock climbers of all skill levels and experience</mark> that allows
            users to observe and become aware of their climbing patterns and the
            habits that may directly affect their performance. We are climbers
            but first and foremost we are humans therefore respond to proven
            behavior change interventions at the core of this app.
          </p>
          <h2>user stories</h2>
          <Row xs="2">
            <Col>
              <Card className="climber-profile-card">
                <CardHeader className="user-story-card-header">The Weekend Warrior // </CardHeader>
                <CardText className="user-story-card-text">
                  <small>
                    You are likely an engineer, a lawyer, or coder. You’re
                    highly motivated in all pursuits you undertake and you
                    strive to complete them to the absolute best of your
                    ability. You climb and train methodically. You dissect every
                    route after climbing it. You may project routes but you’re
                    also very interested in being safe. You have a full time job
                    and earn a good living so you can take lots of trips and
                    afford a nice gym membership - but you would likely never
                    consider giving up the gains you’ve made in your career to
                    dirtbag - you’re too practical.
                  </small>
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card className="climber-profile-card">
                <CardHeader className="user-story-card-header">The Psyched Nube // </CardHeader>
               <CardText className="user-story-card-text">
                  <small>
                    You're new to the sport and your psych level is high.
                    You are a white male, 20-24 years old. You come from other
                    highly physical sports and have
                    fallen in love with climbing and it’s changed your life. You
                    are interested in gains and new gear. You lack some technical know-how and
                    technique but you have muscled your way up several grades
                    very quickly. You are a mentally strong climber but you can fall into the trap of grade
                    chasing and may ignore lessons that lower grade climbs can
                    teach. Within two years you could be a crusher
                    outfitting a van to dirtbag
                    in Wyoming.
                  </small>
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card className="climber-profile-card">
                <CardHeader className="user-story-card-header">The Hipster // </CardHeader>
              <CardText className="user-story-card-text">
                  <small>
                    Climbing is part of your unique identity. You want to be set
                    apart from everyone else. You are artsy, have many tattoos
                    and homemade jewelry. You have an alternative haircut and if
                    you are a female you likely identify as a Tom Boy. You
                    don’t climb crazy hard but you love to get outside and want to
                    climb hard enough that those experiences are positive and
                    you can keep climbing as part of your identity that you
                    share with your friends.
                  </small>
                </CardText>
              </Card>
            </Col>

            <Col>
              <Card className="climber-profile-card">
                <CardHeader className="user-story-card-header">The Dusty Veteran // </CardHeader>
              <CardText className="user-story-card-text">
                  <small>
                    You’ve been climbing for years and have identified at
                    certain points with all the other stereotypes. You had your
                    psych phase, your crushing phase, your weekend warrior
                    phase, perhaps a noncommittal dirtbagging trip or two, and
                    you’ve settled into a gym routine which heretofore you
                    thought only suitable for gym rats. You’re adulting but
                    you’re trying not to give up on your climbing goals because
                    you still hold climbing as part of your identity. You have
                    been in the plateau for years but you want to crush again
                    without having to pack up your comfy life to dirtbag.
                  </small>
                </CardText>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default About;
