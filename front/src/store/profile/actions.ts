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
  setCareer: actionCreator<{ career: Partial<Career>; index: number }>(
    "SET_CAREER"
  ),
  deleteCareer: actionCreator<number>("DELETE_CAREER"),
  // 任意の職歴を削除するのでpayloadはnumber
  addCareer: actionCreator<{}>("ADD_CAREER"),
  // 初期値の職歴追加のためpayloadなし
};

export default profileActions;
// cf.setCareerのpayload型
//type Payload = {
//   // 更新する項目
//   career: Partial<Career>;
//   // 何番目の職歴なのか
//   index: number;
//   };
