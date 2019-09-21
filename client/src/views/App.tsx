import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NoteListPage from "@pages/NoteListPage";
import Navbar from "@components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NotePage from "@pages/NotePage";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container>
        <Switch>
          <Route exact path="/(notes)?" component={NoteListPage} />
          <Route
            exact
            path="/notes/:id"
            render={({
              match,
              location: { state: fromCreateNoteOperation }
            }) => (
              <NotePage
                noteId={match.params.id}
                isEditorMode={!!fromCreateNoteOperation}
              />
            )}
          />
          <Route render={() => <div>Not Found</div>} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
