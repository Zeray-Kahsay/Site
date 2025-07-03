import { MetaData } from "@/types/MetaData";


// NB: This comp has been replaced with infinite scrolling

interface Props {
  meta: MetaData;
}

const Pagination = ({ meta }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <span>
        Page {meta.currentPage} of {meta.totalPages}
      </span>
    </div>
  );
};

export default Pagination;
