<template>
    <div id="login">
        <div id="main">
            <h2>账号密码登陆</h2>
            <form action="#">
                <div class="account">
                    <div class="inpWrap">
                        <input v-model="userEmail" class="inp" type="text" placeholder="请输入邮箱">
                    </div>
                    <div class="inpWrap">
                        <input v-model="inpPassword" :type="doclick | checkStatus" placeholder="请输入密码">
                        <a href="##" @click="judgeDisplay"><i class="fa fa-eye" style="font-size: 1.75em"></i></a>

                    </div>

                </div>
                <div class="btn">
                    <a href="##" class="register" @click="loginNow">登陆</a>
                    <a href="##" class="login">立即注册</a>
                </div>
                <span>已阅读并同意：
                    <a href="###">用户协议</a>
                    和
                    <a href="###"> 隐私政策 </a>
                </span>
            </form>

        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                doclick:false,
                userEmail:'',
                inpPassword:'',
            }
        },
        filters:{
            checkStatus(val){
                if(val==false){
                    return val = 'password'
                } else{
                    return val = 'text'
                }
            }
        },
        methods:{
            judgeDisplay(){
                this.doclick = !this.doclick
            },
            loginNow(){
                const data={
                    grant_type:'password',
                    client_id:1,
                    client_secret:'DI4TzBdeOQw6vRot5zHP3IrvSwEk8nBSgSNHpSzd',
                    username:this.userEmail,
                    password:this.inpPassword,
                }
                this.axios.post(`http://localhost:8000/oauth/token`,data).then(res=>{
                    console.log(res)
                    localStorage.token_type= res.data.token_type
                    localStorage.access_token = res.data.access_token
                    this.$router.push({name:'home'})
                })
                //
            },
        },

    }
</script>

<style>
#main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
#main h2{
    font-size: 2.2em;
    padding: 40px 0;
}
form{
    width: 100%;
    box-sizing: border-box;
    padding: 0px 15px;
}
#main .account{
    display: flex;
    flex-direction: column;
    width: 100%;
}
#main .account input{
    flex: 1;
    padding: 5px 12px;
    margin: 10px 0;
    border: none;
    font-size: 1.57em;
}
#main .account .inpWrap{
    flex: 1;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ccc;
}
#main .btn{
    margin-top: 25px;
    text-align: center;
    display: flex;
    flex-direction: column;
}
#main .btn a{
    margin-bottom: 20px;;
    flex: 1;
    padding: 10px;
    font-size: 1.43em;
    color: #fff;
    background-color: #ff6700;
    border-radius: 10px;
}
#main .btn .login{
    color: black;
    background-color: #fff;
    border: 1px solid #ccc;
}
</style>