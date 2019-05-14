import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import Editor from "../components/Editor";
import { Container } from "reactstrap";
import Navbar from "../components/Navbar";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/(notes)?" component={NoteList} />
          <Route
            exact
            path="/notes/:id/edit"
            render={({ match }) => <Editor id={match.params.id} />}
          />
          <Route exact path="/notes/new" render={() => <Editor id={null} />} />
          <Route
            exact
            path="/notes/:id"
            render={({ match }) => <Note id={match.params.id} />}
          />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
