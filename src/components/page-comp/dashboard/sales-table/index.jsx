import { Button, Space, Card } from "antd";
import Table from "../../../reusable/table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import dayjs from "dayjs";

const SalesTable = ({
  salesData = [],
  loading = false,
  sortBy,
  sortOrder,
  onSort,
  pagination,
  onNext,
  onPrevious,
}) => {
  // Get sort icon
  const getSortIcon = (column) => {
    if (sortBy !== column) {
      return <FaSort className="text-gray-400" />;
    }
    return sortOrder === "asc" ? (
      <FaSortUp className="text-blue-500" />
    ) : (
      <FaSortDown className="text-blue-500" />
    );
  };

  // Prepare table headers
  const headers = [
    {
      title: "ID",
      key: "_id",
      dataIndex: "_id",
      render: (text) => <span className="font-mono text-xs">{text}</span>,
    },
    {
      title: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onSort("date")}
        >
          Date
          {getSortIcon("date")}
        </div>
      ),
      key: "date",
      dataIndex: "date",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onSort("price")}
        >
          Price
          {getSortIcon("price")}
        </div>
      ),
      key: "price",
      dataIndex: "price",
      render: (price) => `$${price.toLocaleString()}`,
    },
    {
      title: "Customer Email",
      key: "customerEmail",
      dataIndex: "customerEmail",
    },
    {
      title: "Customer Phone",
      key: "customerPhone",
      dataIndex: "customerPhone",
    },
  ];

  // Prepare data with key field for table
  const tableData = salesData.map((item) => ({
    ...item,
    key: item._id,
  }));


  return (
    <Card
      title="Sales Data"
      extra={
        <Space>
          <Button
            onClick={onPrevious}
            disabled={!pagination?.before || loading}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!pagination?.after || loading}
            type="primary"
          >
            Next
          </Button>
        </Space >
      }
      className="shadow-sm"
    >
      <div className="overflow-x-auto">
        <Table
          headers={headers}
          data={tableData}
          pagination={false}
          loading={loading}
        />
      </div>
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {salesData.length} items per page
      </div>
    </Card >
  );
};

export default SalesTable;

