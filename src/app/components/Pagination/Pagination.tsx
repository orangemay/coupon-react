import PageLink from "../PageLink/PageLink";

import style from './Pagination.module.css'

export type Props = {
  totalPosts: number;
  postPerPage: number;
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  totalPosts,
  postPerPage,
  currentPage,
  lastPage,
  setCurrentPage
}: Props) {
  const pageNums = []

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNums.push(i)
  }

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