import axios, { AxiosInstance, AxiosResponse } from 'axios';

type QueryParams = { [key: string]: any };

const createAxiosInstance = () => {
    return axios.create({
        baseURL: 'https://api.dev.safsarglobal.link/api/',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const axiosInstance: AxiosInstance = createAxiosInstance();

// Set response interceptors
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error(`API error: ${JSON.stringify(error)}`);
        return Promise.reject(error);
    }
);

export const get = async (url: string, queryParams?: QueryParams) => {
    try {
        const response = queryParams ? await axiosInstance.get(url, { params: queryParams }) : await axiosInstance.get(url);
        return response.data;
    } catch (error) {
        console.error(`Fetch error for GET ${url}: ${error}`);
        return Promise.reject(error);
    }
};
