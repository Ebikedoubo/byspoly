import axios from "axios"
import * as urls from "./urls";

const currentApplicationFeeData = () =>{
    return axios({
        method: "get",
        url: `${urls.currentApplicationFeeUrl}`,
      })
}

export {currentApplicationFeeData}