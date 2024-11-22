import React from "react";

type inputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputElement = ({ onChange }: inputProps) => {
  return <input type="text" onChange={onChange} />;
};

export default React.memo(InputElement);
