import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as MobileNet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { Tensor } from "@tensorflow/tfjs";
import LoadingComponent from "../Components/LoadingComponent";
import ClassificationResults, {
  ClassificationResultType
} from "./ClassificationReults";
import AuthService from "../StateMachine";
import { useService } from "@xstate/react";
import PrimaryButton from "./PrimaryButton";
import Typography from "@material-ui/core/Typography";

const ImageClassification = React.memo(function() {
  const [classifier, setClassifier] = useState();
  const [classificationResult, setClassificationResult] = useState();
  const [current, send] = useService(AuthService);

  async function loadModel() {
    setClassifier(
      await MobileNet.load()
        .then(model => {
          send("SUCCESS");
          return model;
        })
        .catch(() => {
          send("ERROR");
        })
    );
  }

  useEffect(() => {
    loadModel();
  });

  function onDrop(acceptedFiles: File[]): void {
    classifyImage(acceptedFiles[0]);
  }

  function classifyImage(inputFile: File) {
    const image = new Image();
    let fr = new FileReader();

    fr.onload = function() {
      if (fr !== null && typeof fr.result == "string") {
        image.src = fr.result;
      }
    };
    fr.readAsDataURL(inputFile);

    image.onload = async function() {
      const tensor: Tensor = tf.browser.fromPixels(image);
      classifier
        .classify(tensor)
        .then((result: Array<ClassificationResultType>) => {
          setClassificationResult(result);
        });
    };
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function loadModelAgain() {
    send("RETRY");
  }

  console.log(current);
  return current.value === "loadingModel" ? (
    <LoadingComponent />
  ) : current.value === "modelLoaded" ? (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <PrimaryButton text={"Upload photo"} />
      </div>
      <div className="classification-results">
        {classificationResult ? (
          <ClassificationResults results={classificationResult} />
        ) : null}
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Typography
        variant="h3"
        component="h3"
        align="center"
        gutterBottom={true}
        color="textPrimary"
      >
        There was an error loading model.
      </Typography>
      <PrimaryButton text={"Try again"} onClick={loadModelAgain} />
    </React.Fragment>
  );
});

export default ImageClassification;
