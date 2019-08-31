import * as React from "react";
import { Note } from "@state/notes/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Box, Button, Divider } from "@material-ui/core";
import { parser } from "@utils/markdown-parser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    content: {
      padding: "20px"
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

type Props = {
  note: Note;
  onDelete: () => void;
};

const Note: React.FC<Props> = props => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="body1"
        gutterBottom
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: parser(props.note.content) }}
      />
      <Divider />
      <Box p={1}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={props.onDelete}
        >
          Delete
        </Button>
      </Box>
    </div>
  );
};

export default Note;
