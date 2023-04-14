<template>
    <el-row style="border-bottom: solid 1px var(--el-menu-border-color);">
        <el-col :span="4">
            <div class="grid-content " />
        </el-col>
        <el-col :span="16">
            <div class="grid-content">

                <!-- 已登录的导航栏 -->
                <div v-if="logined == 1">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                        style="border-bottom: none">
                        <!-- <div class="grid-content header-left">
                        <p>注册码系统</p>
                    </div> -->
                        <el-menu-item index="3" v-on:click="$router.push('/')">
                            注册码系统
                        </el-menu-item>
                        <div class="flex-grow" />
                        <el-sub-menu index="2">
                            <template #title>注册码</template>
                            <el-menu-item index="2-1" select v-on:click="$router.push('/admin/codeCreate')">
                                生成注册码
                            </el-menu-item>
                            <el-menu-item index="2-2" v-on:click="$router.push('/admin/codeList')">
                                管理注册码
                            </el-menu-item>
                            <el-menu-item index="2-3" v-on:click="$router.push('/admin/codeUseRecordList')">
                                使用记录
                            </el-menu-item>
                            <!-- 三阶选项 -->
                            <!-- <el-sub-menu index="2-4">
                                <template #title>item four</template>
                                <el-menu-item index="2-4-1">item one</el-menu-item>
                            </el-sub-menu> -->
                        </el-sub-menu>
                        <el-sub-menu index="1">
                            <template #title>管理员</template>
                            <el-menu-item index="1-1" v-on:click="logout">
                                注销
                            </el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </div>
                <!-- 未登录的导航栏 -->
                <div v-else-if="logined == 0">
                    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false" style="border-bottom: none">
                        <el-menu-item index="3" v-on:click="$router.push('/')">
                            注册码系统
                        </el-menu-item>
                        <div class="flex-grow" />
                        <el-menu-item index="0" v-on:click="$router.push('/login')">
                            后台登录
                        </el-menu-item>
                    </el-menu>
                </div>

            </div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content " />
        </el-col>
    </el-row>
</template>

<script lang="ts">
import axios from 'axios'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

export default {
    inject: ['reload'],
    data() {
        return {
            logined: 0,
            // 默认激活项
            activeIndex: ref('3')
        }
    },
    methods: {
        ifLogined: function () {
            let token = localStorage.getItem("token")
            if (token != null) {//判断token是否存在
                console.log("当前token:" + token)
                axios.get("/admin/verifyToken"
                ).then((respones) => {
                    console.log("token校验结果:" + respones.data)
                    // token校验
                    if (respones.data) {
                        this.logined = 1
                    } else {
                        this.logined = 0
                        localStorage.removeItem("token")
                    }
                }).catch(function () {
                    console.log("token校验出现错误")
                    this.logined = 0
                    localStorage.removeItem("token")
                })
            } else {
                this.logined = 0
                console.log("token不存在")
            }
        },
        logout: function () {
            ElMessageBox.confirm(
                '确定要注销吗？',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {
                let token = localStorage.getItem("token")
                axios.get("/admin/logout", {
                    params: {
                        token: token
                    }
                }).then((respones) => {
                    console.log(respones.data)
                    if (respones.data) {
                        localStorage.removeItem("token")
                        console.log("退出登录")
                        // 刷新重新渲染组件
                        this.reload()
                        ElMessage({
                            type: 'success',
                            message: '退出登录',
                        })
                    } else {
                        console.log("服务器错误")
                    }
                }).catch(function () {
                    console.log("网络错误")
                })
                // 跳转到首页
                this.$router.push("/")
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消',
                })
            })

        }
    },
    mounted: function () {
        this.ifLogined();
    }
}

</script>

<style scoped>
.grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 100%;
}

.flex-grow {
    flex-grow: 1;
}
</style>