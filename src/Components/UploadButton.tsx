import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    root: {
      position: "absolute",
      top: "25%",
      left: "45%"
    }
  })
);

const UploadButton: React.SFC = () => {
  const classes = useStyles();
  return (
    <Button variant="outlined" color="primary" className={classes.root}>
      Upload photo
    </Button>
  );
};

export default UploadButton;
