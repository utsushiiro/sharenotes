import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NoteList from "../components/NoteList";
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
            path="/notes/:id"
            render={({ match, location: {state: fromCreateNoteOperation} }) => <NoteContainer id={match.params.id} isEditorMode={!!fromCreateNoteOperation} />}
          />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
