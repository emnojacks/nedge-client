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
          <h1>Nedge: for the common climber</h1>
          <h3>
            {" "}
            Nudging users closer to the edge of their climbing ability by
            catalyzing healthier mental pathways and physical conditions.
          </h3>
          <p>
            As climbers, we’ve all experienced the plateau. Most of us reach it
            before we are internally satisfied with our performance. While in
            the dreaded plateau, we either give up our conscious or unconscious
            goals, carry on for years wondering why we never advance, or give up
            climbing entirely out of growing resentment. Nedge is an application
            for rock climbers of all skill levels and experience that allows
            users to observe and become aware of their climbing patterns and the
            habits that may directly affect their performance. We are climbers
            but first and foremost we are humans therefore respond to proven
            behavior change interventions at the core of this app.
          </p>
          <Row xs="2">
            <Col>
              <h3>User Stories</h3>
              <Card className="climber-profile-card">
                <CardHeader>The Weekend Warrior</CardHeader>
                <CardText>
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
                <CardHeader>The Psyched Nube</CardHeader>
                <CardText>
                  <small>
                    You're brand new to the sport and your psych level is high.
                    You are a white male, 20-24 years old. You come from other
                    highly physical sports (football, lacrosse, hockey) and have
                    fallen in love with climbing and it’s changed your life. You
                    are interested in gains and new gear - which you don’t
                    always research to the best of your ability before
                    purchasing. You lack technical know-how and nuanced
                    technique but you have muscled your way up several grades
                    very quickly and you are mentally a strong climber (thanks
                    to a good upbringing, privilege, and excelling at previous
                    physical endeavors) but you can fall into the trap of grade
                    chasing and may ignore lessons that lower grade climbs can
                    teach. It’s likely within two years you will be crushing and
                    outfitting a van to and go dirtbag in and end up somewhere
                    in Wyoming.
                  </small>
                </CardText>
              </Card>
            </Col>
            <Col>
              <Card className="climber-profile-card">
                <CardHeader>The Hipster</CardHeader>
                <CardText>
                  <small>
                    Climbing is part of your unique identity. You want to be set
                    apart from everyone else. You are artsy, have many tattoos
                    and homemade jewelry. You have an alternative haircut and if
                    you are a female you likely identify as a Tom Boy and if you
                    are a boy - you likely identify with your feminine side. You
                    don’t climb too hard but you love to get outside and want to
                    climb hard enough that those experiences are positive and
                    you can keep climbing as part of your identity that you
                    share with your friends.
                  </small>
                </CardText>
              </Card>
            </Col>

            <Col>
              <Card className="climber-profile-card">
                <CardHeader>The Dusty Veteran</CardHeader>
                <CardText>
                  <small>
                    You’ve been climbing for years and have identified at
                    certain points with all the other stereotypes. You had your
                    psych phase, your crushing phase, your weekend warrior
                    phase, perhaps a noncommittal dirtbagging trip or two, and
                    now you’ve settled into a gym routine which heretofore you
                    thought only suitable for gym rats. You’re adulting but
                    you’re trying not to give up on your climbing goals because
                    you still hold climbing as part of your identity. You have
                    been in the plateau for years but you want to crush again
                    without having to pack up your life and dirtbag.
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
