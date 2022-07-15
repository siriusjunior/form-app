import { Dispatch } from "redux";
import collegesActions from "./actions";

export const searchColleges = (name: string) => async (dispatch: Dispatch) => {
  // const url = `http://localhost:18001/colleges?name=${name}`;
  // const result = await fetch(url).then((res) => res.json());
  // 大学検索APIサービス終了につきnameでJSONデータ返却なしでJSON配備
  const result = {
    results: {
      api_version: "1.00",
      results_available: 1,
      results_returned: "1",
      results_start: 1,
      school: [
        {
          campus: [
            {
              address: "〒606-8501京都府京都市左京区吉田本町",
              datum: "world",
              latitude: 35.0261557628,
              longitude: 135.7809258979,
              name: "",
              station: "出町柳",
            },
          ],
          category: {
            code: "0011",
            name: "国立大学",
          },
          code: "SC000017",
          faculty: [
            {
              department: [
                "建築学科",
                "工業化学科",
                "情報学科",
                "地球工学科",
                "電気電子工学科",
                "物理工学科",
              ],
              name: "工学部",
            },
            {
              department: [
                "資源生物科学科",
                "応用生命科学科",
                "地域環境工学科食料",
                "環境経済学科",
                "森林科学科",
                "食品生物科学科",
              ],
              name: "農学部",
            },
            {
              department: ["医学科", "人間健康科学科"],
              name: "医学部",
            },
            {
              department: ["理学科"],
              name: "理学部",
            },
            {
              department: ["薬科学科", "薬学科"],
              name: "薬学部",
            },
            {
              department: ["経済経営学科"],
              name: "経済学部",
            },
            { department: [""], name: "法学部" },
            { department: ["教育科学科"], name: "教育学部" },
            { department: ["人文学科"], name: "文学部" },
            { department: ["総合人間学科"], name: "総合人間学部" },
          ],
          kana: "キョウトダイガク",
          name: "京都大学",
          pref: {
            code: "26",
            name: "京都",
          },
          urls: {
            mobile:
              "http://shingakunet.com/net/m/gakko/top/SC000017/?uid=NULLGWDOCOMO&vos=rmn536",
            pc: "http://shingakunet.com/gakko/SC000017/?vos=drmnapis00000",
            qr: "http://webservice.recruit.co.jp/common/qr?url=http%3A%2F%2Fshingakunet.com%2Fnet%2Fm%2Fgakko%2Ftop%2FSC000017%2F%3Fuid%3DNULLGWDOCOMO%26vos%3Drmn537",
          },
        },
      ],
    },
  };

  dispatch(
    collegesActions.searchCollege.done({
      // payloadのデータ型をJSON内の必要項目に合わせてdispatch
      result: result.results.school,
      params: {},
    })
  );
};
