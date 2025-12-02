import { useState, useEffect, useCallback } from "react";
import { getAuthorize, getSales } from "../../../services/api";
import SalesFilters from "../../../components/page-comp/dashboard/sales-filters";
import SalesChart from "../../../components/page-comp/dashboard/sales-chart";
import SalesTable from "../../../components/page-comp/dashboard/sales-table";
import dayjs from "dayjs";
import Swal from "sweetalert2";


const Dashboard = () => {

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [pagination, setPagination] = useState({ before: "", after: "" });
  const [filters, setFilters] = useState({
    dateRange: [dayjs("2025-01-01"), dayjs("2025-01-31")],
    priceMin: "",
    email: "",
    phone: "",
    sortBy: "date",
    sortOrder: "asc",
  });

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Get authorization token
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await getAuthorize();
        setToken(response.token);
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Unauthorized!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    };
    fetchToken();
  }, []);

  // Fetch sales data
  const fetchSalesData = useCallback(
    async (paginationParams = {}) => {
      if (!token) return;

      setLoading(true);
      try {

        const params = {
          token,
          startDate: filters.dateRange?.[0]?.format("YYYY-MM-DD") || "",
          endDate: filters.dateRange?.[1]?.format("YYYY-MM-DD") || "",
          priceMin: filters.priceMin || "",
          email: filters.email || "",
          phone: filters.phone || "",
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          after: paginationParams.after || "",
          before: paginationParams.before || "",
        };

        const response = await getSales(params);

        const sales = Array.isArray(response?.results?.Sales)
          ? response.results.Sales
          : response.Sales || [];

        const totals = Array.isArray(response?.results?.TotalSales)
          ? response.results.TotalSales
          : response.TotalSales || [];

        setSalesData(sales);
        setTotalSales(totals);

        setPagination({
          before: response.pagination?.before || "",
          after: response.pagination?.after || "",
        });

      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Error fetching data!",
          showConfirmButton: false,
          timer: 1500
        });
      } finally {
        setLoading(false);
      }
    },
    [token, filters]
  );

  // Fetch data om filters or token change
  useEffect(() => {
    if (token) fetchSalesData();
  }, [token, fetchSalesData]);

  // filter change fn
  const handleFilterChange = (newFilters) => {
    updateFilters(newFilters);
    setPagination({ before: "", after: "" });
  };

  // sort fn
  const handleSort = (column) => {
    if (filters.sortBy === column) {
      updateFilters({
        sortOrder: filters.sortOrder === "asc" ? "desc" : "asc"
      });
    } else {
      updateFilters({ sortBy: column, sortOrder: "asc" });
    }

    setPagination({ before: "", after: "" });
  };

  // Pagination
  const handleNext = () => {
    if (pagination.after) {
      fetchSalesData({ after: pagination.after });
    }
  };

  const handlePrevious = () => {
    if (pagination.before) {
      fetchSalesData({ before: pagination.before });
    }
  };

  return (
    <div className="pb-10">
      <h1 className="text-lg md:text-xl font-bold pb-4">Sales Dashboard</h1>

      <div className="!space-y-6">

        {/* ⭐ FIXED: Pass the new filter object */}
        <SalesFilters
          onFilterChange={handleFilterChange}
          loading={loading}
          filters={filters}
        />

        <SalesChart totalSales={totalSales} />

        <SalesTable
          salesData={salesData}
          loading={loading}
          sortBy={filters.sortBy}
          sortOrder={filters.sortOrder}
          onSort={handleSort}
          pagination={pagination}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default Dashboard;
