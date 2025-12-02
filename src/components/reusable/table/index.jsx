import React from "react";
import { Table as AntTable, Button, Space } from "antd";

const Table = ({
    headers,
    data,
    actions = [],
    onActionClick = () => {},
    pagination = true,
    pageSize = 10,
    customRender = {},
    ...rest
}) => {
    const tableColumns = [
        ...headers.map((col) => ({
            ...col,
            align: 'center',
            render: customRender[col.key] || col.render, // Use custom render if provided
        })),
        actions.length > 0 && {
            title: "Actions",
            key: "actions",
            align: "center",
            render: (_, record) => (
                <Space className="space-x-2 text-lg">
                    {actions.map(({ label, button }, idx) => (
                        <div key={label || idx} onClick={() => onActionClick(label, record)}>
                            {button}
                        </div>
                    ))}
                </Space>
            ),
        },
    ].filter(Boolean);

    return (
        <AntTable
            columns={tableColumns}
            dataSource={data}
            pagination={pagination ? { pageSize, showSizeChanger: true, pageSizeOptions: ["10", "20", "50"] } : false}
            rowKey="key"
            bordered
            size="middle"
            loading={rest.loading}
            {...rest}
            className="font-primary"
        />
    );
};

export default Table;
