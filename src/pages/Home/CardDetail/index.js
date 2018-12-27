import React, { Component } from "react";
import { connect } from "react-redux";
import { userRef } from "../../../firebase";
import { setUser } from "../../../store/actions";

import {
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody
} from "reactstrap";

class CardDetail extends Component {
  componentDidMount() {
    userRef.on("value", snap => {
      let users = [];
      snap.forEach(user => {
        //let userObj = user.val();
        const {
          name,
          birthday,
          driver_license,
          _state,
          city,
          phones,
          emails,
          parent
        } = user.val();
        users.push({
          name,
          birthday,
          driver_license,
          _state,
          city,
          phones,
          emails,
          parent
        });
      });
      console.log("users", users);
      this.props.setUser(users);
    });
  }

  render() {
    console.log("this.props.users", this.props.users);
    return (
      <div>
        <h2 className="title">Teste</h2>
        <CardDeck>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>wtf</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Col>
            <Card>
              <CardImg
                top
                width="100%"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardImg
                top
                width="100%"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180"
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </Col>
        </CardDeck>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(CardDetail);
