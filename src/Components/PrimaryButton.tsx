import React from "react";
import "../App.css";
import Button from "@material-ui/core/Button";

interface Props {
  text: string;
  onClick?: (arg: any) => void;
}

const PrimaryButton: React.SFC<Props & React.HTMLProps<HTMLButtonElement>> = ({
  text,
  onClick
}) => {
  return (
    <Button variant="outlined" color="primary" size="large" onClick={onClick}>
      {text}
    </Button>
  );
};

export default PrimaryButton;
