import * as React from "react";
import { Note } from "../../state/notes/types";
import { useState, useEffect } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textarea: { 
      display: "block",
      boxSizing: "border-box",
      width: "100%", 
      height: "calc(100vh - 48px - 1px)", 
      resize: "none",
      padding: "20px",
      border: "none",
      outline: "none",
    }
  })
);

type Props = {
  note: Note;
};

const Editor: React.FC<Props> = ({
  note
}) => {
  const classes = useStyles();
  const [content, setContent] = useState(note.content);
  return (
    <div>
      <form>
        <textarea
          name="content"
          className={classes.textarea}
          value={content}
          onChange={e => setContent(e.currentTarget.value)}
        />
      </form>
    </div>
  );
};

export {Editor};