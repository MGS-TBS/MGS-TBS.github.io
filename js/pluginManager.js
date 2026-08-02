"use strict";

/*=========================================
 Plugin Manager
=========================================*/

class PluginManager {

    constructor() {

        this.plugins = [];

    }

    async load(file) {

        const response = await fetch(file);

        const data = await response.json();

        for (const plugin of data) {

            await this.install(plugin);

        }

    }

    async install(plugin) {

        return new Promise((resolve, reject) => {

            const script = document.createElement("script");

            script.src = plugin.script;

            script.onload = () => {

                this.plugins.push(plugin);

                console.log(plugin.name + " Loaded");

                resolve();

            };

            script.onerror = reject;

            document.body.appendChild(script);

        });

    }

    list() {

        return this.plugins;

    }

    unload(name) {

        this.plugins = this.plugins.filter(

            p => p.name !== name

        );

    }

}

const pluginManager = new PluginManager();