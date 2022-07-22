import actionCreatorFactory from "typescript-fsa";
import { AlertState } from "../../domain/entity/alert";

const actionCreator = actionCreatorFactory();

type alertPayload = Omit<AlertState, "open">;

const alertActions = {
  openAlert: actionCreator<alertPayload>("OPEN_ALERT"),
  closeAlert: actionCreator<{}>("CLOSE_ALERT"),
};

export default alertActions;
