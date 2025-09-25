<template>
    <div class="lineCard">
        <div class="lineBox">
            <div class="lineTop"></div>
            <div class="rel">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.lineCard{
    border-radius: 20px;
    background-color: #050B14;
    padding: 10px;
    .lineBox{
        border-radius: 20px;
        border: 1px dashed $main-color;
        position: relative;
        overflow: hidden;
        .lineTop{
            width: 100%;
            height: 82px;
            background-color: #19252A;
            border-radius: 20px 20px 0 0;
            position: absolute;
            top: 1px;
            left: 0;
        }
    }
}
</style>