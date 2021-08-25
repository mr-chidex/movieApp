import React from "react";
import { FadeLoader } from "react-spinners";
import colors from "../utils/colors";

function Loader() {
  return <FadeLoader color={colors.secondary} size={200} />;
}

export default Loader;
