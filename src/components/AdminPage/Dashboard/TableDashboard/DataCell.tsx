//DataCell.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DataItem } from "./types";
import { MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

interface DataCellProps {
  data: DataItem;
  section: string;
}

const DataCell: React.FC<DataCellProps> = ({ data, section }) => {
  const router = useRouter();
  const handleEdit = () => {
    const id = data.id;
    router.push(`/admin/${section}/editdata/${id}`);
  };

  return (
    <>
      {Object.keys(data).map((key, dataIndex) => {
        if (key === "id") return null;
        const value = data[key as keyof DataItem];

        // Convert URL to string if value is URL
        const stringValue = value instanceof URL ? value.toString() : value;

        return (
          <td key={dataIndex} className="p-4">
            <div className="flex max-h-10 max-w-50 flex-col overflow-hidden">
              {key === "slugLink" && stringValue ? (
                <Link
                  className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  href={stringValue}
                >
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                    </svg>
                  </span>
                </Link>
              ) : key === "image" && stringValue ? (
                <Image
                  src={stringValue as string}
                  alt="Image"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              ) : key === "link" && stringValue ? (
                <Link
                  className="relative h-10 max-h-[40px] w-10 max-w-[40px] text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:text-blue-500"
                  type="button"
                  href={stringValue as string}
                >
                  {stringValue}
                </Link>
              ) : (
                <p className="block font-sans text-sm font-normal leading-normal text-blue-gray-900 antialiased">
                  {stringValue}
                </p>
              )}
            </div>
          </td>
        );
      })}
      <td className="p-4">
        <button
          className="flex select-none items-center gap-3 rounded-lg bg-transparent px-3 py-3 text-center align-middle font-sans text-xs font-bold text-black transition-all duration-200 hover:bg-gray-200"
          type="button"
          onClick={handleEdit}
        >
          <MdEdit />
        </button>
      </td>
    </>
  );
};

export default DataCell;
