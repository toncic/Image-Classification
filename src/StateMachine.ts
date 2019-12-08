import { Machine, interpret } from "xstate";

export type TSchema = {
  states: {
    loadingModel: {};
    modelLoaded: {};
    modelLoadingFailed: {};
  };
};

export type TEvent =
  | { type: "SUCCESS" }
  | { type: "ERROR" }
  | { type: "RETRY" };

export type TContext = {};

export const loadingModelMachine = Machine<TContext, TSchema, TEvent>({
  id: "loadingModel",
  initial: "loadingModel",
  states: {
    loadingModel: {
      on: {
        SUCCESS: "modelLoaded", 
        ERROR: "modelLoadingFailed"
      }
    },
    modelLoaded: {},
    modelLoadingFailed: {
      on: {
        RETRY: "loadingModel"
      }
    }
  }
});

const AuthService = interpret(loadingModelMachine).start();

export default AuthService;
