<template>
    <div class="layput-wapper">
        <div>2222</div>
        <div>{{name}}</div>
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
    import axios from 'axios';
    import dateTool from '~/utils/dateTool';
    import test from '~/utils/test';

    @Component
    export default class Good extends Vue {
        private name: string = '羊肉串';

        // 服务端异步获取数据并填充到 data 依赖中
        private async asyncData(): Promise < any > {
            const {
                data
            } = await axios.get('http://localhost:3000/mock/goodname');
            return {
                name: data.name
            };
        }

        private created(): void {
            test();
        }
    }

</script>
<style lang="scss" scoped>

</style>
