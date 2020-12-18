/**
 * cat-vue-radio:
 * 单选列表
 */
Vue.component("cat-vue-radio", {
    template: `
            <div :class="catRadioClass.radiogroup">
                <template v-for="(item,index) in radioOption">
                    <div :class="catRadioClass.radioItem">
                        <span :class="catRadioClass.inputContiner">
                            <input type="radio" :value="item.value" :name="radioName" :class="[catRadioClass.input,item.disabled ? catRadioClass.inputDisabled : '']"
                                :id="radioName + index" @click="chooseMe(index)" v-model="catRadioValue"  :disabled="item.disabled"/>
                        </span>
                        <label :class="[catRadioClass.label , catRadioItemCheck[index] ? catRadioClass.labelChecked : '' , item.disabled ? catRadioClass.labelDisabled : '']" :for="radioName + index">{{item.name}}</label>
                    </div>
                </template>
            </div>
    `,
    props: ["option", "name", "radioclass","value"],
    data: function () {
        return {
            radioOption: [],
            radioName: "",
            catRadioClass: {
                radiogroup: "cat-vue-radio-group",
                radioItem: "cat-vue-radio-item",
                inputContiner: "cat-vue-radio-inputcontiner",
                input: "cat-vue-radio-input",
                label: "cat-vue-radio-label",
                labelChecked: "cat-vue-radio-checked",
                labelDisabled:"cat-vue-radio-labelDisabled",
                inputDisabled:"cat-vue-radio-inputDisabled"
            },
            catRadioItemCheck: [],
            catRadioItemDisable:[],
            catRadioValue: ""
        }
    },
    methods: {
        //选择后改变对应label的样式
        chooseMe: function (index) {
            this.catRadioItemCheck = [];
            this.catRadioItemCheck[index] = true;
        }
    },
    watch:{
        //当catRadioValue的值变化后修改父组件中radio的值
        catRadioValue:function(newValue){
            this.$emit('input', newValue);
        },
        value:function(newVal){
            this.catRadioValue = newVal;
            this.catRadioItemCheck = [];
            this.radioOption.every((element, index) => {
                if (this.catRadioValue == element.value) {
                    this.catRadioItemCheck[index] = true;
                    return false;
                }
                return true;
            }, this);
        }
    },
    created: function () {
        //单选name
        if (this.name === null || this.name === undefined || typeof this.name !== "string") {
            this.radioName = "cat-vue-radio" + Math.floor(Math.random() * 1000000);
        } else {
            this.radioName = this.name;
        }
        this.radioOption = this.option;
        //以radio中的数据为准;如果radio的值不确定,则去radioOption找是否有默认的选中项
        this.radioOption.every((element, index) => {
            if (((this.value === null || this.value === undefined || this.value === "") && element.select) || this.value == element.value) {
                this.catRadioValue = element.value;
                this.catRadioItemCheck[index] = true;
                return false;
            }
            return true;
        }, this);
        //样式重新渲染
        if (this.radioclass !== null && this.radioclass !== undefined && typeof this.radioclass === "object") {
            for (let key in this.radioclass) {
                if (this.catRadioClass[key] && typeof this.radioclass[key] == "string") {
                    this.catRadioClass[key] = this.radioclass[key];
                }
            }
        }
    }
});