<template>
    <div class="container">
        <div class="top">
            <h3>
                <input class="titleEdit" type="text" v-model="todo.title" v-show="isEdit == true" @keyup.enter="isEdit = false"/>
                <span class="title" v-show="isEdit == false" @click="isEdit = true">{{todo.title}}</span>
                <!-- <span class="number">{{todo.count}}</span> -->
            </h3>
            <div class="icon">
                <span class="lock" v-show="todo.locked" @click="myUnlock()"><img src="@/assets/lock_b.png"/></span>
                <span class="lock" v-show="!todo.locked" @click="myLock()"><img src="@/assets/unlock_b.png"/></span>
                <span class="delete" v-show="todo.id != 1" @click="deleteList()"><img class="crash" src="@/assets/crash.png"/></span>
            </div>
            <div class="inputbox">
                <span class="addicon"><img class="plus" src="@/assets/plus2.png"/></span>
                <input type="text" placeholder="请输入待办事项" v-model="text" @keyup.enter="onAdd" :disabled="todo.locked"/>
            </div>
        </div>
        <div class="bottom">
            <div v-for="item in items" :key="item.id" v-if="item.pid == todo.id">
                <item :item="item" :todo="todo" @myAction="myAction" @deleteItem="deleteItem"></item>
            </div>
        </div>
    </div>
</template>

<script>
    import item from './item'
    var store = {
        save (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    fetch (key) {
        return JSON.parse(window.localStorage.getItem(key)) || []
    }
    }
    var list = store.fetch('storeItems')
    export default {
        components: {
            item
        },
        props: ['selected'],
        data () {
            return {
                text: "",
                items: list,
                // [
                //     { pid: 1, checked: false, text: "类型一事项一", isDelete: false},
                //     { pid: 1, checked: true, text: "类型一事项二", isDelete: false},
                //     { pid: 1, checked: false, text: "类型一事项三", isDelete: false},
                //     { pid: 2, checked: false, text: "类型二事项一", isDelete: false},
                //     { pid: 2, checked: false, text: "类型二事项二", isDelete: false},
                //     { pid: 3, checked: false, text: "类型三事项一", isDelete: false},
                // ],
                isEdit: false
            }
        },
        computed: {
            todo() {
                return this.selected
            }
        },
        methods: {
            onAdd() {
                var myPid = this.selected.id
                this.items.push({
                    pid: myPid, checked: false, text: this.text, isDelete: false
                })
                this.selected.count += 1
                this.text = ""
            },
            myUnlock() {
                this.selected.locked = false
            },
            myLock() {
                this.selected.locked = true
            },
            myAction(check) {
                if(check){
                    this.selected.count += 1
                }else{
                    this.selected.count -= 1
                }
            },
            deleteList() {
                if(!this.todo.locked){
                    this.$emit("deleteList", this.selected)
                }
            },
            deleteItem(item) {
                var index = this.items.indexOf(item)
                this.items.splice(index, 1)
            }
        },
        watch: {
            items: {
                handler: function () {
                    store.save('storeItems', this.items)
                },
                deep: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 60%;
        overflow: hidden;
        float: left;
        text-align: left;
        margin: -10px 0 0 0;
        padding: 0 0 0 30px;
        background-color: white;
    }
    h3{
        display: inline-block;
        .titleEdit{
            width: 200px;
            border: 0px;
            outline: none;
            font-size: 18px;
            font-weight: bold;
            margin-left: -1px;
        }
        .number{
            margin-left: 5px;
        }
    }
    .icon{
        display: inline-block;
        float: right;
        margin: 20px 30px 0 0;
        .lock{
            margin-right: 10px;
        }
    }
    input{
        width: 80%;
        height: 25px;
        margin: -10px 0 0 10px;
    }
    .top{
        height: 100px;
        width: 100%;
    }
    .bottom{
        min-height: 500px;
        margin-top: 10px;
    }
    img{
        width: 20px;
        height: 20px;
    }
    img.crash{
        width: 17px;
        height: 17px;
        margin-bottom: 1px;
    }
    img.plus{
        width: 16px;
        height: 16px;
        position: relative;
        top: 3px;
    }
</style>