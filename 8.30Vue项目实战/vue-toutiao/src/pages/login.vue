<template>
    <div>
        <h1>登录页</h1>
        <form action="/login" method="post" v-on:submit.prevent="loginAction" class="login-frame">
            <div class="login-item">
                <label>用户名：</label>
                <input name="username" type="text" v-model="user.username" />
            </div>
            <div class="login-item">
                <label>密码：</label>
                <input name="passwd" type="password" v-model="user.password"/>
            </div>
            <input type="submit" value="登录" class="login"/>
        </form>
    </div>
</template>

<script>
export default {

    props: ['id'],

    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        };
    },

    methods: {

        loginAction(e) {
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.user)
            })
            .then(res => res.json())
            .then(loginRes => {
                if (+loginRes.res === 1) {
                    this.$router.replace(this.$route.query.back);
                }
            });
        }

    }
}
</script>

<style>
h1 {
    margin: 0 auto;
    text-align: center;
}

.login-frame {
    width: 90%;
    margin: 0 auto;
}
.login-frame label {
    display: inline-block;
    width: 70px;
}
.login-frame input {
    border: 1px solid #e4e4e4;
}
.login {
    display: block;
    margin: 30px auto 0;
}
.login-item {
    display: flex;
    margin-top: 10px;
}
.login-item input {
    display: block;
    flex: 1;
}
</style>
