import { FaChevronRight, FaChevronLeft} from "react-icons/fa";
import Loader from "./Loader";

const Pagination = (props: {
  currentPage: {
    page: number;
    cursor: string | null;
  },
  totalItems: number,
  onPageChange: Function ,
  isPreviousData: boolean,
  next: string | null,
  previous: string | null,
  isFetching: boolean
}) => {

  const handlePrevClick = () => props.onPageChange({ page: props.currentPage.page - 1, cursor: props.previous });
  const handleNextClick = () => props.onPageChange({ page: props.currentPage.page + 1, cursor: props.next});

  return (
    <div className="h-8 grid grid-cols-7 w-80 items-center mx-auto justify-between">
      <button
        disabled={!props.previous || props.isPreviousData}
        onClick={handlePrevClick}
        className="btn col-span-2"
      >
        <FaChevronLeft size={20} />
      </button>
      <p className="col-span-2 text-right">Page {props.currentPage.page}</p>
      <div className="col-span-2 ml-3">
        {props.isFetching ? <Loader /> : null}
      </div>
      <button
        disabled={!props.next || props.isPreviousData}
        onClick={handleNextClick}
        className="btn col-span-1 justify-self-end"
      >
        <FaChevronRight size={20}/>
      </button>
    </div>
  );
};

export default Pagination;