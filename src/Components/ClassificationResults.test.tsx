import React from "react";
import renderer from "react-test-renderer";
import ClassificationResults from "./ClassificationReults";

const exampleData = [
  { className: "test1", probability: "0.3333" },
  { className: "test2", probability: "0.4444" },
  { className: "test3", probability: "0.5555" }
];

it("classification result are shown properly", () => {
  const component = renderer.create(
    <ClassificationResults results={exampleData} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
