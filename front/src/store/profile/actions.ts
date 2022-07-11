import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";
import { Career } from "../../domain/entity/career";

const actionCreator = actionCreatorFactory();

// Partial<Profile>はProfileの項⽬のうち必要なものだけを渡す(Cf.29)
const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE"),
  setAddress: actionCreator<Partial<Address>>("SET_ADDRESS"),
  // ⾮同期処理のstart,done,failのaction生成(payloadの型)
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>(
    "SEARCH_ADDRESS"
  ),
  // 初期値の職歴追加のためpayloadなし
  addCareer: actionCreator<{}>("ADD_CAREER"),
  //careersを形成する(career)を形成(Cf.profile.ts)
  setCareer: actionCreator<{ career: Partial<Career>; index: number }>(
    "SET_CAREER"
  ),
  // 任意の職歴を削除するのでpayloadはnumber
  deleteCareer: actionCreator<number>("DELETE_CAREER"),
};

export default profileActions;
// cf.setCareerのpayload型
//type Payload = {
//   // 更新する項目
//   career: Partial<Career>;
//   // 何番目の職歴なのか
//   index: number;
//   };
