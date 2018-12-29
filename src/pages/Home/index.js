import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardTitle,
  CardText,
  CardSubtitle
} from "reactstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("customers");
    this.unsubscribe = null;
    this.state = { customers: [] };
  }

  onCollectionUpdate = querySnapshot => {
    const customers = [];
    querySnapshot.forEach(doc => {
      const {
        name,
        birthday,
        driver_license,
        state,
        city,
        phone,
        emails,
        parent
      } = doc.data();
      customers.push({
        key: doc.id,
        doc,
        name,
        birthday,
        driver_license,
        state,
        city,
        phone,
        emails,
        parent
      });
    });
    this.setState({ customers });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  calculateAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);

    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  render() {
    console.log("this.state.customers", this.state.customers);
    return (
      <Container className="mt-3">
        <h2 className="title">
          LEITOR DE NOVIDADES ({this.state.customers.length})
        </h2>
        <Row>
          <Col sm="6">
            {this.state.customers.map((customer, index) => (
              <Card body key={index} className="mb-1">
                <CardTitle className="text-center">{customer.name}</CardTitle>
                <CardSubtitle className="text-center">Cliente</CardSubtitle>
                <CardText>
                  <i className="fa fa-birthday-cake mr-1" />
                  {customer.birthday} · {this.calculateAge(customer.birthday)}{" "}
                  anos
                </CardText>
                <CardText>
                  <i className="fa fa-building mr-1" />
                  {customer.city} · {customer.state}
                </CardText>
                <Link to={`/listar/${customer.key}`}>
                  <Button color="primary" block>
                    VER DETALHES
                  </Button>
                </Link>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
