import React from "react";

const LoadingScreen = () => {
  return (
    <div>
      <Oval
        type="TailSpin"
        color="rgb(155, 236, 34)"
        height={70}
        width={70}
        timeout={100}
      />
    </div>
  );
};

export default LoadingScreen;
