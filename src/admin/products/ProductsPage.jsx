"use client";

import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Plus,
  Package,
  X,
} from "lucide-react";
import {
  useCreate,
  useGetList,
  useRemove,
  useUpdate,
} from "../../customHooks/apiHook";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";

import { useSearchParams } from "react-router";
import { debouncedSearch } from "../../customHooks/debounceSearch";
import Pagination from "../../components/Pagination";

const ProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState("createdAt");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [search, setSearch] = useState("");

  const debounceSearch = debouncedSearch(search, 500);

  const {
    data: products,
    isError,
    isLoading,
    error,
  } = useGetList("products", {
    page,
    sortBy: sortField,
    order: sortOrder,
    search: debounceSearch,
    limit: 8,
  });

  const { data: brands } = useGetList("brands");
  const { data: categories } = useGetList("categories");

  const { mutate: createProduct } = useCreate("products");
  const { mutate: removeProduct } = useRemove("products");
  const { mutate: updateProduct } = useUpdate("products");

  // For

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
    reset(editingProduct);
  };

  const handleEdit = (product) => {
    setEditingProduct(product._id);
    setIsModalOpen(true);
    const brand = product.brand_id._id;
    const category = product.category_id._id;
    product = { ...product, brand_id: brand, category_id: category };

    console.log("prod", product);
    reset(product);
  };

  const handleDelete = (id) => {
    if (confirm("Sếp chắc chứ")) {
      removeProduct(id);
      toast.success("Xóa thành công!");
    }
  };

  const handleAddOrEdit = (data) => {
    if (editingProduct) {
      console.log("hello", editingProduct);

      updateProduct({ id: editingProduct, data });
      toast.success("Cập nhật sản phẩm thành công");
    } else {
      createProduct(data);
      toast.success("Thêm sản phẩm thành công");
    }
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log(products);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Có lỗi sảy ra {error.message}</div>;

  return (
    <div className="product-manager container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc mô tả sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên sản phẩm</span>
                    <button
                      onClick={() => handleSort("name")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortField === "name" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Giá</span>
                    <button
                      onClick={() => handleSort("price")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortField === "price" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex  items-center space-x-2">
                    <span>quantity</span>
                    <button
                      onClick={() => handleSort("quantity")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortField === "quantity" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày tạo</span>
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {sortField === "createdAt" ? (
                        sortOrder === "asc" ? (
                          <ArrowUp />
                        ) : (
                          <ArrowDown />
                        )
                      ) : (
                        <ArrowUpDown />
                      )}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.docs.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100">
                      {product.image ? (
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-center font-medium text-gray-900 max-w-xs">
                      {product.name.length > 50
                        ? `${product.name.substring(0, 50)}...`
                        : product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center font-bold text-green-600">
                      {formatPrice(product.price)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center font-bold text-green-600">
                      {product.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-center text-gray-900 max-w-md">
                      <p className="line-clamp-2" title={product.description}>
                        {product.description && product.description.length > 80
                          ? `${product.description.substring(0, 80)}...`
                          : product.description || "Không có mô tả"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-900">
                      {formatDate(product.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1.5 border border-gray-300 rounded-md text-red-600 hover:text-red-800 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(handleAddOrEdit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tên sản phẩm */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tên sản phẩm *
                  </label>
                  <input
                    {...register("name", {
                      required: "Vui lòng nhập tên sản phẩm",
                    })}
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên sản phẩm"
                  />
                  {errors.name && (
                    <p className="text-rose-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Giá */}
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Giá *
                  </label>
                  <input
                    type="number"
                    id="price"
                    {...register("price", {
                      required: "Vui lòng nhập giá sản phẩm",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập giá sản phẩm"
                    min="0"
                  />
                  {errors.price && (
                    <p className="text-rose-600">{errors.price.message}</p>
                  )}
                </div>

                {/* Số lượng */}
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số lượng *
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    {...register("quantity", {
                      required: "Vui lòng nhập số lượng",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số lượng"
                    min="0"
                    step="1"
                  />
                  {errors.quantity && (
                    <p className="text-rose-600">{errors.quantity.message}</p>
                  )}
                </div>

                {/* Hình ảnh */}
                <div>
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    URL hình ảnh
                  </label>
                  <input
                    type="url"
                    id="image"
                    {...register("image")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Thương hiệu (Brand) */}
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Thương hiệu
                  </label>
                  <select
                    id="brand"
                    {...register("brand_id")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Chọn thương hiệu
                    </option>
                    {brands?.docs.map((brand) => (
                      <option value={brand._id}>{brand.name}</option>
                    ))}
                  </select>
                </div>

                {/* Danh mục (Category) */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Danh mục
                  </label>
                  <select
                    id="category"
                    {...register("category_id")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Chọn danh mục
                    </option>
                    {categories?.docs.map((category) => (
                      <option value={category._id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {/* Mô tả - chiếm toàn bộ chiều ngang */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="description"
                    {...register("description")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mô tả sản phẩm"
                    rows="3"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {editingProduct ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Pagination
        page={page}
        totalPages={products.totalPages}
        href={"admin/products"}
      />
    </div>
  );
};

export default ProductPage;
