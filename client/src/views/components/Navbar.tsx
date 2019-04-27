import * as React from 'react';
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { Note, State } from '../../state/notes/types';
import { Action } from "../../state/notes/actions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink as ReactstrapNavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

type Props = {};

const mapStateToProps = (state: State) => {
  return {};
};

const mapDispatchToProps = (dispatch:  ThunkDispatch<State, void, Action>)=> {
  return {};
};

const NoteList: React.FC<Props> = ({
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Navbar color="light" light expand="md">
      <Link to="/">MarkdownNotebook</Link>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to="/components/" className="nav-link">Components</Link>
          </NavItem>
          <NavItem>
            <ReactstrapNavLink href="https://github.com/reactstrap/reactstrap">GitHub</ReactstrapNavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
