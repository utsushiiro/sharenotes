import * as React from "react";
import NoteList from "./containers/NoteList";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>MarkdownNote</h1>
        <NoteList />
      </div>
    );
  }
}