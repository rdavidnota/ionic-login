import { useHistory } from "react-router";
import { USER_LOGIN } from "../../redux/actions";
import store from "../../redux/store";
import { storage } from "../../storage/storage";
import { BaseRequest, BaseResponse, fakePost, post } from "../base.services";

export interface LoginUserResponse extends BaseResponse {
    data: {
        token?: string;
    }
}

export interface LoginUserRequest extends BaseRequest {
    data: {
        user: string;
        pass: string;
    }
}

const urlLogin: string = 'http://192.168.0.9:3000/users/login';
const urlToken: string = 'http://192.168.0.9:3000/users/tokenlogin';

export async function loginUser(user: string, pass: string): Promise<LoginUserResponse> {
    let response: LoginUserResponse = {
        statusCode: 0,
        message: '',
        data: {}
    };
    try {
        let request = {
            username: user, password: pass
        }
        response = await post(urlLogin, request, USER_LOGIN);
        if (response.statusCode == 0) {
            await storage.set('credentials', {
                user,
                pass
            });
            await storage.set('token', {
                token: response.data.token
            });
            await storage.set('profile', response.data);
            await storage.set('isLoggedIn', {
                isLoggedIn: true
            });
        }
    } catch (error: any) {
        response = {
            statusCode: -1,
            message: error.message,
            data: {}
        }
    }
    finally {
        return response;
    }
}

export async function loginHuella(token: string): Promise<LoginUserResponse> {
    let response: LoginUserResponse = {
        statusCode: 0,
        message: '',
        data: {}
    };

    try {
        let request = {
            token
        }
        response = await post(urlToken, request, USER_LOGIN);
        if (response.statusCode == 0) {
            await storage.set('isLoggedIn', {
                isLoggedIn: true
            });
            await storage.set('profile', response.data);

        }
    } catch (error: any) {
        response = {
            statusCode: -1,
            message: error.message,
            data: {}
        }
    }
    finally {
        return response;
    }
}
