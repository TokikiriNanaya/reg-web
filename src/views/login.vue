<template>

    <body>
        <div class="shell">
            <div class="box-left">
                <h2>Login</h2>
                <span>regSys后台登录</span>
            </div>
            <div class="box-right">
                <div class="form">
                    <label for="username">用户名</label>
                    <input v-model="username" type="text" id="username" @keydown.enter.native="onSubmit"
                        placeholder="请输入用户名">
                    <label for="password">密码</label>
                    <input v-model="password" type="password" id="password" @keydown.enter.native="onSubmit"
                        placeholder="请输入密码">
                    <input type="submit" id="submit" @click="onSubmit" value="登录">
                </div>
            </div>
        </div>
    </body>

</template>


<script>
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import axios from 'axios'

export default {
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        onSubmit: function () {
            let username = this.username
            let password = this.password
            // 发送请求
            axios.post("/admin/login", {
                username: username,
                password: password
            }).then((respones) => {
                console.log(respones.data)
                if (respones.data.success) {
                    ElMessage.success(respones.data.message);
                    console.log("登录成功 token:" + respones.data.data)
                    // 将token存入localStorage
                    localStorage.setItem("token", respones.data.data)

                    this.$router.push("/admin")
                } else {
                    ElMessage.error(respones.data.message);
                }
            }).catch(function () {
                ElMessage.error('服务器连接出现错误')
            })
        }
    }
}

</script>
<!-- scoped：style只在当前组件生效 -->
<style scoped>
* {
    padding: 0;
    margin: 0;
}

body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(to bottom right, #bdbef8, #cbb7fd);
}

.shell {
    width: 640px;
    height: 320px;
    display: flex;
}

.box-left {
    background-color: #fff;
    height: 280px;
    top: 20px;
    position: relative;
    width: 50%;
}

.box-left h2 {
    font: 900 50px '';
    margin: 50px 40px 40px;
}

.box-left span {
    display: block;
    color: #999;
    font-style: 14px;
    margin: 40px;
}

.box-right {
    background-color: #474a59;
    box-shadow: 0 0 40px 16px rgba(0, 0, 0, .2);
    color: #f1f1f2;
    width: 50%;
}

.form {
    margin: 40px;
    position: absolute;
}

label {
    color: #c2c2c5;
    display: block;
    font-size: 14px;
    height: 16px;
    margin-top: 20px;
    margin-bottom: 5px;
    position: relative;
}

input {
    background: transparent;
    border: 0;
    color: #f2f2f2;
    font-style: 20px;
    height: 30px;
    line-height: 30px;
    width: 100%;
    outline: none !important;
}

label::before {
    content: '';
    display: block;
    position: absolute;
    top: 52px;
    width: 100%;
    height: 3px;
    background-image: linear-gradient(to right, #44ffff, #b888ff);
}

#submit {
    color: #fff;
    margin-top: 40px;
    width: 100px;
    height: 35px;
    background-color: rgba(255, 255, 255, .1);
    border-radius: 20px;
    float: right;
    transition: .3s;
}

#submit:hover {
    letter-spacing: 2px;
    color: #000;
    background-color: #fff;
}
</style>
