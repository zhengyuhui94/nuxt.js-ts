<template>
    <div class="layput-wapper">
        <div>2222</div>
        <div>{{name}}</div>
        <br>
        <el-row>
            <el-button disabled>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success" disabled>成功按钮</el-button>
            <el-button type="info" disabled>信息按钮</el-button>
            <el-button type="warning" disabled>警告按钮</el-button>
            <el-button type="danger" disabled>危险按钮</el-button>
        </el-row>
    </div>
</template>
<script lang="ts">
    import {
        Component,
        Vue
    } from 'nuxt-property-decorator';
    import dateTool from '~/utils/dateTool';

    @Component
    export default class Good extends Vue {
        private name: string = '羊肉串';

        // 服务端异步获取数据并填充到 data 依赖中
        private async asyncData(): Promise < any > {
            // asyncData 和 fetch 方法在 vue 组件实例化之前执行的生命周期方法，因此无法获取到实例 this
            // 在这里通过 Vue.prototype.$requestTool 使用请求方法
            const data = await Vue.prototype.$request.get('/mock/goodname');
            return {
                name: data.name
            };
        }

        private created(): void {
            // 在生命周期 created 中能获取到实例 this，因此通过 this.$requestTool 使用请求方法
            this.$request.get('/mock/goodname').then((res: any) => {
                console.log(res);
            });
        }
    }

</script>
<style lang="scss" scoped>

</style>
