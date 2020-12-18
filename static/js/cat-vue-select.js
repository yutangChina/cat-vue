/**
 * cat-vue-select:
 * 下拉
 */
Vue.component("cat-vue-select", {


    template:`
    
    
          <select :name="selectName" :class="selectClass.select">
             <template v-for="item in selectOption">
                 <option :value="item.value" :class="selectClass.option">{{item.name}}</option>
             </template>
          </select>
    
    `,
    props:["option","name"],
    data:function(){
        return {
            selectName:"",
            selectOption:[],
            selectClass:{
                select:"cat-vue-select",
                option:"cat-vue-select-option"
            }
        }
    },
    created:function(){
        if (this.name === null || this.name === undefined || typeof this.name !== "string") {
            this.selectName = "cat-vue-select" + Math.floor(Math.random() * 1000000);
        } else {
            this.selectName = this.name;
        }
        this.selectOption = this.option;

    }

});
