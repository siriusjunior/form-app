import { Career } from "../entity/career";

// isEmptyCareerを満たすcareerがcareersにひとつでもあるか
export const exitEmptyCareers = (careers: Career[]) =>
  careers.some((c) => isEmptyCareer(c));

const isEmptyCareer = (career: Career) => {
  // everyでcareer項目配列内のすべてがテストに合格するかどうか(すべて空文字かどうか)
  return Object.values(career).every((v) => !v);
};
