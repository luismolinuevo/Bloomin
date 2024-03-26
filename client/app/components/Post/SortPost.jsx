import React from "react";
import Select from "react-select";
import { sort } from "@/app/utils/SelectOptions";

export default function SortPost({ setSortType }) {
  const handleSortChange = (selectedOption) => {
    // Extract the value of the selected option and pass it to setSortType
    const newSortType = selectedOption.value;
    setSortType(newSortType);
  };

  return (
    <div>
      {/* <button className="bg-[#459858] text-white rounded-2xl p-2">
        Sort by
      </button> */}
      <Select
        label="Sort by"
        options={sort}
        className="border-[#459858] border-2 text-center"
        onChange={handleSortChange}
      />
    </div>
  );
}
