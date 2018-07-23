<template>
    <div class="container">
        <a class="menu_item" :class="{'active': item.id == todoId}" @click="goList(item)" v-for="item in items" :key="item.id">
            <span class="lock" v-bind:class="{lock_hidden: !item.locked}" v-if="item.id == todoId"><img src="@/assets/lock_w.png"/></span>
            <span class="lock" v-bind:class="{lock_hidden: !item.locked}" v-if="item.id != todoId"><img src="@/assets/lock_b.png"/></span>
            <span class="title">{{item.title}}</span>
            <div class="circleNumber">
                <div class="myCircle" :class="{'activeCircle': item.id == todoId}" v-if="item.count > 0"></div>
                <span class="uncompleted" v-show="item.count">{{item.count}}</span>
            </div>
        </a>
        <a class="menu_add" @click="addList">
            <span class="add_item"><img class="plus" src="@/assets/plus2.png"/></span>
            <span class="text">新增</span>
        </a>
    </div>
</template>

<script>
    var store = {
    save (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value))
    },
    fetch (key) {
        return JSON.parse(window.localStorage.getItem(key)) || []
    }
    }
    var list = store.fetch('storeList')
    if(list.length == 0){
        var list = [{ id: 1, title: '类型一', count: 0, locked: true, isDelete: false}]
    }
    export default {
        props: ['deleted'],
        data () {
            return {
                items: list,
                // [
                //     { id: 1, title: '类型一', count: 2, locked: true, isDelete: false},
                //     { id: 2, title: '类型二', count: 2, locked: true, isDelete: false},
                //     { id: 3, title: '类型三', count: 1, locked: false, isDelete: false},
                //     { id: 4, title: '类型四', count: 0, locked: true, isDelete: false},
                // ],
                todoId: 1
            }
        },
        methods: {
            goList(myList) {
                this.todoId = myList.id
                this.$emit('gotoList', myList)
            },
            addList() {
                var lastId = this.items[this.items.length - 1].id + 1
                this.items.push({
                    id: lastId, title: '新建类型', count: 0, locked: false, isDelete: false
                })
            },
            myDelete(item) {
                var index = this.items.indexOf(item)
                this.items.splice(index, 1)
                this.$emit('gotoList', this.items[0])
            }
        },
        created() {
            this.$emit('gotoList', this.items[0])//页面初始化时传右侧显示的默认列表
        },
        watch: {
            items: {
                handler: function () {
                    store.save('storeList', this.items)
                },
                deep: true
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        width: 30%;
        overflow: hidden;
        float: left;
    }
    a{
        display: block;
        width: 60%;
        height: 40px;
        line-height: 40px;
        float: right;
        border-bottom: 1px solid white;
        span{
            float: left;
            font-size: 14px;
        }
        .lock{
            padding: 0 10px;
        }
        .lock_hidden{
            opacity: 0;
        }
        .add_item{
            padding: 0 12px;
        }
    }
    .menu_item{
        min-width: 200px;
        .title{
            width: 50%;
            text-align: left;
        }
    }
    .menu_add{
        .text{
            margin-left: -2px;
        }
    }
    .active{
        color: white;
    }
    img{
        width: 15px;
        height: 15px;
        position: relative;
        top: 2px;
    }
    img.plus{
        width: 14px;
        height: 14px;
        position: relative;
        left: -1px;
    }
    .circleNumber{
        float: right;
        width: 30px;
    }
    .myCircle{
        width: 18px;
        height: 18px;
        border-radius: 9px;
        background-color: white;
        position: absolute;
        margin-left: -20px;
        margin-top: 10px;
        z-index: -1;
        display: inline-block;
    }
    .activeCircle{
        background-color: red;
    }
</style>