import axios from "axios"
import * as urls from "./urls";

const state = () =>{
    console.log("stateur", urls.stateUrl)
    return axios({
        method: "get",
        url: `${urls.stateUrl}`,
      })
}

const localGovts = (id) => {
    return axios({
        method: "get",
        url: `${urls.localGovtUrl}/${id}`,
      })
}

export {state, localGovts}