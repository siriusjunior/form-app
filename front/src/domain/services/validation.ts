import { Profile } from "../entity/profile";
import { Validation } from "../entity/validation";
import { PROFILE } from "./profile";
import { College } from "../entity/college";
import { Career } from "../entity/career";

export const calculateValidation = (profile: Profile) => {
  const message: Validation = {
    name: emptyValidation(profile.name, PROFILE.NAME),
    description: lengthValidation(profile.description, 1000),
    birthday: emptyValidation(profile.birthday, PROFILE.BIRTHDAY),
    gender: emptyValidation(profile.gender, PROFILE.GENDER),
    address: {
      postalcode: emptyValidation(
        profile.address.postalcode,
        PROFILE.ADDRESS.POSTALCODE
      ),
      prefecture: emptyValidation(
        profile.address.prefecture,
        PROFILE.ADDRESS.PREFECTURE
      ),
      city: emptyValidation(profile.address.city, PROFILE.ADDRESS.CITY),
      restAddress: emptyValidation(
        profile.address.restAddress,
        PROFILE.ADDRESS.RESTADDRESS
      ),
    },
    college: { faculty: facultyValidation(profile.college) },
    careers: careerValidation(profile.careers),
  };
  return message;
};
// calculateValidation

// バリデーションメッセージの有無チェック
export const isValid = (message: Validation) => {
  const flattenValues = Object.values(message)
    .map(extractValues)
    .flat() as string[];
  // 配列の各項目にエラーメッセージがないか
  return flattenValues.every((fv) => !fv);
};
// 再帰的にObjectを配列に,extractValuesへ配列化
const extractValues = (obj: any): any[] | string => {
  if (typeof obj === "string") return obj;
  return Object.values(obj).map(extractValues);
};

// 必須項目
const emptyValidation = (target: string, col: string) =>
  isEmpty(target) ? `${col}を入力してください。` : "";
// 文字列制限
const lengthValidation = (target: string, maxLen: number) =>
  isTooLong(target, maxLen) ? `${maxLen}文字以下で入力してください。` : "";
const isEmpty = (str: string) => !str.trim();
const isTooLong = (str: string, maxLen: number) => str.trim().length >= maxLen;

// mapで配列をつくり職歴項目ごとのバリデーションに対応
const careerValidation = (careers: Career[]) =>
  careers.map((c) => ({
    company: emptyValidation(c.company, PROFILE.CAREERS.COMPANY),
    position: emptyValidation(c.company, PROFILE.CAREERS.POSITION),
    startAt: emptyValidation(c.startAt, PROFILE.CAREERS.START_AT),
    endAt: emptyValidation(c.endAt, PROFILE.CAREERS.END_AT),
  }));

// 大学選択時の学部選択要求
const facultyValidation = (college: College) =>
  college.name && !college.faculty
    ? `${PROFILE.COLLEGE.FACULTY}を入力してください。`
    : "";
