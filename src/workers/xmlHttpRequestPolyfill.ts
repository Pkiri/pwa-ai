/*
Needed functions/properties
    constructor
    open
    setRequestHeader (multiple times)
    onreadystatechange
    onerror
    send
    status
    responseText
*/

class XMLHttpRequestPolyfill implements XMLHttpRequest {
    private _method: string;
    private _url: string;
    private _async: boolean;
    private _headers: Headers = new Headers();
    private _request;

    onreadystatechange: (this: XMLHttpRequest, ev: Event) => any;
    readyState: number;
    response: any;
    responseText: string;
    responseType: XMLHttpRequestResponseType;
    responseURL: string;
    status: number;
    statusText: string;
    timeout: number;
    upload: XMLHttpRequestUpload;
    withCredentials: boolean = true;
    abort(): void {
        throw new Error("Method not implemented.");
    }
    getAllResponseHeaders(): string {
        throw new Error("Method not implemented.");
    }
    getResponseHeader(name: string): string {
        throw new Error("Method not implemented.");
    }
    open(method: string, url: string): void;
    open(method: string, url: string, async: boolean, username?: string, password?: string): void;
    open(method: any, url: any, async?: any, username?: any, password?: any) {
        if (typeof method === 'string' && typeof url === 'string' && typeof async === 'boolean') {
            this._method = method;
            this._url = url;
            this._async = async;
        } else {
            throw new Error("Method not implemented.");
        }
    }
    overrideMimeType(mime: string): void {
        throw new Error("Method not implemented.");
    }
    send(body?: BodyInit): void {
        let request = new Request(this._url, { method: this._method, headers: this._headers, body: body })
        fetch(request).then((response) => {
            this.status = response.status;
            this.readyState = XMLHttpRequest.DONE;
            if (response.ok) {
                return response.text().then((text) => {
                    this.responseText = text;
                    if (typeof this.onreadystatechange === 'function') {
                        this.onreadystatechange(new Event('readystatechange'));
                    }
                })
            } else {
                if (typeof this.onreadystatechange === 'function') {
                    this.onreadystatechange(new Event('readystatechange'));
                }
            }
        }).catch((reason) => {
            this.status = 500;
            this.readyState = XMLHttpRequest.DONE;
            if (typeof this.onreadystatechange === 'function') {
                this.onreadystatechange(new Event('readystatechange'));
            }
        });
}
setRequestHeader(name: string, value: string): void {
    this._headers.append(name, value);
}
DONE: number;
HEADERS_RECEIVED: number;
LOADING: number;
OPENED: number;
UNSENT: number;
addEventListener<K extends "readystatechange" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress" | "timeout">(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options ?: boolean | AddEventListenerOptions): void;
addEventListener(type: string, listener: EventListenerOrEventListenerObject, options ?: boolean | AddEventListenerOptions): void;
addEventListener(type: any, listener: any, options ?: any) {
    throw new Error("Method not implemented.");
}
removeEventListener<K extends "readystatechange" | "abort" | "error" | "load" | "loadend" | "loadstart" | "progress" | "timeout">(type: K, listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any, options ?: boolean | EventListenerOptions): void;
removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options ?: boolean | EventListenerOptions): void;
removeEventListener(type: any, listener: any, options ?: any) {
    throw new Error("Method not implemented.");
}
onabort: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
onerror: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
onload: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
onloadend: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
onloadstart: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
onprogress: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
ontimeout: (this: XMLHttpRequest, ev: ProgressEvent<EventTarget>) => any;
dispatchEvent(event: Event): boolean {
    throw new Error("Method not implemented.");
}
}