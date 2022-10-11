import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import AnimatedProgressbar from "./AnimatedProgressbar";

const Progressbar = ({ votes }) => {
  return (
    <AnimatedProgressbar values={[0, votes.toFixed(1) * 10 || 70]}>
      {(percentage) => (
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#202020",
            fontSize: "1px",
            textColor: "#fff",
            pathColor: "#00b33c",
            trailColor: "rgb(33, 69, 33)",
          })}
        />
      )}
    </AnimatedProgressbar>
  );
};

export default Progressbar;
