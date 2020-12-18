/**
 * cat-vue-tag:
 * 标签组件
 */
Vue.component("cat-vue-tag", {
    template: `<span v-html="tagContent" :class="tagClass"></span>`,
    props: ["type", "size", "content"],
    data: function () {
        return {
            tagType: "light-default",//背景色 字体颜色  边框颜色
            tagSize: "medium", //标签大小 ： 标签的长度  标签的宽度 字体大小 标签默认为 border-box
            tagContent: "",
            tagClass: "cat-vue-tag"
        }
    },
    created: function () {



        /**
         * 选择标签类型:
         * 1)light : light-default light-success  light-info light-warning light-danger
         * 2)dark : dark-default dark-success  dark-info dark-warning dark-danger
         */

        if (typeof this.type === "string" && this.type.length > 0) {
            this.tagType = this.type;
            switch (this.tagType) {
                case "light-default":
                case "light-success":
                case "light-info":
                case "light-warning":
                case "light-danger":
                case "dark-default":
                case "dark-success":
                case "dark-info":
                case "dark-warning":
                case "dark-danger":
                    this.tagClass += " cat-vue-tag-" + this.type;
                    break;
                default:
                    this.tagClass += " " + this.type;
                    break;
            }
        }else{
            this.tagClass += " cat-vue-tag-" + this.tagType;
        }

        /**
         * 选择标签大小：
         *  big medium small mini
         */

        if (typeof this.size === "string" && this.size.length > 0) {
            this.tagSize = this.size;
            switch (this.tagSize) {
                case "big":
                case "medium":
                case "small":
                case "mini":
                    this.tagClass += " cat-vue-tag-" + this.tagSize;
                    break;
                default:
                    this.tagClass += " " + this.size;
                    break;
            }
        }else{
            this.tagClass += " cat-vue-tag-" + this.tagSize;
        }


        //内容是选取text还是html字符串
        if(this.content === null || this.content === undefined){
            this.tagContent = this.$slots.default[0].text 
        }else{
            this.tagContent = this.content;
        }
    }
});