

Vue.component("cat-vue-menu", {


    template:
        `
        <cat-vue-ul :option="options" v-model="menuValue" :ulclass="menuClass"></cat-vue-ul>
    `,
    props: ["model", "value", "menuoption"],
    data: function () {
        return {
            options: [],
            menuValue: "",
            menuModel: "v",//v表示竖直，h表示水平
            menuClass: {

            }
        }
    },
    created: function () {
        //模式校验
        if (this.model === "h") {
            this.menuModel = "h";
        }
        //1.处理数据(目前只支持有一层子对象)
        this.options = this.menuoption;
        this.options.forEach(element => {
            if (Array.isArray(element.children) && element.children.length > 0) {
                if (this.menuModel = "h") element.name += "<span class=\"cat-vue-li-h-icon-down\"></span>";
                element.childrenClass = {
                    ul: "cat-vue-ul cat-vue-ul-child",
                    li: "cat-vue-ul-li cat-vue-ul-li-child",
                    span: "cat-vue-ul-li-span cat-vue-ul-li-span-child",
                    spanChoosed: "cat-vue-ul-li-span-choosed cat-vue-ul-li-span-choosed-child"
                }
            }
        }, this);
        this.menuValue = this.value;
        switch (this.menuModel) {
            //h表示水平
            case "h":
                this.menuClass = {
                    ul: "cat-vue-ul cat-vue-ul-h",
                    li: "cat-vue-ul-li cat-vue-ul-li-h",
                    span: "cat-vue-ul-li-span cat-vue-ul-li-span-h",
                    spanChoosed: "cat-vue-ul-li-span-choosed cat-vue-ul-li-span-choosed-h"
                }
                break;
            case "v":
            default:
                break;

        }
    },
    watch: {
        menuValue: function (newVal) {
            let isLevel0 = false;
            let isWhichIndex = 0;
            this.options.forEach(element => {
                if (element.value == newVal) {
                    element.beChoosed = true;
                    isLevel0 = true;
                } else {
                    element.beChoosed = false;
                }
            }, this);
            if (!isLevel0) {
                this.options.forEach((element, index) => {
                    if (Array.isArray(element.children) && element.children.length > 0) {
                        element.children.forEach(element => {
                            if (element.value == newVal) {
                                element.beChoosed = true;
                                isWhichIndex = index;
                            } else {
                                element.beChoosed = false;
                            }
                        });
                    }
                }, this);
                this.options[isWhichIndex].children.push({});
                this.options[isWhichIndex].children.pop();
                this.options[isWhichIndex].beChoosed = true;

            }
            this.options.push({});
            this.options.pop();
        }
    }
});