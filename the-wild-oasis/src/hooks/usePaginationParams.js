import { useSearchParams } from "react-router-dom";

function boundNumberString(numberString, min, max) {
  //ensure paramPage is a positive integer, or NaN
  const integerNumber = Math.abs(Math.floor(Number(numberString)));
  if (isNaN(integerNumber) || integerNumber < min) return min;
  if (integerNumber > max) return max;
  return integerNumber;
}

const DEFAULT_RESULT_PER_PAGE = 10;

export default function usePaginationParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const perPageString = searchParams.get("perpage");
  const pageString = searchParams.get("page");

  const resultPerPage = perPageString
    ? boundNumberString(perPageString, 1, 1000)
    : DEFAULT_RESULT_PER_PAGE;

  const calculateMaxPage = (count) => Math.ceil(count / resultPerPage);

  const calculateCurrentPage = (count = undefined) =>
    boundNumberString(
      pageString,
      1,
      count ? Math.ceil(count / resultPerPage) : Infinity
    );

  function handlePrev(count) {
    searchParams.set("page", calculateCurrentPage(count) - 1);
    setSearchParams(searchParams);
  }

  function handleNext(count) {
    searchParams.set("page", calculateCurrentPage(count) + 1);
    setSearchParams(searchParams);
  }

  function setPerPage(perPage) {
    searchParams.set("perpage", perPage);
    searchParams.delete("page");
    setSearchParams(searchParams);
  }

  return {
    calculateCurrentPage,
    calculateMaxPage,
    resultPerPage,
    handlePrev,
    handleNext,
    setPerPage,
  };
}
