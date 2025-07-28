"use client";

import { useState, useMemo } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  Calendar,
  Eye,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetList } from "../customHooks/apiHook";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7days");

  const { data: orders, isLoading: ordersLoading } = useGetList("orders", {
    limit: 100,
    sortBy: "createdAt",
    order: null,
    search: "",
  });
  const { data: products, isLoading: productsLoading } = useGetList(
    "products",
    { limit: 100, sortBy: "createdAt", order: null, search: "" }
  );
  const { data: users, isLoading: usersLoading } = useGetList("users", {
    limit: 100,
    sortBy: "createdAt",
    order: null,
    search: "",
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      month: "short",
      day: "numeric",
    });
  };

  // Calculate statistics
  const stats = useMemo(() => {
    if (!orders?.docs) return null;

    const totalRevenue = orders.docs.reduce(
      (sum, order) => sum + order.total,
      0
    );

    const successfulRevenue = orders.docs
      .filter((order) => order.status === "success")
      .reduce((sum, order) => sum + order.total, 0);

    const totalOrders = orders.docs.length;

    const successfulOrders = orders.docs.filter(
      (order) => order.status === "success"
    ).length;

    const pendingOrders = orders.docs.filter((order) =>
      ["ordered", "progress", "shipping"].includes(order.status)
    ).length;

    const revenueGrowth = 12.5;
    const orderGrowth = 8.3;
    const userGrowth = 15.2;

    return {
      totalRevenue,
      successfulRevenue,
      totalOrders,
      successfulOrders,
      pendingOrders,
      totalProducts: products?.totalDocs || 0,
      totalUsers: users?.totalDocs || 0,
      revenueGrowth,
      orderGrowth,
      userGrowth,
    };
  }, [orders, products, users]);

  // Generate revenue chart data
  const revenueChartData = useMemo(() => {
    if (!orders?.docs) return [];

    const now = new Date();
    const days =
      timeRange === "7days"
        ? 7
        : timeRange === "30days"
        ? 30
        : timeRange === "90days"
        ? 90
        : 365;

    const data = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const dayOrders = orders.docs.filter((order) => {
        const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
        return orderDate === dateStr;
      });

      const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
      const successRevenue = dayOrders
        .filter((order) => order.status === "success")
        .reduce((sum, order) => sum + order.total, 0);

      data.push({
        date: formatDate(date.toISOString()),
        revenue: revenue / 1000000, // Convert to millions for better display
        successRevenue: successRevenue / 1000000,
        orders: dayOrders.length,
      });
    }

    return data;
  }, [orders, timeRange]);

  // Status distribution data
  const statusData = useMemo(() => {
    if (!orders?.docs) return [];

    const statusCount = orders.docs.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const statusLabels = {
      ordered: "Đã đặt hàng",
      cancel: "Đã hủy",
      progress: "Đang xử lý",
      shipping: "Đang giao",
      success: "Thành công",
      fail: "Thất bại",
    };

    const colors = {
      ordered: "#3B82F6",
      cancel: "#EF4444",
      progress: "#F59E0B",
      shipping: "#8B5CF6",
      success: "#10B981",
      fail: "#EF4444",
    };

    return Object.entries(statusCount).map(([status, count]) => ({
      name: statusLabels[status] || status,
      value: count,
      color: colors[status] || "#6B7280",
    }));
  }, [orders]);

  // Recent orders
  const recentOrders = useMemo(() => {
    if (!orders?.docs) return [];
    return orders.docs
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [orders]);

  if (ordersLoading || productsLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="dashboard container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan về hoạt động kinh doanh</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="90days">90 ngày qua</option>
            <option value="1year">1 năm qua</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Tổng doanh thu
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatPrice(stats?.totalRevenue || 0)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  +{stats?.revenueGrowth || 0}%
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  so với tháng trước
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng đơn hàng</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalOrders || 0}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">
                  +{stats?.orderGrowth || 0}%
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  so với tháng trước
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalProducts || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Package className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Tổng khách hàng
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalUsers || 0}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600">
                  +{stats?.userGrowth || 0}%
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  so với tháng trước
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Biểu đồ doanh thu
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Tổng doanh thu</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">
                  Doanh thu thành công
                </span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `${value}M`} />
              <Tooltip
                formatter={(value, name) => [
                  `${value.toFixed(1)}M VND`,
                  name === "revenue"
                    ? "Tổng doanh thu"
                    : "Doanh thu thành công",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="successRevenue"
                stackId="2"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Phân bố trạng thái đơn hàng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [value, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Số lượng đơn hàng theo ngày
          </h3>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => [value, "Số đơn hàng"]} />
            <Bar dataKey="orders" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Đơn hàng gần đây
          </h3>
          <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
            Xem tất cả
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Mã đơn hàng
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Khách hàng
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Tổng tiền
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Trạng thái
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Ngày tạo
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <span className="font-mono text-sm">
                      #{order._id.slice(-8)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.user?.username}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.user?.email}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-green-600">
                      {formatPrice(order.total)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "success"
                          ? "bg-green-100 text-green-800"
                          : order.status === "cancel"
                          ? "bg-red-100 text-red-400"
                          : order.status === "progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "shipping"
                          ? "bg-purple-100 text-purple-800"
                          : order.status === "fail"
                          ? "bg-red-400 text-red-900"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status === "success"
                        ? "Thành công"
                        : order.status === "cancel"
                        ? "Đã hủy"
                        : order.status === "progress"
                        ? "Đang xử lý"
                        : order.status === "shipping"
                        ? "Đang giao"
                        : order.status === "fail"
                        ? "Thất bại"
                        : "Đã đặt hàng"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
