import React from "react";
import { Paper } from "@material-ui/core";
import ClassificationResult from "../Components/ClassificationResult";

export type ClassificationResultType = {
  className: string;
  probability: string;
};

interface Props {
  results: Array<ClassificationResultType>;
}

const ClassificationResults: React.SFC<Props> = ({ results }) => {
  return (
    <Paper>
      {results &&
        results.map(result => {
          return (
            <ClassificationResult result={result} key={result.probability} />
          );
        })}
    </Paper>
  );
};

export default ClassificationResults;
