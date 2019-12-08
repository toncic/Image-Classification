import React from "react";
import { Paper } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import ClassificationResult from "../Components/ClassificationResult";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "35%",
      left: "36%"
    }
  })
);

export type ClassificationResultType = {
  className: string;
  probability: string;
};

interface Props {
  results: Array<ClassificationResultType>;
}

const ClassificationResults: React.SFC<Props> = ({ results }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {results &&
        results.map(result => {
          return <ClassificationResult result={result} />;
        })}
    </Paper>
  );
};

export default ClassificationResults;
