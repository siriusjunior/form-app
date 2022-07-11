import { Dispatch } from "redux";
import collegesActions from "./actions";

export const searchColleges = (name: string) => async (dispatch: Dispatch) => {
  const url = `http://localhost:18001/colleges?name=${name}`;
  const result = await fetch(url).then((res) => res.json());

  dispatch(
    collegesActions.searchCollege.done({
      // payloadのデータ型をJSON内の必要項目に合わせてdispatch
      result: result.results.school,
      params: {},
    })
  );
  console.log(result);
};
