import axios from "axios"
import * as urls from "./urls";

const jambData = () =>{
    return axios({
        method: "get",
        url: `${urls.jambUrl}`,
      })
}

export {jambData}