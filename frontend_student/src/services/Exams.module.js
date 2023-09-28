import axios from "axios"
import * as urls from "./urls";

const examTypeData = () =>{
    return axios({
        method: "get",
        url: `${urls.examTypeUrl}`,
      })
}

export {examTypeData}