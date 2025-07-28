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
  Folder,
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

const CategoryManager = () => {
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
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const debounceSearch = debouncedSearch(search, 500);

  const {
    data: categories,
    isError,
    isLoading,
    error,
  } = useGetList("categories", {
    page,
    sortBy: sortField,
    order: sortOrder,
    search: debounceSearch,
  });

  const { mutate: createCategory } = useCreate("categories");
  const { mutate: removeCategory } = useRemove("categories");
  const { mutate: updateCategory } = useUpdate("categories");

  const handleAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
    reset();
  };

  const handleEdit = (category) => {
    setEditingCategory(category._id);
    setIsModalOpen(true);
    reset(category);
  };

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      removeCategory(id);
      toast.success("Xóa danh mục thành công!");
    }
  };

  const handleAddOrEdit = (data) => {
    if (editingCategory) {
      updateCategory({ id: editingCategory, data });
      toast.success("Cập nhật danh mục thành công");
    } else {
      createCategory(data);
      toast.success("Thêm danh mục thành công");
    }
    setEditingCategory(null);
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

  const getCategoryColor = (index) => {
    const colors = [
      "bg-emerald-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-teal-500",
      "bg-cyan-500",
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
    <div className="category-manager container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý danh mục</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm danh mục
        </button>
      </div>

      {/* Statistics Card */}
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-emerald-500">
          <div className="flex items-center">
            <Folder className="h-10 w-10 text-emerald-500 mr-4" />
            <div>
              <p className="text-sm text-gray-600">Tổng số danh mục</p>
              <p className="text-3xl font-bold text-gray-800">
                {categories?.totalDocs || 0}
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
            placeholder="Tìm kiếm theo tên danh mục..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên danh mục</span>
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
              {categories?.docs?.map((category, index) => (
                <tr
                  key={category._id}
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
                        className={`h-10 w-10 ${getCategoryColor(
                          index
                        )} rounded-full flex items-center justify-center mr-3`}
                      >
                        <Folder className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(category.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(category.updatedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Chỉnh sửa"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
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

        {categories?.docs?.length === 0 && (
          <div className="text-center py-12">
            <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              {search
                ? "Không tìm thấy danh mục phù hợp"
                : "Chưa có danh mục nào trong hệ thống"}
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
                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
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
                  Tên danh mục *
                </label>
                <input
                  {...register("name", {
                    required: "Vui lòng nhập tên danh mục",
                    minLength: {
                      value: 2,
                      message: "Tên danh mục phải có ít nhất 2 ký tự",
                    },
                  })}
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Nhập tên danh mục"
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
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {editingCategory ? "Cập nhật" : "Thêm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-600">
        Hiển thị: {categories?.docs?.length || 0} / {categories?.totalDocs || 0}{" "}
        danh mục
      </div>
    </div>
  );
};

export default CategoryManager;
