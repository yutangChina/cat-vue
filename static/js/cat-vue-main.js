(function (w) {
    let doc = w.document;
    let components = ["ul", "tag", "table", "switch", "radio", "checkbox"];
    for (let i = 0; i < components.length; i++) {
        let link = doc.createElement("link");
        link.rel = "stylesheet"
        link.href = "./static/css/cat-vue-" + components[i] + ".css";
        doc.head.append(link);

        let script = doc.createElement("script");
        script.src = "./static/js/cat-vue-" + components[i] + ".js";
        doc.head.append(script);

    }
})(window);