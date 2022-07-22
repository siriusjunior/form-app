export type AlertState = {
  // alertの種類
  severity: AlertSeverity;
  // alertに表示するメッセージ
  message: string;
  // snackbarを表示しているか
  open: boolean;
};
// エラーか成功か
export type AlertSeverity = "error" | "success";
