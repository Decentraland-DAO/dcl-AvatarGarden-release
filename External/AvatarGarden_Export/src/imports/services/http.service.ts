import { FlatFetchInit, FlatFetchResponse, SignedFetchRequest, signedFetch } from "~system/SignedFetch";

type Headers = {
    'Content-Type': string,
    'Authorization'?: string
}

export async function signedGet(url: string, tokenID?: string): Promise<FlatFetchResponse>{

    const req: SignedFetchRequest = {
        url: url,
        init: {
            method: "GET",
            headers: createHeaders(tokenID),
        }
    }

    const response = await signedFetch(req)
    return response
}

export async function signedPost(url: string, payload: any, tokenID?: string): Promise<FlatFetchResponse>{

    const req: SignedFetchRequest = {
        url: url,
        init: {
            method: "POST",
            headers: createHeaders(tokenID),
            body: JSON.stringify(payload)
        }
    }

    const response = await signedFetch(req)
    return response
}

export async function signedPut(url: string, payload: any, tokenID?: string): Promise<FlatFetchResponse>{

    const req: SignedFetchRequest = {
        url: url,
        init: {
            method: "PUT",
            headers: createHeaders(tokenID),
            body: JSON.stringify(payload)
        }
    }

    const response = await signedFetch(req)
    return response
}

export function postRequest(url: string, payload: any, tokenID?: string): Promise<any> {

    const req: RequestInit = {
        method: "POST",
        headers: createHeaders(tokenID),
        body: JSON.stringify(payload)
    }
    
    return fetch(url, req)
}
export function putRequest(url: string, payload: any, tokenID?: string,): Promise<any> {

    const req: RequestInit = {
        method: "PUT",
        headers: createHeaders(tokenID),
        body: JSON.stringify(payload)
    }
    
    return fetch(url, req)
}
export function getRequest(url: string, tokenID?: string): Promise<any> {

    const req: RequestInit = {
        method: "GET",
        headers: createHeaders(tokenID),
    }
    
    return fetch(url, req)
}
export async function deleteRequest(url: string): Promise<any> {

    const req: RequestInit = {
        method: "DELETE",
        headers: createHeaders(),
    }

    await fetch( url, req)
}

function createHeaders(tokenID?: string): Headers {

    if (tokenID) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenID}`
        }
    }

    return {
        'Content-Type': 'application/json'
    };
}


export * as http from "./http.service"