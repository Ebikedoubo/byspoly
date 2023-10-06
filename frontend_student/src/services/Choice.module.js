import axios from "axios"
import * as urls from "./urls";

const fetchFacultyData = () =>{
    return axios({
        method: "get",
        url: `${urls.facultyUrl}`,
      })
}

const fetchDepartmentData = (id) => {
    return axios({
        method: "get",
        url: `${urls.departmentUrl}/${id}`,
      })
}

export {fetchFacultyData, fetchDepartmentData}