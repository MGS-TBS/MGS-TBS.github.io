"use strict";

/*=========================================
Storage Manager
=========================================*/

class StorageManager {

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    get(key) {

        const value =

            localStorage.getItem(key);

        if (!value)

            return null;

        return JSON.parse(value);

    }

    remove(key) {

        localStorage.removeItem(key);

    }

    clear() {

        localStorage.clear();

    }

}

const storage = new StorageManager();