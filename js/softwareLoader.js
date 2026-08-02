/*=========================================
 Software Loader
 Version 1.0
=========================================*/

"use strict";

class SoftwareManager {

    constructor() {

        this.items = [];
        this.filtered = [];

        this.container = document.getElementById("softwareContainer");

        this.search = document.getElementById("softwareSearch");

        this.category = document.getElementById("categoryFilter");

        this.sort = document.getElementById("sortFilter");

    }

    async init() {

        await this.load();

        this.filtered = [...this.items];

        this.render();

        this.events();

    }

    async load() {

        try {

            const response = await fetch("data/software.json");

            this.items = await response.json();

        }

        catch {

            console.log("Cannot Load JSON");

        }

    }

    render() {

        if (!this.container) return;

        this.container.innerHTML = "";

        this.filtered.forEach(item => {

            this.container.appendChild(

                this.createCard(item)

            );

        });

    }

    createCard(item) {

        const card = document.createElement("div");

        card.className = "card software";

        card.innerHTML = `

        <img src="${item.image}" loading="lazy">

        <h2>${item.name}</h2>

        <p>${item.description}</p>

        <div class="softwareFooter">

            <span>Version ${item.version}</span>

            <button class="downloadButton"

            data-id="${item.id}">

            Download

            </button>

        </div>

        `;

        return card;

    }

    events() {

        if (this.search)

            this.search.addEventListener(

                "keyup",

                () => this.filter()

            );

        if (this.category)

            this.category.addEventListener(

                "change",

                () => this.filter()

            );

        if (this.sort)

            this.sort.addEventListener(

                "change",

                () => this.sortItems()

            );

        document.addEventListener(

            "click",

            e => {

                if (

                    e.target.classList.contains(

                        "downloadButton"

                    )

                ) {

                    this.download(

                        e.target.dataset.id

                    );

                }

            }

        );

    }

    filter() {

        let text = "";

        let category = "all";

        if (this.search)

            text =

            this.search.value.toLowerCase();

        if (this.category)

            category =

            this.category.value;

        this.filtered = this.items.filter(item => {

            const matchText =

                item.name

                .toLowerCase()

                .includes(text);

            const matchCategory =

                category == "all"

                ||

                item.category == category;

            return matchText && matchCategory;

        });

        this.render();

    }

    sortItems() {

        if (!this.sort) return;

        switch (this.sort.value) {

            case "name":

                this.filtered.sort(

                    (a,b)=>a.name.localeCompare(b.name)

                );

                break;

            case "version":

                this.filtered.sort(

                    (a,b)=>

                    parseFloat(b.version)

                    -

                    parseFloat(a.version)

                );

                break;

        }

        this.render();

    }

    download(id) {

        const item =

        this.items.find(

            x=>x.id==id

        );

        if(!item) return;

        window.open(

            item.download,

            "_blank"

        );

    }

}

document.addEventListener(

"DOMContentLoaded",

()=>{

const manager=new SoftwareManager();

manager.init();

});