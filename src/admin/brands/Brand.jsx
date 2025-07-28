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
  Tag,
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

const BrandManager = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState("createdAt");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [search, setSearch] = useState("");
  const debounceSearch = debouncedSearch(search, 500);

  const {
    data: brands,
    isError,
    isLoading,
    error,
  } = useGetList("brands", {
    page,
    sortBy: sortField,
    order: sortOrder,
    search: debounceSearch,
  });

  const { mutate: createBrand } = useCreate("brands");
  const { mutate: removeBrand } = useRemove("brands");
  const { mutate: updateBrand } = useUpdate("brands");

  const handleAdd = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
    reset();
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand._id);
    setIsModalOpen(true);
    reset(brand);
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa thương hiệu này?")) {
      removeBrand(id);
      toast.success("Xóa thương hiệu thành công!");
    }
  };

  const handleAddOrEdit = (data) => {
    if (editingBrand) {
      updateBrand({ id: editingBrand, data });
      toast.success("Cập nhật thương hiệu thành công");
    } else {
      createBrand(data);
      toast.success("Thêm thương hiệu thành công");
    }
    setEditingBrand(null);
    setIsModalOpen(false);
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />;
    if (sortOrder === "asc") return <ArrowUp className="h-4 w-4" />;
    if (sortOrder === "desc") return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  const getBrandColor = (index) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
    ];
    return colors[index % colors.length];
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (isError)
    return (
      <div className="text-red-600 text-center">
        Có lỗi xảy ra: {error.message}
      </div>
    );

  return (
    <div className="brand-manager container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Quản lý thương hiệu
        </h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm thương hiệu
        </button>
      </div>

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex items-center">
            <Tag className="h-10 w-10 text-blue-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số thương hiệu</p>
              <p className="text-3xl font-bold text-gray-800">
                {brands?.totalDocs || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên thương hiệu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Brands Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên thương hiệu</span>
                    <button
                      onClick={() => handleSort("name")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("name")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày tạo</span>
                    <button
                      onClick={() => handleSort("createdAt")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("createdAt")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Ngày cập nhật</span>
                    <button
                      onClick={() => handleSort("updatedAt")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("updatedAt")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands?.docs?.map((brand, index) => (
                <tr
                  key={brand._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`h-10 w-10 ${getBrandColor(
                          index
                        )} rounded-full flex items-center justify-center mr-3`}
                      >
                        <Tag className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {brand.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(brand.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(brand.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(brand)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(brand._id)}
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

        {brands?.docs?.length === 0 && (
          <div className="text-center py-12">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {search
                ? "Không tìm thấy thương hiệu phù hợp"
                : "Chưa có thương hiệu nào trong hệ thống"}
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editingBrand
                  ? "Chỉnh sửa thương hiệu"
                  : "Thêm thương hiệu mới"}
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
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tên thương hiệu *
                </label>
                <input
                  {...register("name", {
                    required: "Vui lòng nhập tên thương hiệu",
                    minLength: {
                      value: 2,
                      message: "Tên thương hiệu phải có ít nhất 2 ký tự",
                    },
                  })}
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập tên thương hiệu"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                  {editingBrand ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {brands?.docs?.length || 0} / {brands?.totalDocs || 0} thương
        hiệu
      </div>
    </div>
  );
};

export default BrandManager;
