import React, { useEffect, useState } from "react";
import { setSorts, clearSorts } from "../store/sortSlice";
import { closeModal } from "../store/modalSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Client } from "../utils/types";

import { IoMdClose } from "react-icons/io";
import { RxDragHandleDots2 } from "react-icons/rx";
import { GoArrowUp, GoArrowDown } from "react-icons/go"; 

interface MultiSortModalProps {
  onClose: () => void;
}

interface sortColumType {
  key: keyof Client;
  label: string;
  type: string;
}

const sortColumns: sortColumType[] = [
  { key: "clientName", label: "Client Name", type: "string" },
  { key: "clientId", label: "Client ID", type: "number" },
  { key: "createdAt", label: "Created At", type: "date" },
  { key: "updatedAt", label: "Updated At", type: "date" },
];

function MultiSortModal({ onClose }: MultiSortModalProps) {
  const dispatch = useAppDispatch();
  const globalSorts = useAppSelector((state) => state.sort.sorts);
  const [sorts, setLocalSorts] = useState(globalSorts);

  useEffect(() => {
    setLocalSorts(globalSorts);
  }, [globalSorts]);

  const handleAdd = (col: sortColumType) => {
    if (!sorts.find((s) => s.key === col.key)) {
      setLocalSorts([...sorts, { key: col.key, direction: "asc" }]);
    }
  };

  const handleDirectionChange = (index: number, dir: "asc" | "desc") => {
    setLocalSorts((prev) =>
      prev.map((s, i) => (i === index ? { ...s, direction: dir } : s))
    );
  };

  const handleRemove = (index: number) => {
    setLocalSorts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setLocalSorts([]);
    dispatch(clearSorts());
  };

  const handleApply = () => {
    dispatch(setSorts(sorts));
    onClose();
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const fromIndex = parseInt(e.dataTransfer.getData("index"), 10);
    if (fromIndex === index) return;
    const updated = [...sorts];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(index, 0, moved);
    setLocalSorts(updated);
  };

  const getLabels = (col: sortColumType) => {
    if (col.type === "date") return ["Newest to Oldest", "Oldest to Newest"];    
    return ["A-Z", "Z-A"];
  };

  return (
    <div className="fixed top-[18%] right-50 inset-0 bg-opacity-50 flex justify-end items-start">
      <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-lg w-xl">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold mb-4">Sort By</h3>
          <IoMdClose size={20} className="cursor-pointer text-gray-400" onClick={()=>dispatch(closeModal())}/>
        </div>
        
        {/* Sort Order */}
        <div className="my-8 space-y-2">
          {sorts.map((sort, index) => {
            const col = sortColumns.find((c) => c.key === sort.key)!;
            const [ascLabel, descLabel] = getLabels(col);
            return (
              <div
                key={sort.key}
                className="flex justify-between items-center bg-gray-100 p-2 rounded cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
              > 
              <div className="flex justify-start items-center gap-2">
                <span><RxDragHandleDots2 size={20} className="text-gray-400"/></span>
                <span className="font-medium">{col.label}</span>
              </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDirectionChange(index, "asc")}
                    className={`flex gap-1 items-center px-2 py-1 text-sm rounded ${
                      sort.direction === "asc"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <GoArrowUp size={16}/> {ascLabel}
                  </button>
                  <button
                    onClick={() => handleDirectionChange(index, "desc")}
                    className={`flex gap-1 items-center px-2 py-1 text-sm rounded ${
                      sort.direction === "desc"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <GoArrowDown size={16}/> {descLabel}
                  </button>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-gray-500 hover:text-red-500 ml-2"
                  >
                    <IoMdClose size={20}/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Columns */}
        <div className="mb-6">
          <p className="font-medium text-sm mb-2">Sort Column:</p>
          <div className="flex flex-wrap gap-2">
            {sortColumns
              .filter(col => !sorts.some(s => s.key === col.key)) 
              .map(col => (
                <button
                  key={col.key}
                  onClick={() => handleAdd(col)}
                  className="px-2 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300"
                >
                  {col.label}
                </button>
              ))
            }
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <button onClick={handleClear} className="text-gray-500 hover:underline cursor-pointer">
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Apply Sort
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiSortModal;
