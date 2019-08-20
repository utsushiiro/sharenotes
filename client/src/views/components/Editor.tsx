import * as React from "react";
import { Note } from "@state/notes/types";
import { useState } from "react";
import { UnControlled as CodeMirror } from 'react-codemirror2'
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Divider, Box, Button } from "@material-ui/core";
require('codemirror/mode/gfm/gfm');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editor: {
      display: "block",
      boxSizing: "border-box",
      width: "100%",
      height: "calc(100vh - 48px - 1px - 1px - 52px)",
      fontSize: "1rem"
    },
    footer: {
      display: "flex",
      flexDirection: "row-reverse"
    }
  })
);

type Props = {
  note: Note;
  onUpdate: (content: string) => void;
};

const Editor: React.FC<Props> = props => {
  const classes = useStyles();
  const [content, setContent] = useState(props.note.content);
  return (
    <div>
      <Box className={classes.editor}>
        <CodeMirror
            value={content}
            options={{
              mode: 'gfm',
              theme: 'elegant',
              lineNumbers: true,
              lineWrapping: true,
            }}
            onChange={(editor, data, value) => {
              setContent(value);
            }}
        />
      </Box>
      <Divider />
      <Box p={1} className={classes.footer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.onUpdate(content)}
        >
          Update
        </Button>
      </Box>
    </div>
  );
};

export { Editor };
