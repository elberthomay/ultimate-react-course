import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import usePaginationParams from "../hooks/usePaginationParams";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const {
    calculateCurrentPage,
    calculateMaxPage,
    resultPerPage,
    handleNext,
    handlePrev,
    setPerPage,
  } = usePaginationParams();
  const currentPage = calculateCurrentPage(count);
  const maxPage = calculateMaxPage(count);
  const startItem = (currentPage - 1) * resultPerPage + 1;
  const endItem = Math.min(currentPage * resultPerPage, count);

  return (
    <StyledPagination>
      <P>
        Showing <span>{startItem}</span> to <span>{endItem}</span> of{" "}
        <span>
          {count} result{count > 1 ? "s" : ""}
        </span>
      </P>

      <Buttons>
        <PaginationButton
          onClick={() => setPerPage(10)}
          active={resultPerPage === 10 ? "true" : ""}
        >
          10
        </PaginationButton>
        <PaginationButton
          onClick={() => setPerPage(20)}
          active={resultPerPage === 20 ? "true" : ""}
        >
          20
        </PaginationButton>
        <PaginationButton
          onClick={() => setPerPage(40)}
          active={resultPerPage === 40 ? "true" : ""}
        >
          40
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePrev(count)}
          disabled={currentPage === 1}
        >
          <HiChevronLeft /> Prev
        </PaginationButton>
        <PaginationButton
          onClick={() => handleNext(count)}
          disabled={currentPage === maxPage}
        >
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
