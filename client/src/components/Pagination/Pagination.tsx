import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Function;
  totalPages: number;
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginationProps) {

  const onChangePage = (prevOrNext: string) => {
    if (prevOrNext === "next") {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }

      return;
    }

    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.pagination_buttons}>
        <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
          First
        </button>

        <button
          onClick={() => onChangePage("prev")}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        <button
          onClick={() => onChangePage("next")}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage >= totalPages}
        >
          Last
        </button>
      </div>

      <div>
        <span>
          Page <b>{currentPage + 1}</b> of{" "}
          <b>{totalPages < 0 ? 1 : totalPages + 1}</b>
        </span>
      </div>
    </div>
  );
}
