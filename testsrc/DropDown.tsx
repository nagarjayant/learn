import React from "react";

type DropdownProps = {
  data: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const DropDown = ({ data, onChange }: DropdownProps) => {
  return (
    <select onChange={onChange}>
      {data.map((item: string) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
};

export default React.memo(DropDown);
