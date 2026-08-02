"use strict";

class BlogEngine {

    constructor() {

        this.posts = [];

        this.container = document.getElementById("blogContainer");

        this.search = document.getElementById("blogSearch");

        this.category = document.getElementById("blogCategory");

    }

    async init() {

        await this.load();

        this.render(this.posts);

        this.events();

    }

    async load() {

        const response = await fetch("data/blog.json");

        this.posts = await response.json();

    }

    render(list) {

        if (!this.container) return;

        this.container.innerHTML = "";

        list.forEach(post => {

            this.container.innerHTML += `

            <article class="card blogCard fade-in">

                <img src="${post.image}" loading="lazy">

                <div class="blogContent">

                    <span class="blogCategory">

                        ${post.category}

                    </span>

                    <h2>

                        ${post.title}

                    </h2>

                    <p>

                        ${post.summary}

                    </p>

                    <div class="blogFooter">

                        <span>

                            ${post.date}

                        </span>

                        <button

                            class="readPost"

                            data-id="${post.id}"

                        >

                            Read More

                        </button>

                    </div>

                </div>

            </article>

            `;

        });

    }

    events() {

        if (this.search) {

            this.search.addEventListener("keyup", () => {

                this.filter();

            });

        }

        if (this.category) {

            this.category.addEventListener("change", () => {

                this.filter();

            });

        }

    }

    filter() {

        const keyword =

            this.search.value.toLowerCase();

        const category =

            this.category.value;

        const result = this.posts.filter(post => {

            const title =

                post.title.toLowerCase();

            const ok1 =

                title.includes(keyword);

            const ok2 =

                category == "all"

                ||

                post.category == category;

            return ok1 && ok2;

        });

        this.render(result);

    }

}

document.addEventListener(

"DOMContentLoaded",

()=>{

const blog = new BlogEngine();

blog.init();

});