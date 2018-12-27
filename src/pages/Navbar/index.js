import React, { Component } from "react";
import Logo from "../../assets/logo.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class NavbarComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <img alt="Logo" width="30" height="30" className="mr-1" src={Logo} />
          Credere{" "}
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Cliente
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/cadastrar">
                  <i className="fa fa-plus mr-1" />
                  Cadastrar
                </DropdownItem>
                <DropdownItem href="/alterar">
                  <i className="fa fa-pencil mr-1" />
                  Editar
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/listar">
                  <i className="fa fa-th-list mr-1" />
                  Listar Todos
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href="/ajuda">Ajuda</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavbarComponent;
