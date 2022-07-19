export type Validation = {
  name: string;
  description: string;
  birthday: string;
  gender: string;
  address: {
    // 郵便番号,都道府県,市区町村,残りの住所
    postalcode: string;
    prefecture: string;
    city: string;
    restAddress: string;
  };
  careers: {
    //会社名
    //役職
    //開始月
    //終了月
    company: string;
    position: string;
    startAt: string;
    endAt: string;
  }[];
  college: {
    faculty: string;
  };
};

export type ValidationState = {
  isStartValidation: boolean;
  message: Validation;
};
