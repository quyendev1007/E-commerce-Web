import { Row, Col, Typography, Select } from "antd";
import { useGetList } from "../../customHooks/apiHook";
import ProductItem from "./ProductItem";
import Pagination from "../Pagination";
import { useSearchParams } from "react-router";
import { useState } from "react";

const { Title, Text } = Typography;

const OurProduct = () => {
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const {
    data: products,
    isLoading,
    error,
  } = useGetList("products", {
    page,
    limit: 8,
    sortBy: sortBy,
    order: order,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Có lỗi khi tải sản phẩm: {error.message}
      </div>
    );
  }

  const handleSortChange = (value) => {
    switch (value) {
      case "price_asc":
        setSortBy("price");
        setOrder("asc");
        break;
      case "price_desc":
        setSortBy("price");
        setOrder("desc");
        break;
      case "newest":
      default:
        setSortBy("createdAt");
        setOrder("desc");
        break;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
            Our Products
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Title level={2} className="!m-0 !text-4xl !font-bold">
            Explore Our Products
          </Title>
          <Select
            defaultValue="newest"
            style={{ width: 160 }}
            onChange={handleSortChange}
          >
            <Select.Option value="newest">Mới nhất</Select.Option>
            <Select.Option value="price_asc">Giá: Thấp đến cao</Select.Option>
            <Select.Option value="price_desc">Giá: Cao đến thấp</Select.Option>
          </Select>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {products?.docs?.map((product, idx) => (
          <Col key={idx} xs={24} sm={12} md={8} lg={6}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
      <Pagination page={page} totalPages={products.totalPages} href={""} />
    </section>
  );
};

export default OurProduct;
