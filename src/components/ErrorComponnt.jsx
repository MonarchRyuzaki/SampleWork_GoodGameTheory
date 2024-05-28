import { Alert } from "antd";

const ErrorComponent = ({ errorMessage }) => {
  return (
    <Alert message="Error" description={errorMessage} type="error" showIcon />
  );
};

export default ErrorComponent;
