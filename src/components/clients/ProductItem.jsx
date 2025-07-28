import { Card, Badge, Tooltip, Button, Rate, Image } from "antd";
import {
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { formatPrice } from "../../utils/formatter";
import { useNavigate } from "react-router";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Badge.Ribbon
      text="NEW"
      color="green"
      style={{
        fontSize: "0.75rem",
        fontWeight: 600,
        color: "black",
      }}
    >
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/details/${product._id}`)}
      >
        <Card
          hoverable
          className="group rounded-lg"
          cover={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="relative p-4 bg-gray-100 rounded-t-lg group"
            >
              <Image
                preview={false}
                src={product.image}
                alt="The north coat"
                style={{
                  width: "100%",
                  height: "12rem",
                  objectFit: "cover",
                }}
              />
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Tooltip title="Add to Wishlist">
                  <Button
                    shape="circle"
                    icon={<HeartOutlined />}
                    className="bg-white shadow hover:bg-gray-50"
                  />
                </Tooltip>
                <Tooltip title="Quick View">
                  <Button
                    shape="circle"
                    icon={<EyeOutlined />}
                    className="bg-white shadow hover:bg-gray-50"
                  />
                </Tooltip>
              </div>
              <Button
                className="absolute bottom-0 left-0 right-0 bg-black text-white rounded-b-lg py-2 opacity-0 group-hover:opacity-100 transition-opacity"
                icon={<ShoppingCartOutlined />}
                block
              >
                Add To Cart
              </Button>
            </div>
          }
        >
          <h3 className="font-medium mb-2">{product.name}</h3>
          <div className=" mb-2">
            <span className="text-red-500 font-bold">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center mt-1.5 text-yellow-400">
              <Rate disabled defaultValue={4} className="text-sm" />
              <span className="text-gray-500 text-sm ml-2">(65)</span>
            </div>
          </div>
        </Card>
      </div>
    </Badge.Ribbon>
  );
};

export default ProductItem;
