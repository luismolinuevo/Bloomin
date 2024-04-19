"use client";

import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import Select from "react-select";
import {
  implementationDifficulty,
  housingOption,
} from "../../utils/SelectOptions.js";

export default function PostSearch({
  page,
  location,
  livingSituation,
  difficulty,
  reload,
}) {
  const titleStyles = page == "home" ? "text-center text-white" : "";
  const inputStyles = page == "home" ? "bg-white" : "bg-[#D9D9D9] w-[500px]";
  const subTitleStyles = page == "home" ? "text-white" : "text-black";

  const [filterLocation, setFilterLocation] = useState("");
  const [filterLivingSituation, setFilterLivingSituation] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("");

  const filterPost = () => {
    location(filterLocation);
    livingSituation(filterLivingSituation);
    difficulty(filterDifficulty);
    reload();
  };

  const clearFilter = () => {
    setFilterDifficulty("");
    setFilterLivingSituation("");
    setFilterLocation("");
    location("");
    livingSituation("");
    difficulty("");
    reload();
  };

  const handleHousingTypeChange = (selectedOption) => {
    setFilterLivingSituation(selectedOption.value);
  };

  const handleImplementationDifficultyChange = (selectedOption) => {
    setFilterDifficulty(selectedOption.value);
  };

  return (
    <div className="px-12 md:px-16 py-10 md:py-20">
      <h1 className={`${titleStyles} text-[30px] md:text-[40px]`}>
        Find Sustainable Solutions for Your Home
      </h1>
      <div>
        <label className={subTitleStyles}>Location</label>
        <Input
          placeholder="enter city, site, and zipcode"
          className={inputStyles}
          onChange={(e) => setFilterLocation(e.target.value)}
          value={filterLocation}
        />
        <div className="flex flex-col md:flex-row md:justify-normal md:items-end md:gap-20 mt-4">
          <div className="mb-4 md:mb-0">
            <label className={subTitleStyles}>Living Situation</label>

            <Select
              value={
                filterLivingSituation !== ""
                  ? housingOption.find(
                      (option) => option.value === filterLivingSituation
                    )
                  : null
              }
              onChange={handleHousingTypeChange}
              options={housingOption}
            />
          </div>
          <div className="mb-4 md:mb-0">
            <label className={subTitleStyles}>Type</label>
            <Select
              value={
                filterDifficulty !== ""
                  ? implementationDifficulty.find(
                      (option) => option.value === filterDifficulty
                    )
                  : null
              }
              onChange={handleImplementationDifficultyChange}
              options={implementationDifficulty}
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-[#459858] px-4 rounded-lg text-white h-[40px]"
              onClick={filterPost}
            >
              Submit
            </button>
            <button
              className="border-[#459858] border px-4 rounded-lg text-[#459858] h-[40px]"
              onClick={clearFilter}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
