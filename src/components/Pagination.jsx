import { Pagination as AntPagination } from "antd";
import { useNavigate } from "react-router";

const Pagination = ({ page, href, totalPages = 1 }) => {
  const navigate = useNavigate();

  const handleChange = (pageNumber) => {
    navigate(`/${href}?page=${pageNumber}`);
  };

  return (
    <div className="mt-6 flex justify-center">
      <AntPagination
        current={page}
        total={totalPages * 10}
        pageSize={10}
        onChange={handleChange}
        showSizeChanger={false}
      />
    </div>
  );
};

export default Pagination;
