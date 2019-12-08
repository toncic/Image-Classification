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

interface Props {
  text: string;
  onClick?: (arg: any) => void;
}

const PrimaryButton: React.SFC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  text,
  onClick
}) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="primary"
      className={classes.root}
      size="large"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
