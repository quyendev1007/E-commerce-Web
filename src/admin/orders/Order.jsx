"use client";

import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  ShoppingCart,
  Clock,
  CheckCircle,
  X,
  User,
  Package,
  Calendar,
} from "lucide-react";
import { useGetList, useUpdate } from "../../customHooks/apiHook";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router";
import { debouncedSearch } from "../../customHooks/debounceSearch";
import Pagination from "../../components/Pagination";

const OrderManager = () => {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState("createdAt");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const debounceSearch = debouncedSearch(search, 500);

  const {
    data: orders,
    isError,
    isLoading,
    error,
  } = useGetList("orders", {
    page,
    sortBy: sortField,
    order: sortOrder,
    search: debounceSearch,
    status: statusFilter,
  });

  const { mutate: updateOrder } = useUpdate("orders");

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      ordered: {
        label: "Đã đặt hàng",
        color: "bg-blue-100 text-blue-800",
        icon: <ShoppingCart className="h-3 w-3" />,
      },
      cancel: {
        label: "Đã hủy",
        color: "bg-red-100 text-red-800",
        icon: <X className="h-3 w-3" />,
      },
      progress: {
        label: "Đang xử lý",
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="h-3 w-3" />,
      },
      shipping: {
        label: "Đang giao",
        color: "bg-purple-100 text-purple-800",
        icon: <Package className="h-3 w-3" />,
      },
      success: {
        label: "Thành công",
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="h-3 w-3" />,
      },
      fail: {
        label: "Thất bại",
        color: "bg-red-100 text-red-800",
        icon: <X className="h-3 w-3" />,
      },
    };

    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
      icon: <Clock className="h-3 w-3" />,
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </span>
    );
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrder(
      { id: orderId, data: { status: newStatus } },
      {
        onSuccess: () => toast.success("Cập nhật trạng thái thành công"),
        onError: () => toast.error("Cập nhật thất bại"),
      }
    );
  };

  const handleViewDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
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

  const totalOrders = orders?.totalDocs || 0;

  return (
    <div className="order-manager container mx-auto p-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng, email, mã đơn hàng..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="ordered">Đã đặt hàng</option>
            <option value="cancel">Đã hủy</option>
            <option value="progress">Đang xử lý</option>
            <option value="shipping">Đang giao</option>
            <option value="success">Thành công</option>
            <option value="fail">Thất bại</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Khách hàng</span>
                    <button
                      onClick={() => handleSort("user.username")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("user.username")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Tổng tiền</span>
                    <button
                      onClick={() => handleSort("total")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("total")}
                    </button>
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <span>Trạng thái</span>
                    <button
                      onClick={() => handleSort("status")}
                      className="p-1 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                      {getSortIcon("status")}
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
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.docs?.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      #{order._id.slice(-8)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.user?.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.user?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {order.orderDetails?.slice(0, 3).map((detail) => (
                        <div
                          key={detail._id}
                          className="h-8 w-8 rounded-full overflow-hidden bg-gray-100 border-2 border-white"
                          title={detail.product?.name}
                        >
                          {detail.product?.image ? (
                            <img
                              src={detail.product.image || "/placeholder.svg"}
                              alt={detail.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <Package className="h-4 w-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                      ))}
                      {order.orderDetails?.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            +{order.orderDetails.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {order.orderDetails?.length} sản phẩm
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {formatPrice(order.total)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="text-sm border border-gray-300 rounded-md px-2 py-1"
                    >
                      <option value="ordered">Đã đặt hàng</option>
                      <option value="cancel">Đã hủy</option>
                      <option value="progress">Đang xử lý</option>
                      <option value="shipping">Đang giao</option>
                      <option value="success">Thành công</option>
                      <option value="fail">Thất bại</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewDetail(order)}
                        className="p-1.5 border border-gray-300 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders?.docs?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {search || statusFilter
                ? "Không tìm thấy đơn hàng phù hợp"
                : "Không có đơn hàng nào"}
            </p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Chi tiết đơn hàng #{selectedOrder._id.slice(-8)}
              </h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Thông tin khách hàng
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Tên:</span>{" "}
                    {selectedOrder.user?.username}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.user?.email}
                  </p>
                  <p>
                    <span className="font-medium">Trạng thái:</span>{" "}
                    {getStatusBadge(selectedOrder.status)}
                  </p>
                </div>
              </div>

              {/* Order Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Thông tin đơn hàng
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Mã đơn hàng:</span> #
                    {selectedOrder._id.slice(-8)}
                  </p>
                  <p>
                    <span className="font-medium">Ngày tạo:</span>{" "}
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium">Tổng tiền:</span>
                    <span className="text-green-600 font-bold ml-1">
                      {formatPrice(selectedOrder.total)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Sản phẩm ({selectedOrder.orderDetails?.length})
              </h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Sản phẩm
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Đơn giá
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Số lượng
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.orderDetails?.map((detail) => (
                      <tr key={detail._id}>
                        <td className="px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 mr-3">
                              {detail.product?.image ? (
                                <img
                                  src={
                                    detail.product.image || "/placeholder.svg"
                                  }
                                  alt={detail.product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {detail.product?.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {detail.product?.description?.substring(0, 50)}
                                ...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {formatPrice(detail.price)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {detail.quantity}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {formatPrice(detail.price * detail.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total */}
            <div className="mt-6 flex justify-end">
              <div className="bg-gray-50 rounded-lg p-4 w-64">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-green-600">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={orders?.totalPages || 1}
        href="admin/orders"
      />
    </div>
  );
};

export default OrderManager;
