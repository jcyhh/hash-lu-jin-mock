<template>
    <div>
        <VanPopup style="background: transparent;" v-model:show="show" position="bottom">
            <div class="picker" v-if="props.list.length>0">
                <div class="flex jb ac pl40 pr40 mb60">
                    <div class="size32 bold">{{ title }}</div>
                    <van-icon size="20" name="cross" @click="close" />
                </div>
                <van-picker :visible-option-num="4" :columns-field-names="names" :columns="list" @change="onChange"></van-picker>
                <div class="pl30 pr30 mt60">
                    <div class="mainBtn size30" v-scale v-delay="{fun:submit}">{{ $t('确定') }}</div>
                </div>
            </div>
        </VanPopup>
    </div>
</template>

<script setup lang="ts">
/**
 * 单选弹窗
 */
import { computed, ref } from 'vue';

const props = defineProps(['list', 'name', 'title'])

const emit = defineEmits(['change'])

const names = computed(()=>{
    return {
        text: props.name,
        value: 'value',
        children: 'children'
    }
})

const show = ref(false)

const open = () => show.value = true

const close = () => show.value = false

const current = ref(0)

const submit = ()=> {
    close()
    emit('change', current.value)
}

const onChange = (e:any) => {
    current.value = e.selectedIndexes[0]
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.picker{
    border-radius: 40px 40px 0 0;
    padding: 40px 0;
    overflow: hidden;
    background-color: #0A0E17;
}
</style>