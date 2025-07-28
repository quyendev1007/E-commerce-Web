import {
  Button,
  Card,
  Descriptions,
  Divider,
  Image,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useParams } from "react-router";
import { useGetById } from "../customHooks/apiHook";
import ProductItem from "../components/clients/ProductItem";
import { formatPrice } from "../utils/formatter";
import { HeartOutlined } from "@ant-design/icons";
const { Title, Paragraph, Text } = Typography;

const Detail = () => {
  const { id } = useParams();

  const {
    data: productDetail,
    isLoading,
    isError,
  } = useGetById("products", id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 py-8">
        Có lỗi khi tải sản phẩm: {isError.message}
      </div>
    );
  }

  console.log(productDetail);

  const { product, similarProducts } = productDetail;

  return (
    <div className=" max-w-7xl mx-auto py-6 space-y-6">
      <Card
        style={{
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              style={{
                borderRadius: 16,
                objectFit: "cover",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
          </div>

          <div>
            <Title level={2} style={{ marginBottom: 8 }}>
              {product.name}
            </Title>
            <Paragraph
              style={{
                fontSize: 20,
                color: "#ef4444",
                fontWeight: "bold",
                marginBottom: 12,
              }}
            >
              {formatPrice(product.price)}
            </Paragraph>
            <Divider style={{ margin: "12px 0" }} />
            <Paragraph
              style={{ color: "#4b5563", fontSize: 16, marginBottom: 16 }}
            >
              <span className="text-[16px] font-semibold">Descriptions: </span>{" "}
              {product.description}
            </Paragraph>
            <Descriptions
              title="Detail Information"
              column={1}
              size="middle"
              bordered
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                overflow: "hidden",
              }}
              labelStyle={{ width: 120, fontWeight: "bold" }}
            >
              <Descriptions.Item label="Quantity">
                {product.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Brand">
                {product.brand_id?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Category">
                {product.category_id?.name}
              </Descriptions.Item>
            </Descriptions>

            <Space style={{ marginTop: "10px" }}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#e53935",
                  borderColor: "#e53935",
                  borderRadius: 4,
                  padding: "0 20px",
                }}
                onClick={() => console.log("Mua ngay")}
              >
                Buy Now
              </Button>

              <Tooltip title="Yêu thích">
                <Button
                  shape="circle"
                  icon={<HeartOutlined />}
                  style={{
                    borderColor: "#d9d9d9",
                    color: "#595959",
                  }}
                />
              </Tooltip>
            </Space>
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center my-6">
          <div className="w-5 h-10 bg-red-500 rounded mr-4"></div>
          <Text style={{ color: "red", fontWeight: "bold", fontSize: "20px" }}>
            Related Item
          </Text>
        </div>
        {similarProducts?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {similarProducts.map((item) => (
              <ProductItem key={item._id} product={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No Have Related Item</p>
        )}
      </div>
    </div>
  );
};

export default Detail;
