/**
 * cat-vue-checkbox:
 * 单选列表
 */
Vue.component("cat-vue-checkbox", {
    template: `
            <div :class="catcheckboxClass.checkboxgroup">
                <template v-for="(item,index) in checkboxOption">
                    <div :class="catcheckboxClass.checkboxItem">
                        <span :class="catcheckboxClass.inputContiner">
                            <input type="checkbox" :value="item.value" :name="checkboxName" :class="[catcheckboxClass.input,item.disabled ? catcheckboxClass.inputDisabled : '']"
                                :id="checkboxName + index" @click="chooseMe(index)" v-model="catcheckboxValue"  :disabled="item.disabled"/>
                        </span>
                        <label :class="[catcheckboxClass.label , catcheckboxItemCheck[index] ? catcheckboxClass.labelChecked : '' , item.disabled ? catcheckboxClass.labelDisabled : '']" :for="checkboxName + index">{{item.name}}</label>
                    </div>
                </template>
            </div>
    `,
    props: ["option", "name", "checkboxclass", "value"],
    data: function () {
        return {
            checkboxOption: [],
            checkboxName: "",
            catcheckboxClass: {
                checkboxgroup: "cat-vue-checkbox-group",
                checkboxItem: "cat-vue-checkbox-item",
                inputContiner: "cat-vue-checkbox-inputcontiner",
                input: "cat-vue-checkbox-input",
                label: "cat-vue-checkbox-label",
                labelChecked: "cat-vue-checkbox-checked",
                labelDisabled: "cat-vue-checkbox-labelDisabled",
                inputDisabled: "cat-vue-checkbox-inputDisabled"
            },
            catcheckboxItemCheck: [],
            catcheckboxItemDisable: [],
            catcheckboxValue: []
        }
    },
    methods: {
        //选择后改变对应label的样式
        chooseMe: function (index) {
            this.catcheckboxItemCheck = [];
            this.catcheckboxItemCheck[index] = true;
        }
    },
    watch: {
        //当catcheckboxValue的值变化后修改父组件中checkbox的值
        catcheckboxValue: function (newValue) {
            this.$emit('input', newValue);
        },
        value: function (newVal) {
            this.catcheckboxValue = newVal;
            this.catcheckboxItemCheck = [];
            this.checkboxOption.every((element, index) => {
                if (this.catcheckboxValue.includes(element.value)) {
                    this.catcheckboxItemCheck[index] = true;
                }
                return true;
            }, this);
        }
    },
    created: function () {
        //单选name
        if (this.name === null || this.name === undefined || typeof this.name !== "string") {
            this.checkboxName = "cat-vue-checkbox" + Math.floor(Math.random() * 1000000);
        } else {
            this.checkboxName = this.name;
        }
        this.checkboxOption = this.option;
        //以value中的数据为准;如果value的值不确定,则去checkboxOption找是否有默认的选中项,value必须是数组且有值的时候
        if (Array.isArray(this.value) && this.value.length > 0) {
            this.value.every((element, index) => {
                this.catcheckboxValue.push(element);
                this.catcheckboxItemCheck[index] = true;
                return true;
            }, this);
        } else {
            this.checkboxOption.every((element, index) => {
                if (element.select) {
                    this.catcheckboxValue.push(element.value);
                    this.catcheckboxItemCheck[index] = true;
                }
                return true;
            }, this);
        }
        //样式重新渲染
        if (this.checkboxclass !== null && this.checkboxclass !== undefined && typeof this.checkboxclass === "object") {
            for (let key in this.checkboxclass) {
                if (this.catcheckboxClass[key] && typeof this.checkboxclass[key] == "string") {
                    this.catcheckboxClass[key] = this.checkboxclass[key];
                }
            }
        }
    }
});