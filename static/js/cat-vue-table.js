
/**
 * cat-vue-table:
 * 表格组件
 * 
 */

Vue.component('cat-vue-table',
    {
        template:
            `
            <table :class="cattableclass.table">
            <thead v-if="showHead" :class="cattableclass.thead">
                <tr :class="cattableclass.tr">
                    <th v-for="item in header" v-html="typeof item === 'string' ? item : item.name" :class="cattableclass.th">
                    </th>
                </tr>
            </thead>
            <tbody :class="cattableclass.tbody">
                <tr :calss="cattableclass.tr" v-for="item in data">
                    <template v-for="(it,index) in dataRender">
                        <td v-html="renderTd(item,it,index)" :class="cattableclass.td"></td> 
                    </template>
                </tr>
            </tbody>
        </table>
        `,
        props: ["header", "data", "tableclass"],
        data: function () {
            return {
                showHead: true,//判断是否展示头
                dataRender: [],//数据展示形式
                cattableclass: {
                    table: "cat-vue-table",
                    thead: "cat-vue-table-thead",
                    tbody: "cat-vue-table-tbody",
                    tr: "cat-vue-table-tr",
                    th: "cat-vue-table-th",
                    td: "cat-vue-table-td"
                }
            }
        },
        created: function () {
            //header为空表示无需头
            if (this.header.length == 0) this.showHead = false;
            //不为空需要进行一些操作
            if (this.showHead) {
                this.header.forEach(element => {
                    //该表格头就是文本，对应的数据也是文本
                    if (typeof element == "string") {
                        this.dataRender.push({
                            type: 0
                        });
                    } else {
                        let o = {
                            key: element.key
                        }
                        if (typeof element.render === "function") {
                            o["render"] = element.render;
                            o["type"] = 2;
                        } else {
                            o["type"] = 1;
                        }
                        this.dataRender.push(o);
                    }
                }, this);
            }
            //样式处理
            if (this.tableclass !== null && this.tableclass !== undefined && typeof this.tableclass === "object") {
                this.cattableclass["table"] = this.tableclass["table"] ? this.tableclass["table"] : "cat-vue-table";
                this.cattableclass["thead"] = this.tableclass["thead"] ? this.tableclass["thead"] : "cat-vue-table-thead";
                this.cattableclass["tbody"] = this.tableclass["tbody"] ? this.tableclass["tbody"] : "cat-vue-table-tbody";
                this.cattableclass["tr"] = this.tableclass["tr"] ? this.tableclass["tr"] : "cat-vue-table-tr";
                this.cattableclass["th"] = this.tableclass["th"] ? this.tableclass["th"] : "cat-vue-table-th";
                this.cattableclass["td"] = this.tableclass["td"] ? this.tableclass["td"] : "cat-vue-table-td";
            }
        },
        methods: {
            //渲染表格单元数据
            renderTd: function (rowData, dataType, index) {
                switch (dataType.type) {
                    case 0:
                        return rowData[index];
                    case 1:
                        return rowData[dataType.key];
                    case 2:
                        return dataType.render(rowData, dataType.key, this);
                }

            }
        }
    }
)