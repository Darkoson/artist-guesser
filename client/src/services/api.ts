import axios from "axios";
import { iTuneResult } from "../interfaces";
import { ApiResult } from "../shared/types";
 const iTuneEndpoint: string = "https://itunes.apple.com/lookup?";
 const apiEndpoint: string = "http://localhost:4000/";

const iTuneGet = async (queryString: string, opts?: any)=>{
    return axios.get<iTuneResult>(`${iTuneEndpoint}${queryString}`, opts);
    
}
const get = async <T=any>(url: string, opts?: any)=>{
    return axios.get<ApiResult<T>>(`${apiEndpoint}${url}`, opts);
    
}
const post = async <T=any>(url: string, data?: any, opts?: any) =>{
    return axios.post<ApiResult<T>>(`${apiEndpoint}${url}`, data, opts);
    
}
const put = async <T=any>(url: string, data?: any, opts?: any) => {
  return axios.put<ApiResult<T>>(`${apiEndpoint}${url}`, data, opts);
};

const del = async <T=any>(url: string, opts?: any) => {
  return axios.delete<ApiResult<T>>(`${apiEndpoint}${url}`, opts);
};

export default { post, get, put, del, iTuneGet } as const;
