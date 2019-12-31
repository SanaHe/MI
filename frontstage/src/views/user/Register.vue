<template>
    <div class="register">
        <div id="main">
            <h2>账户注册</h2>
            <form v-on:submit.prevent="onSubmit(customer)">
                <div class="account" v-model="customer">
                    <div class="inpWrap">
                        <input v-model="customer.cus_email" class="inp" type="email" placeholder="请输入邮箱">
                        <span>{{checkEmailError}}</span>
                    </div>

                    <div class="inpWrap">
                        <input v-model="customer.password" :type="doclick | checkStatus" placeholder="请输入密码">
                        <a href="##" @click="judgeDisplay"><i class="fa fa-eye" style="font-size: 1.75em"></i></a>
                        <span>{{checkPasswordError}}</span>
                    </div>

                </div>
                <div class="btn">
                    <input type="submit" class="register" value="立即注册">
                    <a href="/login" class="login">账号密码登陆</a>
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
        name: "Register",
        data(){
          return{
              doclick:false,
              customer:{
                  cus_email:'',
                  password:'',
              },
              emailError:'',
              passwordError:'',
          }
        },
        computed:{
            checkEmailError(){
                if(this.emailError=='The email field is required.'){
                    return this.emailError='请输入注册邮箱！'
                }else if(this.emailError=='The email has already been taken.'){
                    return this.emailError='这个邮箱已经被注册了'
                }

            },
            checkPasswordError(){
                if(this.passwordError=='The password field is required.'){
                    return this.passwordError='请输入密码！'
                }
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
        created(){

        },
        methods:{
            onSubmit(customer){
                this.axios.post(`api/register`,{email:customer.cus_email,password:customer.password}).then(res=>{
                    alert('注册成功')
                }).catch(error=>{
                    console.log(error)
                    this.emailError = error.errors.email[0]
                    this.passwordError = error.errors.password[0]
                })
            },
            judgeDisplay(){
                this.doclick = !this.doclick
            },

        }
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
        position: relative;
    }
    #main .account .inpWrap span{
        padding: 5px;
        position: absolute;
        bottom: 40px;
        left: 10px;
        font-size: 1.32em;
        color: red;
    }
    #main .btn{
        margin-top: 25px;
        text-align: center;
        display: flex;
        flex-direction: column;
    }
    #main .btn input{
        margin-bottom: 20px;;
        flex: 1;
        padding: 10px;
        font-size: 1.43em;
        color: #fff;
        background-color: #ff6700;
        border-radius: 10px;
        border:none;
    }
    #main .btn .login{
        flex: 1;
        padding: 10px;
        font-size: 1.43em;
        color: black;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
</style>