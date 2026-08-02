"use strict";

class UploadManager {

    constructor(id) {

        this.box = document.getElementById(id);

        this.init();

    }

    init() {

        if (!this.box) return;

        this.box.addEventListener(

            "dragover",

            e => {

                e.preventDefault();

                this.box.classList.add("drag");

            }

        );

        this.box.addEventListener(

            "dragleave",

            () => {

                this.box.classList.remove("drag");

            }

        );

        this.box.addEventListener(

            "drop",

            e => {

                e.preventDefault();

                this.box.classList.remove("drag");

                this.handle(

                    e.dataTransfer.files

                );

            }

        );

    }

    handle(files) {

        [...files].forEach(file => {

            Notify.show(

                file.name +

                " Selected"

            );

        });

    }

}