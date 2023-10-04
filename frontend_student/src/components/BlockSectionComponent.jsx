import React from "react";

export default function BlockSectionComponent(props) {
  const { children, title, top } = props;
  return (
    <div
      className={`pr-[10px] pl-[10px] relative ${
        top ? `mt-${top}` : "mt-10"
      }   border-2 border-[#ccc] rounded-md pb-[20px] pt-[20px] before:block before:absolute before:bg-white before:content-[attr(data-title)] before:top-[-18px] before:z-50 before:h-8 before:p-[10px] before:left-[3%] before:grid before:justify-center before:pl-[10px] before:pr-[10px] before:content-center before:border-2 before:border-[#ccc] `}
      data-title={title}
    >
      {children}
    </div>
  );
}
