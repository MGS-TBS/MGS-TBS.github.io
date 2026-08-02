"use strict";

/*=========================================
API Manager
=========================================*/

class Api {

    constructor(baseUrl = "") {

        this.baseUrl = baseUrl;

        this.headers = {
            "Content-Type": "application/json"
        };

    }

    async get(url) {

        const response = await fetch(
            this.baseUrl + url,
            {
                method: "GET",
                headers: this.headers
            }
        );

        return await response.json();

    }

    async post(url, data) {

        const response = await fetch(
            this.baseUrl + url,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data)
            }
        );

        return await response.json();

    }

    async put(url, data) {

        const response = await fetch(
            this.baseUrl + url,
            {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(data)
            }
        );

        return await response.json();

    }

    async delete(url) {

        const response = await fetch(
            this.baseUrl + url,
            {
                method: "DELETE",
                headers: this.headers
            }
        );

        return await response.json();

    }

}

const api = new Api();