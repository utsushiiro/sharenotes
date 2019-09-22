import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NoteListPage from "@pages/NoteListPage";
import Navbar from "@components/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NotePage from "@pages/NotePage";
import { eventTypes } from "@state/events/constants";
import { EventToasterDefs, useEventToaster } from "@state/events/hooks";

const eventToasterDefs = [
  {
    eventType: eventTypes.LOGGED_IN,
    toasterOptions: {
      message: "Logged in",
      variant: "success",
      autoHideDuration: 1000
    }
  },
  {
    eventType: eventTypes.SIGNED_UP,
    toasterOptions: {
      message: "Welcome!",
      variant: "success",
      autoHideDuration: 1000
    }
  }
] as EventToasterDefs;

const App: React.FC = () => {
  // event toaster
  useEventToaster(eventToasterDefs);

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
