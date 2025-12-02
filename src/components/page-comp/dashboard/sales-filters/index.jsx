import { useEffect } from "react";
import { Form, Button, Card } from "antd";
import FormInput from "../../../reusable/form-input";


const SalesFilters = ({ onFilterChange, loading, filters }) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      dateRange: filters.dateRange,
      priceMin: filters.priceMin,
      email: filters.email,
      phone: filters.phone,
    });
  }, [filters, form]);

  const handleSubmit = (values) => {
    onFilterChange({
      dateRange: values.dateRange,
      priceMin: values.priceMin || "",
      email: values.email || "",
      phone: values.phone || "",
    });
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      const values = form.getFieldsValue();

      onFilterChange({
        dateRange: dates,
        priceMin: values.priceMin || "",
        email: values.email || "",
        phone: values.phone || "",
      });
    }
  };

  return (
    <Card title="Filters" className="shadow-sm">
      <Form form={form} onFinish={handleSubmit} layout="vertical">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1 md:gap-4">

          <FormInput
            label="Date Range"
            name="dateRange"
            type="daterange"
            format="YYYY-MM-DD"
            onChange={handleDateRangeChange}
          />

          <FormInput
            label="Minimum Price"
            name="priceMin"
            type="number"
            placeholder="Min Price"
          />

          <FormInput
            label="Customer Email"
            name="email"
            type="email"
            placeholder="Email"
          />

          <FormInput
            label="Phone Number"
            name="phone"
            type="text"
            placeholder="Phone"
          />

          <div className="flex items-center">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-3 !rounded-sm"
              loading={loading}
            >
              Apply Filters
            </Button>
          </div>

        </div>

      </Form>
    </Card>
  );
};

export default SalesFilters;
