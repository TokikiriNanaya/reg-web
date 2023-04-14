<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>注册码管理</span>
            </div>
        </template>

        <div class="text item">
            <el-table :data="tableData" stripe border highlight-current-row style="width: 100%">
                <el-table-column type="index" width="50" />
                <el-table-column prop="id" label="Id" width="50" />
                <el-table-column prop="code" label="注册码" width="320" />
                <el-table-column value-format="timestamp" prop="createTime" label="创建时间" width="170">
                    <template #default="scope">
                        <div>
                            <!-- 使用moment格式化时间 -->
                            {{ this.$moment(scope.row.createTime).format('YYYY-MM-DD h:mm:ss') }}
                        </div>
                    </template>
                </el-table-column>/>
                <el-table-column value-format="timestamp" prop="activeTime" label="激活时间" width="170">
                    <template #default="scope">
                        <div>
                            <!-- 使用moment格式化时间 -->
                            {{ this.$moment(scope.row.activeTime).format('YYYY-MM-DD h:mm:ss') }}
                        </div>
                    </template>
                </el-table-column>/>
                <el-table-column prop="lastUseTime" label="上次使用时间" width="170">
                    <template #default="scope">
                        <div>
                            <!-- 使用moment格式化时间 -->
                            {{ this.$moment(scope.row.lastUseTime).format('YYYY-MM-DD h:mm:ss') }}
                        </div>
                    </template>
                </el-table-column>/>
                <el-table-column prop="pcInfo" label="PC标识符" width="120">
                    <template #default="scope">
                        <div v-show="!scope.row.isEdit">
                            {{ scope.row.pcInfo }}
                        </div>
                        <!-- 编辑状态下 -->
                        <el-input v-show="scope.row.isEdit" v-model="scope.row.pcInfo"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="useCount" label="使用次数" width="90" />
                <el-table-column prop="expiryTime" label="过期时间" width="180">
                    <template #default="scope">
                        <div v-show="!scope.row.isEdit">
                            <!-- 使用moment格式化时间 -->
                            {{ this.$moment(scope.row.expiryTime).format('YYYY-MM-DD h:mm:ss') }}
                        </div>
                        <!-- 编辑状态下 -->
                        <el-date-picker v-if="scope.row.isEdit" v-model="scope.row.expiryTime" type="datetime"
                            format="YYYY/MM/DD HH:mm:ss" />
                    </template>

                </el-table-column>/>
                <el-table-column prop="qq" label="QQ" width="120">
                    <template #default="scope">
                        <div v-show="!scope.row.isEdit">
                            {{ scope.row.qq }}
                        </div>
                        <!-- 编辑状态下 -->
                        <el-input v-show="scope.row.isEdit" v-model="scope.row.qq"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="180">
                    <template #default="scope">
                        <div v-show="!scope.row.isEdit">
                            {{ scope.row.email }}
                        </div>
                        <!-- 编辑状态下 -->
                        <el-input v-show="scope.row.isEdit" v-model="scope.row.email"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="actived" label="激活状态" width="90">
                    <template #default="scope">
                        <div>
                            {{ scope.row.actived == 0 ? "未激活" : "已激活" }}
                        </div>
                    </template>
                </el-table-column>/>
                <el-table-column prop="banned" label="封禁状态" width="90">
                    <template #default="scope">
                        <div v-show="!scope.row.isEdit">
                            {{ scope.row.banned == 0 ? "正常" : "封禁" }}
                        </div>
                        <!-- 编辑状态下 -->
                        <el-select v-show="scope.row.isEdit" v-model="scope.row.banned">
                            <el-option label="正常" :value=0 />
                            <el-option label="封禁" :value=1 />
                        </el-select>
                    </template>
                </el-table-column>/>
                <el-table-column prop="tool" label="操作" width="140">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">{{
                            scope.row.isEdit ? "保存" : "编辑" }}</el-button>
                        <el-button size="small" @click="handleDelete(scope.$index, scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>/>
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
            size: 20,   //每页显示数
            total: 0,   //数据总数
            current: 1  //当前页码
        }
    },
    methods: {
        getRegCode: function (current: number) {
            // 发送请求
            axios.post("/regCode/getRegCode", {
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
        // 分页
        changePage: function (value: number) {
            this.getRegCode(value)
        },
        // 编辑/保存
        handleEdit: function (index, row) {
            row.isEdit = !row.isEdit;
            if (row.isEdit) {
                console.log("点击编辑按钮")
            } else {
                console.log("点击保存按钮")
                ElMessageBox.confirm(
                    '确定保存？',
                    '提示',
                    {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }
                ).then(() => {
                    // 发送请求
                    axios.post("/regCode/updateRegCode", {
                        id: row.id,
                        qq: row.qq,
                        email: row.email,
                        pcInfo: row.pcInfo,
                        expiryTime: row.expiryTime,
                        banned: row.banned
                    }).then((respones) => {
                        if (respones.data.success) {
                            ElMessage.success(respones.data.message);
                        } else {
                            this.getRegCode(this.current)
                            ElMessage.error(respones.data.message);
                        }
                    }).catch(function () {
                        ElMessage.error('服务器连接出现错误')
                    })
                }).catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消',
                    })
                })

            }
            // console.log(index)
            // console.log(row)
        },
        // 删除
        handleDelete: function (index, row) {
            // this.tableData.splice(index, 1);
            ElMessageBox.confirm(
                '确定删除？',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                console.log("删除index:", index)
                // 发送请求
                axios.post("/regCode/delRegCode", {
                    id: row.id
                }).then((respones) => {
                    if (respones.data.success) {
                        this.getRegCode(this.current)
                        ElMessage.success(respones.data.message);
                    } else {
                        ElMessage.error(respones.data.message);
                    }
                }).catch(function () {
                    ElMessage.error('服务器连接出现错误')
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消',
                })
            })

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