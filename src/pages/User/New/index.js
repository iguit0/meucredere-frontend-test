import React, { Component } from "react";
import {
  Container,
  Form,
  Col,
  Label,
  FormGroup,
  Button,
  Input
} from "reactstrap";
import firebase from "../../../firebase";
import MaskedInput from "react-text-mask";

// Data JSON
var states = require("../../../data/states.json");
var cities = require("../../../data/cities.json");

class New extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("customers");
    this.state = {
      name: "",
      birthday: "",
      driver_license: [],
      allStates: [],
      state: "MG",
      allCities: [],
      city: "Rio Paranaíba",
      phones: [],
      emails: [],
      parent: [],
      needResponsable: false,
      needDriverLicense: false
    };
  }

  componentDidMount() {
    this.loadStates();
    this.loadCityByState(this.state.state);
  }

  // Carregar estados brasileiros
  loadStates() {
    let _States = JSON.parse(JSON.stringify(states));
    this.setState({ allStates: _States });
  }

  // Carregar cidade por UF (Estado)
  loadCityByState(state) {
    let _stateId = "";
    let _States = JSON.parse(JSON.stringify(states));
    let _Cities = JSON.parse(JSON.stringify(cities));
    _stateId = _States.find(s => s.abbr === state);
    const _cities = _Cities.filter(city => city.state_id === _stateId.id);
    this.setState({ allCities: _cities });
  }

  // Calcular idade (se precisa de responsavel)
  calculateAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);

    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18)
      this.setState({ needResponsable: true, needDriverLicense: false });
    else if (age >= 18)
      this.setState({
        needResponsable: false,
        needDriverLicense: true,
        parent: null
      });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    const {
      name,
      birthday,
      driver_license,
      state,
      city,
      phones,
      emails,
      parent
    } = this.state;

    this.ref.add({
      name,
      birthday,
      driver_license,
      state,
      city,
      phones,
      emails,
      parent
    });
    this.props.history.push("/");
  };

  render() {
    const { birthday, state } = this.state;
    return (
      <Container className="mt-3">
        <h2 className="title">CADASTRO</h2>
        <Form onSubmit={this.onSubmit}>
          <Col>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                type="text"
                placeholder="[Fulano de Tal]"
                onChange={e =>
                  this.setState({
                    name: e.target.value
                  })
                }
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Data de Nascimento</Label>
              <MaskedInput
                mask={[
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  "/",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/
                ]}
                className="form-control"
                placeholder="dd/mm/aaaa"
                guide={false}
                onBlur={() => this.calculateAge(birthday)}
                onChange={e =>
                  this.setState({
                    birthday: e.target.value
                  })
                }
              />
            </FormGroup>
          </Col>
          {this.state.needDriverLicense ? (
            <Col>
              <FormGroup>
                <Label>Carteira de Motorista</Label>
                <MaskedInput
                  mask={[
                    /[1-9]/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    " ",
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/
                  ]}
                  className="form-control"
                  placeholder="[12345678] [dd/mm/aaaa]"
                  guide={false}
                  onChange={e =>
                    this.setState({
                      driver_license: e.target.value
                    })
                  }
                />
              </FormGroup>
            </Col>
          ) : (
            <div />
          )}
          <Col>
            <FormGroup>
              <Label>Estado</Label>
              <select
                className="form-control"
                onChange={e =>
                  this.setState({
                    state: e.target.value
                  })
                }
                value={this.state.state}
                onBlur={() => this.loadCityByState(state)}
              >
                {this.state.allStates.map(s => (
                  <option key={s.id} value={s.abbr}>
                    {s.abbr}
                  </option>
                ))}
              </select>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Cidade</Label>
              <select
                className="form-control"
                value={this.state.city}
                onChange={e =>
                  this.setState({
                    city: e.target.value
                  })
                }
              >
                {this.state.allCities.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Telefones</Label>
              <MaskedInput
                mask={[
                  "(",
                  /[1-9]/,
                  /\d/,
                  ")",
                  " ",
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/
                ]}
                className="form-control"
                placeholder="(99) 9 9999-9999"
                guide={false}
                onChange={e =>
                  this.setState({
                    phones: e.target.value
                  })
                }
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>E-mails</Label>
              <Input
                type="email"
                className="mb-2"
                placeholder="seu@email.com"
                onChange={e =>
                  this.setState({
                    emails: e.target.value
                  })
                }
              />
            </FormGroup>
          </Col>
          {this.state.needResponsable ? (
            <Col>
              <FormGroup>
                <Label>Responsável</Label>
                <Input
                  type="text"
                  placeholder="Nome"
                  className="mb-2"
                  onChange={e =>
                    this.setState({
                      parent: {
                        name: e.target.value
                      }
                    })
                  }
                />
                <MaskedInput
                  mask={[
                    "(",
                    /[1-9]/,
                    /\d/,
                    ")",
                    " ",
                    /\d/,
                    " ",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/
                  ]}
                  className="form-control"
                  placeholder="(99) 9 9999-9999"
                  guide={false}
                  onChange={e =>
                    this.setState({
                      parent: [
                        {
                          phone: [
                            {
                              code: e.target.value.substring(0, 4),
                              number: e.target.value.substring(4, 16)
                            }
                          ]
                        }
                      ]
                    })
                  }
                />
              </FormGroup>
            </Col>
          ) : (
            <div />
          )}
          <Button color="success" block>
            Salvar Cliente
          </Button>
        </Form>
      </Container>
    );
  }
}

export default New;
