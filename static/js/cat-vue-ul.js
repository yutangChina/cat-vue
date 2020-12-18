/**
 * cat-vue-ul:
 * 列表
 */
Vue.component("cat-vue-ul", {
    template: `
    <ul :class="catUlClass.ul">
        <template v-for="(item,index) in lists">
            <li :class="catUlClass.li">
                <span v-html="item.name" :class="[catUlClass.span,item.beChoosed ? catUlClass.spanChoosed:'']"
                    @click="catVueUlClikLi(item.value,index)" :style="getPaddingLeft"></span>
                <template v-if="item.children&&item.children.length>0">
                    <cat-vue-ul :option="item.children" @input="changeValue" v-model="ulValue" :whichLevel="level" :ulclass="item.childrenClass">
                    </cat-vue-ul>
                </template>
            </li>
        </template>
    </ul>
    `,
    props: ["option", "value", "ulclass", "whichLevel"],
    data: function () {
        return {
            lists: [],
            catUlClass: {
                ul: "cat-vue-ul",
                li: "cat-vue-ul-li",
                span: "cat-vue-ul-li-span",
                spanChoosed: "cat-vue-ul-li-span-choosed"
            },
            ulValue: "",
            level: 0
        }
    },
    methods: {
        catVueUlClikLi: function (val) {
            this.ulValue = val;
            this.$emit("input", val);
        },
        changeValue: function (val) {
            this.ulValue = val;
            this.$emit("input", val);
        },
        judgeWhoBeChoose: function (array) {
            array.forEach((element) => {
                if (element.value == this.ulValue) {
                    element.beChoosed = true;
                } else {
                    element.beChoosed = false;
                }
                if (Array.isArray(element.children) && element.children.length > 0) {
                    this.judgeWhoBeChoose(element.children);
                }
            }, this);
        }
    },
    watch: {
        ulclass: function () {
            //样式重新渲染
            if (this.ulclass !== null && this.ulclass !== undefined && typeof this.ulclass === "object") {
                for (let key in this.ulclass) {
                    if (this.catUlClass[key] && typeof this.ulclass[key] == "string") {
                        this.catUlClass[key] = this.ulclass[key];
                    }
                }
            }
        }
    },
    computed: {
        //为span添加padding
        getPaddingLeft: function () {
            let style = {
                paddingLeft: (this.level * 16 + 20) + "px"
            }
            this.level++;//基础数据类型是值拷贝，对象类型是地址拷贝
            return style;
        }
    },
    created: function () {
        if (this.whichLevel) this.level = this.whichLevel;
        //样式重新渲染
        if (this.ulclass !== null && this.ulclass !== undefined && typeof this.ulclass === "object") {
            for (let key in this.ulclass) {
                if (this.catUlClass[key] && typeof this.ulclass[key] == "string") {
                    this.catUlClass[key] = this.ulclass[key];
                }
            }
        }
        this.ulValue = this.value;
        this.lists = this.option;
        if (this.level == 0) {
            this.judgeWhoBeChoose(this.lists);
        }
    }

});