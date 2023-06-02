// Pagination.js
import React from 'react';
import ReactPaginate from 'react-paginate';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ pageNumber, pageCount, handlePageChange, handleDeleteSelected }) => {
  const handleHomePage = () => {
    handlePageChange({ selected: 0 });
  };

  const handleLastPage = () => {
    handlePageChange({ selected: pageCount - 1 });
  };

  return (
    <div className="footer">
      <Button className="selected-delete" onClick={handleDeleteSelected}>
        Delete Selected
      </Button>
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
    </div>
  );
};

export default Pagination;
