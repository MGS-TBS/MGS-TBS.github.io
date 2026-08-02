"use strict";

class SearchEngine {

    constructor() {

        this.index = [];

        this.input = document.getElementById("globalSearch");

        this.result = document.getElementById("searchResult");

    }

    async init() {

        const files = [

            "data/blog.json",

            "data/software.json",

            "data/cases.json"

        ];

        for (const file of files) {

            try {

                const r = await fetch(file);

                const data = await r.json();

                this.index.push(...data);

            }

            catch (e) {

                console.log(file);

            }

        }

        this.events();

    }

    events() {

        if (!this.input) return;

        this.input.addEventListener(

            "keyup",

            () => this.search()

        );

    }

    search() {

        const text = this.input.value.toLowerCase();

        this.result.innerHTML = "";

        if (text.length < 2) return;

        this.index

            .filter(item => {

                return JSON.stringify(item)

                    .toLowerCase()

                    .includes(text);

            })

            .forEach(item => {

                const div = document.createElement("div");

                div.className = "searchItem";

                div.innerHTML = `

                    <h3>${item.title || item.name}</h3>

                    <p>

                        ${item.description || item.summary || ""}

                    </p>

                `;

                this.result.appendChild(div);

            });

    }

}

document.addEventListener(

"DOMContentLoaded",

()=>{

new SearchEngine().init();

});