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
import MaskedInput from "react-text-mask";

// Data JSON
var states = require("../../../data/states.json");
var cities = require("../../../data/cities.json");

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      birthday: "",
      driver_license: {
        id: 0,
        number: "",
        issued_at: ""
      },
      allStates: [],
      state: "",
      allCities: [],
      city: "",
      phones: { id: 0, code: "", number: "" },
      emails: { id: 0, address: "" },
      parent: {
        id: 0,
        name: "",
        phone: { id: 0, code: "", number: "" }
      },
      needResponsable: false,
      needDriverLicense: false
    };
  }

  componentDidMount() {
    this.loadStates();
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
        needDriverLicense: true
      });
  }

  addUser() {
    this.setState({ id: this.state.id + 1 });
    console.log("state", this.state);
  }

  render() {
    const { birthday, state } = this.state;
    return (
      <Container className="mt-3">
        <h2 className="title">Cadastro</h2>
        <Form>
          <Col>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                type="text"
                placeholder="[Fulano de Tal]"
                onChange={e => this.setState({ name: e.target.value })}
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
                onChange={e => this.setState({ birthday: e.target.value })}
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
                      driver_license: {
                        id: this.state.driver_license.id + 1,
                        number: e.target.value.substring(0, 8),
                        issued_at: e.target.value.substring(9, 19)
                      }
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
                value={this.state.state}
                onChange={e => this.setState({ state: e.target.value })}
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
                onChange={e => this.setState({ city: e.target.value })}
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
              <Button size="sm" color="primary" className="ml-1 mb-1">
                <i className="fa fa-plus mr-1" />
                Adicionar
              </Button>
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
                    phones: {
                      id: this.state.phones.id + 1,
                      code: e.target.value.substring(0, 4),
                      number: e.target.value.substring(4, 16)
                    }
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
                    emails: {
                      id: this.state.emails.id + 1,
                      address: e.target.value
                    }
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
                        id: this.state.parent.id + 1,
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
                      parent: {
                        phone: {
                          id: this.state.parent.id + 1,
                          code: e.target.value.substring(0, 4),
                          number: e.target.value.substring(4, 16)
                        }
                      }
                    })
                  }
                />
              </FormGroup>
            </Col>
          ) : (
            <div />
          )}
          <Button color="success" block onClick={() => this.addUser()}>
            Salvar Cliente
          </Button>
        </Form>
      </Container>
    );
  }
}

export default New;
