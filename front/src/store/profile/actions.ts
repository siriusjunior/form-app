import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";

const actionCreator = actionCreatorFactory();

// Partial<Profile>はProfileの項⽬のうち必要なものだけを渡す
const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE"),
};

export default profileActions;
