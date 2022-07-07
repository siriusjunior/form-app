export type Address = {
  // 郵便番号,都道府県,市区町村,残りの住所
  postalcode: string;
  prefecture: string;
  city: string;
  restAddress: string;
};
