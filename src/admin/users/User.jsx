"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useGetList, useUpdate } from "../../customHooks/apiHook";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import { debouncedSearch } from "../../customHooks/debounceSearch";
import Pagination from "../../components/Pagination";

const UserManager = () => {
  let [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState("createdAt");

  const [search, setSearch] = useState("");
  const debounceSearch = debouncedSearch(search, 500);

  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useGetList("users", {
    page,
    sortBy: sortField,
    order: sortOrder,
    search: debounceSearch,
  });

  const { mutate: updateUser } = useUpdate("users");

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

  const totalUsers = users?.totalDocs || 0;

  return (
    <div className="user-manager container mx-auto p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Tổng người dùng
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tên người dùng</span>
                    <button
                      onClick={() => handleSort("username")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("username")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Email</span>
                    <button
                      onClick={() => handleSort("email")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("email")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Vai trò</span>
                    <button
                      onClick={() => handleSort("role")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("role")}
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users?.docs?.map((user) => {
                return (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {user.avatar ? (
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.username}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        {user.phone ? (
                          <>
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {user.phone}
                          </>
                        ) : (
                          <span className="text-gray-400">Chưa có</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          if (newRole !== user.role) {
                            updateUser(
                              { id: user._id, data: { role: newRole } },
                              {
                                onSuccess: () =>
                                  toast.success("Cập nhật vai trò thành công"),
                                onError: () => toast.error("Cập nhật thất bại"),
                              }
                            );
                          }
                        }}
                        className="text-sm border border-gray-300 rounded-md px-2 py-1"
                      >
                        <option value="admin">Quản trị viên</option>
                        <option value="user">Người dùng</option>
                      </select>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={users?.totalPages || 1}
        href="admin/users"
      />
    </div>
  );
};

export default UserManager;
