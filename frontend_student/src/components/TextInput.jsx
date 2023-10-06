// import { Select } from "antd";
import React, { Children } from "react";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { styled } from "@mui/system";
import UploadButton from "./UploadButton";
import UploadIcon from "../assests/upload.svg";
import projectUploadIcon from "../assests/projectUploadIcon.svg";
import CircularProgress from "@mui/material/CircularProgress";

const DatePickers = styled(DatePicker)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&:hover fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "red" : "gray",
    },
  },
}));

const Selects = styled(Select)(({ theme, error }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&:hover fieldset": {
      borderColor: error ? "red" : "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "red" : "gray",
    },
  },
}));

export default function TextInput(props) {
  let {
    type,
    label,
    textArea,
    isSelect,
    onChange,
    value,
    options,
    error,
    name,
    ayncs = false,
  } = props;
  //const classes = useStyles();
  const inputClasses =
    "w-full px-4 py-2 rounded-md border-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const errorClasses = "border-red-500 focus:ring-red-500";

  const render = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            {...props}
            autoComplete="none"
            label={label}
            className={`text_area ${props.className} ${
              error ? errorClasses : ""
            }`}
          ></textarea>
        );

      case "select":
        return (
          <div className="flex w-[100%]">
            <div className="w-[90%]">
              <FormControl fullWidth className=" flex ">
                <InputLabel id="demo-simple-select-label" className="">
                  {" "}
                  {label}
                </InputLabel>
                <Selects
                  error={error}
                  labelId="demo-simple-select-label"
                  // id="demo-simple-select"
                  disabled={ayncs}
                  label={label}
                  value={value}
                  className={`${error ? errorClasses : ""}`}
                  onChange={onChange}
                >
                  {options?.map((option) => (
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))}
                </Selects>
              </FormControl>
            </div>
            <div className="w-[10%] grid items-center justify-center  ">
              {ayncs == true ? (
                <CircularProgress style={{ width: "20px", height: "20px" }} />
              ) : null}
            </div>
          </div>
        );

      case "file":
        return (
          <div>
            <UploadButton
              handleOnChange={onChange}
              text={label}
              accept="image/*"
              leftIcon={projectUploadIcon}
              rightIcon={UploadIcon}
              isSelected={isSelect}
              error={error}
            />
          </div>
        );

      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePickers
              error={error}
              name={name}
              label={label}
              value={value}
              onChange={onChange}
              className={`h-[70px] w-[100%]  ${error ? errorClasses : ""}`}
              renderInput={(params) => (
                <TextField
                  className={`  ${error ? errorClasses : ""}`}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        );

      default:
        return (
          <TextField
            {...props}
            autoComplete="none"
            fullWidth
            sx={{ maxWidth: "100%" }}
            className={`flex justify-center ${error ? errorClasses : ""}`}
          />
        );
    }
  };

  return <div>{render()}</div>;
}
