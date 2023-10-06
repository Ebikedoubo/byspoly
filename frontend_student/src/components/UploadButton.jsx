import React, { useRef } from "react";
import DoneIcon from '@mui/icons-material/Done';
export default function UploadButton({
  leftIcon,
  rightIcon,
  handleOnChange,
  text,
  accept,
  isSelected,
  error
}) {
  const errorClasses = "border flex rounded-md h-[100%] w-[100%] border-red-500 focus:ring-red-500"
  const fileRef = useRef(null);
  return (
    <div className={`h-[58px] flex justify-between items-center  w-[100%]`}>
      <div
        onClick={() => {
          fileRef.current.click();
        }}
        className={`${error ? errorClasses : 'border flex rounded-md h-[100%] w-[100%]'}`}
      >
        <div className="border-r-2 p-2 flex items-center ">
          <img src={leftIcon} alt="house" />
        </div>
        <div className="w-[100%] text-center flex items-center font-medium text-[15px] p-2 gap-4 cursor-pointer">
          <div
            className="w-[80%]"
          >
            <input
              type="file"
              onChange={handleOnChange}
              style={{ display: "none" }}
              ref={fileRef}
              accept={accept}
            />
            {text}
          </div>
          <div clasName="text-center ">
            {isSelected.length > 0 ? <DoneIcon className="text-[green]" /> :  
            <img src={rightIcon} alt="upload" />
      }
          </div>
        </div>
      </div>
    </div>
  );
}
