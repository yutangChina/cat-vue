/**
 * cat-vue-switch:
 * 开关
 */
Vue.component("cat-vue-switch", {



    template: `
          <input type="checkbox" value="true" :name="switchName" :class="catSwitchClass.switch" :disabled="switchDisabled" v-model="switchValue"/>
      `,
    props: ["value", "name", "disabled","switchclass"],
    data: function () {
        return {
            switchName: "",
            catSwitchClass: {
                switch: "cat-vue-switch"
            },
            switchDisabled: false,
            switchValue: true
        }
    },
    watch: {
        switchValue: function (newVal) {
            this.$emit("input", newVal);
        }

    },
    created: function () {
        //给名字
        if (this.name === null || this.name === undefined || typeof this.name !== "string") {
            this.switchName = "cat-vue-switch" + Math.floor(Math.random() * 1000000);
        } else {
            this.switchName = this.name;
        }

        //判断是否禁用
        if (this.disabled !== undefined && this.disabled !== null) {
            this.switchDisabled = true;
        }
        //样式重新渲染
        if (this.switchclass !== null && this.switchclass !== undefined && typeof this.switchclass === "object") {
            for (let key in this.switchclass) {
                if (this.catSwitchClass[key] && typeof this.switchclass[key] == "string") {
                    this.catSwitchClass[key] = this.switchclass[key];
                }
            }
        }
        if (!this.value) {
            this.switchValue = false;
        }
    }

});