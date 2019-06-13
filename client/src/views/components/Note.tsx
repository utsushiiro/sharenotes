import * as React from "react";
import { Note } from "../../state/notes/types";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Box, Button, Divider} from "@material-ui/core";

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
  deleteButtonHandler: () => void;
};

const Note: React.FC<Props> = ({ note, deleteButtonHandler }) => {
  const classes = useStyles();

  return (
    <div>
        <Typography variant="body1" gutterBottom className={classes.content}>
          {note.content}
        </Typography>
        <Divider />
        <Box p={1}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={deleteButtonHandler}
          >
            Delete
          </Button>
        </Box>
    </div>
  );
};

export { Note };
