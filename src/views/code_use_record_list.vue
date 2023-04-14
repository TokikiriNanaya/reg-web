<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>注册码使用记录</span>
            </div>
        </template>

        <div class="text item">
            <el-table :data="tableData" stripe border highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="code_id" label="注册码ID" width="100" />
                <el-table-column prop="code" label="注册码" width="320" />
                <el-table-column value-format="timestamp" prop="createTime" label="使用时间" width="180">
                    <template #default="scope">
                        <div>
                            <!-- 使用moment格式化时间 -->
                            {{ this.$moment(scope.row.use_time).format('YYYY-MM-DD h:mm:ss') }}
                        </div>
                    </template>
                </el-table-column>/>
                <el-table-column prop="ip" label="使用者IP" width="150" />
                <el-table-column prop="email" label="使用者邮箱" width="200" />
            </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="size"
            @current-change="changePage" />
    </el-card>
</template>


<script lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
export default {
    created: function () {
        this.getRegCode(1)
    },
    data() {
        return {
            tableData: null,
            size: 20,
            total: 0,
            current: 1,
        }
    },
    methods: {
        getRegCode: function (current: number) {
            // 发送请求
            axios.post("/regCode/getCodeUseRecord", {
                current: current,
                size: this.size
            }).then((respones) => {
                if (respones.data.success) {
                    console.log(respones.data)
                    this.tableData = respones.data.data.rows
                    this.total = respones.data.data.total
                } else {
                    ElMessage.error(respones.data.message);
                }
            }).catch(function () {
                ElMessage.error('服务器连接出现错误')
            })

        },
        //分页
        changePage: function (value: number) {
            this.getRegCode(value)
        }
    }
}


</script>
<style scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    max-width: 100%;
}
</style>