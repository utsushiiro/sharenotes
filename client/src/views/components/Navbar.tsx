import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../state/types";
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
  DropdownItem
} from "reactstrap";

type Props = {};

const NoteList: React.FC<Props> = ({}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Navbar color="light" light expand="md">
      <Link to="/">MarkdownNotebook</Link>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to="/notes/new" className="nav-link">
              New Note
            </Link>
          </NavItem>
          <NavItem>
            <ReactstrapNavLink href="https://github.com/utsushiiro">
              GitHub
            </ReactstrapNavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state: State) => {
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
