import {printTime} from "@/util";
import type {PR} from "@/data";
import type {IResult} from "@/types";

export const timeFromReviewToMerge = (pr: PR): IResult<number> => {
  const { timeline } = pr;

  const mergedAtNum = Number(timeline.mergedAt);
  const firstRequestedAtNum = Number(timeline.firstRequestedAt);

  // 만약 숫자로 변환이 불가능하다면(NaN),
  // 어떤 값이 잘못되었는지 프린트(메시지)해준다.
  if (Number.isNaN(mergedAtNum) || Number.isNaN(firstRequestedAtNum)) {
    return {
      value: 0,
      message: `값이 올바르지 않습니다. (mergedAt: ${timeline.mergedAt}, firstRequestedAt: ${timeline.firstRequestedAt})`
    };
  }

  const value = mergedAtNum - firstRequestedAtNum;
  return {
    value,
    message: `Time from review to merge: ${printTime(value)}`,
  };
};