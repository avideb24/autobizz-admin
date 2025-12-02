import React from "react";
import { Input, Select, Radio, Checkbox, DatePicker, Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;


const FormInput = ({
    label,
    name,
    type = "text",
    options = [],
    placeholder = "",
    Required = false,
    defaultValue = "",
    ...rest
}) => {
    const inputStyle = { borderRadius: "4px" }; // Rounded-sm equivalent

    return (
        <Form.Item
            label={label}
            name={name}
            rules={Required ? [{ required: true, message: `${label} is required` }] : []}
            labelCol={{ span: 24, style: { marginBottom: 0, paddingBottom: 0 } }}
            wrapperCol={{ span: 24 }}
            style={{ marginBottom: 10 }}
        >
            {type === "text" && <Input placeholder={placeholder} style={inputStyle} {...rest} />}
            {type === "number" && (
                <Input
                    type="number"
                    placeholder={placeholder}
                    style={{ ...inputStyle, appearance: "none", MozAppearance: "textfield" }}
                    {...rest}
                />
            )}
            {type === "textarea" && <TextArea rows={4} placeholder={placeholder} style={inputStyle} {...rest} />}
            {type === "select" && (
                <Select placeholder={placeholder} defaultValue={defaultValue} style={inputStyle} {...rest}>
                    <Option value="" disabled>
                        Choose one option
                    </Option>
                    {options.map((option) => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            )}
            {type === "radio" && (
                <Radio.Group {...rest}>
                    {options.map((option) => (
                        <Radio key={option.value} value={option.value}>
                            {option.label}
                        </Radio>
                    ))}
                </Radio.Group>
            )}
            {type === "checkbox" && <Checkbox {...rest}>{label}</Checkbox>}
            {type === "date" && <DatePicker style={inputStyle} {...rest} />}
            {type === "datepicker" && <DatePicker showTime style={inputStyle} {...rest} />}
            {type === "daterange" && <RangePicker style={inputStyle} className="w-full" {...rest} />}


            {/* Email Field */}
            {type === "email" && <Input type="email" placeholder={placeholder} style={inputStyle} {...rest} />}

            {/* Password Field */}
            {type === "password" && <Input.Password placeholder={placeholder} style={inputStyle} {...rest} />}

            {/* Image Upload Field */}
            {type === "image" && (
                <Upload
                    name={name}
                    listType="picture"
                    beforeUpload={() => false} // Prevent auto-upload
                    {...rest}
                >
                    <Button icon={<UploadOutlined />} style={inputStyle}>Upload Image</Button>
                </Upload>
            )}
             {/* Color Picker Field */}
             {type === "color" && <Input type="color" defaultValue={defaultValue} style={{ ...inputStyle, width: "100%", height: "40px" }} {...rest} />}
        </Form.Item>
    );
};

export default FormInput;
