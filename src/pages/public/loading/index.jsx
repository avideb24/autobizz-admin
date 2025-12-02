import { Flex, Spin } from "antd";


const Loading = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Flex align="center" gap="middle">
                <Spin size="large" />
            </Flex>
        </div>
    );
};

export default Loading;