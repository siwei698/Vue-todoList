<template>
    <div class="container">
        <label class="checkbox">
            <input type="checkbox" v-model="item.checked" v-show="item.checked == false" @click="myAction(item.checked)" :disabled="todo.locked"/>
            <span class="finishicon" v-show="item.checked == true"><img class="ok" src="@/assets/ok.png"/></span>
        </label>
        <input type="text" v-model="item.text" placeholder="添加点什么..." class="inputtext" :class="{checked: item.checked == true}" :disabled="todo.locked"/>
        <span class="delete" v-show="item.checked == true" @click="deleteItem(item)"><img src="@/assets/crash.png"/></span>
    </div>
</template>

<script>
    export default {
        props: ['item', 'todo'],
        methods: {
            myAction(check) {
                this.$emit('myAction', check)
            },
            deleteItem(item) {
                if(!this.todo.locked){
                    this.$emit('deleteItem', item)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .container{
        height: 50px;
        margin: 0 0 0 -33px;
        width: 100%;
    }
    .inputtext{
        height: 25px;
        margin-left: 6px;
        width: 80%;
        border: 0px;
        outline: none;
    }
    .delete{
        float: right;
        margin-right: 10px;
        line-height: 33px;
        font-size: 12px;
    }
    .checked{
        color: rgb(200, 200, 200);
        text-decoration: line-through;
    }
    img{
        width: 15px;
        height: 15px;
        margin-right: 20px;
    }
    img.ok{
        margin-right: 3px;
        position: relative;
        top: 3px;
    }
</style>