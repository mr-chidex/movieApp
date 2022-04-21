import React from "react";
import colors from "../utils/colors";

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <h1
        style={{
          paddingTop: "20px",
          textAlign: "center",
          marginBottom: "60vh",
          color: colors.secondary,
        }}
      >
        {message}
      </h1>
    </div>
  );
};

export default ErrorMessage;
