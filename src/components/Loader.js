import React from "react";
import { FadeLoader } from "react-spinners";
import colors from "../utils/colors";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FadeLoader color={colors.secondary} size={200} />
    </div>
  );
}

export default Loader;
