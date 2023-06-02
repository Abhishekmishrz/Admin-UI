import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import ReactPaginate from 'react-paginate';

const Pagination = ({
  pageNumber,
  pageCount,
  handlePageChange,
  handleHomePage,
  handleLastPage
}) => {
  return (
    <>
      <Button className="btn-page" disabled={pageNumber === 0} onClick={handleHomePage}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </Button>
      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
        nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
        disabledClassName={'disabled'}
        forcePage={pageNumber}
      />
      <Button className="btn-page" disabled={pageNumber === pageCount - 1} onClick={handleLastPage}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </Button>
    </>
  );
};

export default Pagination;
