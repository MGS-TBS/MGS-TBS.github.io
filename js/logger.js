"use strict";

/*=========================================
Logger
=========================================*/

class Logger {

    static info(message) {

        console.log(

            "%cINFO",

            "color:#2D9CFF;font-weight:bold",

            message

        );

    }

    static warning(message) {

        console.warn(

            "%cWARNING",

            "color:orange;font-weight:bold",

            message

        );

    }

    static error(message) {

        console.error(

            "%cERROR",

            "color:red;font-weight:bold",

            message

        );

    }

    static table(data) {

        console.table(data);

    }

}