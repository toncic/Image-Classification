import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as MobileNet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import { Tensor } from "@tensorflow/tfjs";
import UploadButton from "../Components/UploadButton";
import LoadingComponent from "../Components/LoadingComponent";
import ClassificationResults, {
  ClassificationResultType
} from "./ClassificationReults";

const ImageClassification = React.memo(function() {
  const [isModelLoaded, setModelLoaded] = useState(false);
  const [classifier, setClassifier] = useState();
  const [classificationResult, setClassificationResult] = useState();

  useEffect(() => {
    async function modelReady() {
      setClassifier(
        await MobileNet.load().then(model => {
          setModelLoaded(true);
          return model;
        })
      );
    }

    modelReady();
  }, []);

  function onDrop(acceptedFiles: File[]): void {
    prepareImage(acceptedFiles[0]);
  }

  function prepareImage(inputFile: File) {
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
          console.log("AFTER CLASSIFICATION " + result);
          setClassificationResult(result);
        });
    };
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return !isModelLoaded ? (
    <LoadingComponent />
  ) : (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <UploadButton />
      </div>
      <div className="classification-results">
        {classificationResult ? (
          <ClassificationResults results={classificationResult} />
        ) : null}
      </div>
    </React.Fragment>
  );
});

export default ImageClassification;
