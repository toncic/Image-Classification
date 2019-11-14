import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { ClassificationResultType } from "./ClassificationReults";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(5, 4),
      marginTop: '4px',
    }
  })
);

interface Props {
  result: ClassificationResultType;
}

const ClassificationResult: React.SFC<Props> = ({
  result
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {result.className}
      </Typography>
      <Typography component="p">
        {result.probability}
      </Typography>{" "}
    </Paper>
  );
};

export default ClassificationResult;
