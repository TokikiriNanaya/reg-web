<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>注册码生成</span>
                <el-button type="primary" @click="onSubmit">生成</el-button>
            </div>
        </template>

        <div class="text item">
            <el-form :model="code_create_form" label-width="120px">
                <el-form-item label="注册码类型：">
                    <el-radio-group v-model="code_create_form.effective_mode" @change="method_change">
                        <el-radio label="1" size="large" border>长期有效</el-radio>
                        <el-radio label="2" size="large" border>限时</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="有效期：">
                    <el-input-number :disabled="if_disable_expiryTime" v-model.number="code_create_form.expiryTime"
                        :max="3650" :min="1"></el-input-number>
                    <span> （单位：天）</span>
                </el-form-item>

                <el-form-item label="QQ：">
                    <el-input style="width: 220px;" v-model.number="code_create_form.qq">
                    </el-input>
                </el-form-item>

                <el-form-item label="接收方式：">
                    <el-radio-group v-model="code_create_form.receive_method" @change="receive_method">
                        <el-radio label="1" size="large" border>当前QQ邮箱</el-radio>
                        <el-radio label="2" size="large" border>其他邮箱</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="邮箱：">
                    <el-input :disabled="if_disable_email" style="width: 220px;" v-model.number="code_create_form.email">
                    </el-input>
                </el-form-item>

            </el-form>
        </div>
    </el-card>
</template>
<!-- <script lang="ts" setup>
import { ref } from 'vue'

const gen_method = ref('2')
const expiryTime = ref('30')
const method_change = (value: number) => {
  console.log(value)
  if(value==1){
    
  }
}
</script> -->
<script lang="ts">
import axios from 'axios'

import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'

import { copyText } from 'vue3-clipboard'


export default {
    data() {
        return {
            if_disable_expiryTime: false,
            if_disable_email: true,
            // 表单数据初始化
            code_create_form: {
                effective_mode: '2',
                expiryTime: '30',
                created_code: '',
                email: '',
                receive_method: '1',
                qq: ''
            },
            if_code_display: 'none'
        }
    },
    methods: {
        // 控制数字输入框
        method_change: function (val: number) {
            if (val == 1)
                this.if_disable_expiryTime = true
            if (val == 2)
                this.if_disable_expiryTime = false
        },
        receive_method: function (val: number) {
            if (val == 1)
                this.if_disable_email = true
            if (val == 2)
                this.if_disable_email = false
        },
        onSubmit: function () {
            // 确认提交弹窗
            ElMessageBox.confirm(
                '确定要生成一个注册码吗？',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).then(() => {

                // 生效方式
                var effective_mode = this.code_create_form.effective_mode
                // 有效期
                var expiryTime = this.code_create_form.expiryTime

                // 接收方式
                var receive_method = this.code_create_form.receive_method
                // qq
                var qq = this.code_create_form.qq

                // 邮箱
                var email = null

                // 使用其他邮箱
                if (receive_method == 2) {
                    email = this.code_create_form.email
                } else if (qq != null && qq != '') {
                    email = this.code_create_form.qq + "@qq.com"
                }
                // console.log(effective_mode + ' ' + expiryTime)

                // 长期有效
                if (effective_mode == 1) {
                    expiryTime = 0
                }



                // 发送请求
                axios.post("/regCode/createRegCode", {
                    expiryTime: expiryTime,
                    email: email,
                    qq: qq
                }).then((respones) => {
                    if (respones.data.success) {

                        let created_code = respones.data.data.code
                        // 弹窗提示
                        ElMessageBox.alert(created_code, '注册码已生成 请妥善保管', {
                            confirmButtonText: '确认',
                        })
                        // 自动复制注册码
                        copyText(created_code, undefined, (error) => {
                            if (error) {
                                ElMessage.warning(`复制注册码失败: ${error} 请手动复制注册码`);
                            } else {
                                ElMessage.success(`生成成功 已自动复制注册码`);
                            }
                        });

                    } else {
                        ElMessage.error(respones.data.message);
                    }
                }).catch(function () {
                    ElMessage.error('服务器连接出现错误')
                })
            }).catch(() => {
                ElMessage({
                    type: 'info',
                    message: '取消生成',
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