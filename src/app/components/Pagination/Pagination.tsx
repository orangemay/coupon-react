import PageLink from "../PageLink/PageLink";

import style from './Pagination.module.css'

export type Props = {
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({ currentPage, lastPage, setCurrentPage }: Props) {
  const pageNums = [1, 2, 3]

  return (
    <nav className={style.pagination} aria-label="Pagination">
      <PageLink
        href="#"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)
      }>
        Previous
      </PageLink>
      {pageNums.map((pageNum, idx) => (
        <PageLink
          key={idx}
          href="#"
          active={pageNum === currentPage}
          onClick={() => setCurrentPage(pageNum)}>
          {pageNum}
        </PageLink>
      ))}
      <PageLink
        href="#"
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </PageLink>
    </nav>
  )
}