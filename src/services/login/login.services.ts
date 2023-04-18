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

export interface RegisterUserResponse extends BaseResponse {
    data: {
        token?: string;
    }
}

export interface RegisterUserRequest extends BaseRequest {
    data: {
        name: string;
        lastname: string;
        address: string;
        username: string;
        password: string;
    }
}

const urlLogin: string = 'http://192.168.1.6:3000/users/login';
const urlToken: string = 'http://192.168.1.6:3000/users/tokenlogin';
const urlRegister: string = 'http://192.168.1.6:3000/users/register';

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


export async function register(
    name: string,
    lastname: string,
    address: string,
    username: string,
    password: string
): Promise<RegisterUserResponse> {
    let response: RegisterUserResponse = {
        statusCode: 0,
        message: '',
        data: {}
    };

    try {
        let request = {
            name,
            lastname,
            address,
            username,
            password,
        }
        response = await post(urlRegister, request, USER_LOGIN);

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
