import React from "react";

export default function Input(props) {
  const { error, ...otherProps } = props;
  const clsx = error ? "input-wrapper error" : "input-wrapper";

  return (
    <span className={clsx}>
      <input {...otherProps} />
    </span>
  );
}