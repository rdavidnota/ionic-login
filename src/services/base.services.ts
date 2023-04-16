import axios from "axios";
import { AxiosResponse } from "axios";
import { useReducer } from "react";
import { USER_LOGIN } from "../redux/actions";
import store from "../redux/store";

export interface BaseResponse {
    statusCode: number;
    message: string
    data: any
}

export interface BaseRequest {
    token: string;
    data: any;
}
const service = axios.create({
    timeout: 1500,
});


function convertResponse(axiosResponse: AxiosResponse, url: string): BaseResponse {
    let response: BaseResponse;

    if (axiosResponse.status >= 300 && axiosResponse.status <= 599) {
        response = {
            statusCode: -1,
            message: `Error al consumir el servicio ${url}`,
            data: {}
        };
    } else {
        response = axiosResponse.data
    }

    return response;
}

export async function get(url: string, dataParams: any, token: any): Promise<BaseResponse> {
    let dataRequest: BaseRequest = {
        token: '',
        data: dataParams
    }

    let response: BaseResponse = await service.get<BaseResponse>(
        url,
        {
            data: dataRequest,
        }
    ).then((response) => {
        let dataResponse: BaseResponse = convertResponse(response, url);

        if (dataResponse.statusCode == 0) {
            store.dispatch({
                type: token,
                payload: dataResponse.data
            })
        } else {
            console.error(`message: ${dataResponse.message} code: ${dataResponse.statusCode}`)
        }
        return dataResponse;
    }).catch((reason) => {
        console.error(`Error al consumir el servicio: ${JSON.stringify(reason)}`);

        let dataResponse: BaseResponse = {
            statusCode: -1,
            message: `Error al consumir el servicio ${url}`,
            data: {}
        };
        return dataResponse;

    });

    return response;
}

export async function   post(url: string, dataParams: any, token: any): Promise<BaseResponse> {
    let dataRequest: BaseRequest = {
        token: '',
        data: dataParams
    }

    let response: BaseResponse = await service.post<BaseResponse>(url, dataRequest)
        .then((response) => {
            let dataResponse: BaseResponse = convertResponse(response, url);

            if (dataResponse.statusCode == 0) {
                store.dispatch({
                    type: token,
                    payload: dataResponse.data
                })
            } else {
                console.error(`message: ${dataResponse.message} code: ${dataResponse.statusCode}`)
            }
            return dataResponse;
        }).catch((reason) => {
            console.error(`Error al consumir el servicio: ${url}, message: ${reason.message}`);

            let dataResponse: BaseResponse = {
                statusCode: -1,
                message: `Error al consumir el servicio ${url}`,
                data: {}
            };
            return dataResponse;
        });

    if (response.statusCode != 0) {
        throw new Error(response.message);
    }

    return response;
}


export function fakePost(url: string, dataParams: any, token: any): Promise<BaseResponse> {
    let { username, password } = dataParams;
    let dataResponse: BaseResponse = {
        statusCode: 0,
        message: 'OK',
        data: {
            username, password
        }
    };

    store.dispatch({
        type: token,
        payload: dataResponse.data
    })

    return Promise.resolve(dataResponse);
}
