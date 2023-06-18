import React, { useState } from "react";

interface Props {
  handlePeriodFilter: (period: string) => void;
  handleSortOption: (option: string) => void;
  periodTxt: string;
  sortTxt: string;
}

const PeriodDropDown: React.FC<Props> = ({
  handlePeriodFilter,
  handleSortOption,
  periodTxt,
  sortTxt,
}) => {
  const [periodDropdownOpen, setPeriodDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const togglePeriodDropdown = () => {
    setPeriodDropdownOpen(!periodDropdownOpen);
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  const handlePeriodItemClick = (period: string) => {
    handlePeriodFilter(period);
    setPeriodDropdownOpen(false);
  };

  const handleSortItemClick = (option: string) => {
    handleSortOption(option);
    setSortDropdownOpen(false);
  };

  return (
    <div className="mb-[10px]">
      <div className="relative inline-block mr-[5px]">
        <button
          id="periodDropdown"
          className="flex flex-row justify-between w-[150px] text-start hover:border-gray-500 bg-white border py-2 px-4 rounded"
          onClick={togglePeriodDropdown}
        >
          {periodTxt}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 11L12 14L9 11"
              stroke="#6F7383"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {periodDropdownOpen && (
          <div className="absolute top-12 w-[150px] max-h-[324px] mt-[15px] overflow-y-auto left-0 z-10 bg-white border rounded-md shadow-md">
            <div className="flex flex-col">
              <button
                onClick={() => {
                  handlePeriodItemClick("1h");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 1 საათი
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("2h");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 2 საათი
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("3h");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 3 საათი
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("1d");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 1 დღე
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("2d");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 2 დღე
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("3d");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 3 დღე
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("1w");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 1 კვირა
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("2w");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 2 კვირა
              </button>
              <button
                onClick={() => {
                  handlePeriodItemClick("3w");
                }}
                className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
              >
                ბოლო 3 კვირა
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="relative inline-block">
        <button
          id="sortDropdown"
          className="flex flex-row justify-between w-[175px] text-start hover:border-gray-500 bg-white border py-2 px-4 rounded"
          onClick={toggleSortDropdown}
        >
          {sortTxt}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 11L12 14L9 11"
              stroke="#6F7383"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        {sortDropdownOpen && (
          <div className="absolute top-12 w-[175px] max-h-[324px] mt-[15px] overflow-y-auto left-0 z-10 bg-white border rounded-md shadow-md">
            <button
              onClick={() => handleSortItemClick("1")}
              className="w-[175px] text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
            >
              თარიღი კლებადი
            </button>
            <button
              onClick={() => handleSortItemClick("2")}
              className="w-[175px] text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
            >
              თარიღი ზრდადი
            </button>
            <button
              onClick={() => handleSortItemClick("3")}
              className="w-[175px] text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
            >
              ფასი კლებადი
            </button>
            <button
              onClick={() => handleSortItemClick("4")}
              className=" w-[175px] text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
            >
              ფასი ზრდადი
            </button>
            <button
              onClick={() => handleSortItemClick("5")}
              className="text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
            >
              გარბენი კლებადი
            </button>
            <button
              onClick={() => handleSortItemClick("6")}
              className="w-[175px] text-left p-[2px] hover:bg-gray-300 hover:text-black text-gray-500"
            >
              გარბენი ზრდადი
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodDropDown;
