import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NoteList from "../components/NoteList";
import Note from "../components/Note";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NoteContainer from "./NoteContainer";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
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
            render={({ match }) => <NoteContainer id={match.params.id} />}
          />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
