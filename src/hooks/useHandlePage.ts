import { useState } from 'react';

const useHandlePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return { currentPage, handleNextPage, handlePreviousPage, setCurrentPage };
};

export default useHandlePage;
