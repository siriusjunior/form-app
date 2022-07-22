import { reducerWithInitialState } from "typescript-fsa-reducers";
import alertActions from "./actions";
import { AlertState } from "../../domain/entity/alert";

const init: AlertState = { open: false, message: "", severity: "error" };
const alertReducer = reducerWithInitialState(init)
  // アンスコで使わない仮引数であることを示唆
  .case(alertActions.openAlert, (_state, payload) => ({
    ...payload,
    open: true,
  }))
  .case(alertActions.closeAlert, (state) => ({
    ...state,
    message: "",
    open: false,
  }));

export default alertReducer;
