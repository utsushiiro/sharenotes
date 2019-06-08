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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { authOperations } from "../../state/auth";
import { User } from "../../state/auth/types";

type Props = {
  loginUser: User;
  onClick: () => void;
};

const NoteList: React.FC<Props> = ({ onClick, loginUser }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Navbar color="light" light expand="md">
      <Link to="/">ShareNotes</Link>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link to="/notes/new" className="nav-link">
              New Note
            </Link>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {loginUser.name}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={onClick}>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ authState }: State) => {
  return {
    loginUser: authState.loginUser
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, Action>) => {
  return {
    onClick: () => {
      dispatch(authOperations.logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
