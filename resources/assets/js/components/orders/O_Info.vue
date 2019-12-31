<template>
    <div class="order_info">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/Orders'}">订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div id="content" :data="tData">
            <div class="header">
                订单号：
                <span>{{tData.id}}</span>
            </div>
            <div class="transaction">
                <div class="t_hd">
                    <span class="title">{{tData.status-1 | checkStatus}}</span>
                    <div id="inp_ship" v-if="tData.status>=3 && tData.status!=5">
                        <el-form :model="tData" status-icon :rules="rules" ref="tData" class="demo-ruleForm">
                            <el-form-item>
                                <template>
                                    <el-select v-model="tData.express_id" placeholder="请选择快递公司" size="small">
                                        <el-option
                                                v-for="item in Ship"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-form-item>
                            <el-form-item prop="express_code" class="inp">
                                <el-input v-model.number="tData.express_code"  size="small" placeholder="请输入快递单号"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" @click="doShipping" size="small" class="S_post" v-if="tData.status-1==2">发货</el-button>
                                <div v-if="tData.status-1==3">
                                    <el-button type="danger" @click="changeCode" size="small">修改快递单号</el-button>
                                    <el-button type="success" @click="transactionSuccess" size="small">交易成功</el-button>
                                </div>

                            </el-form-item>
                        </el-form>
                    </div>
                </div>

                <el-steps :active="tData.status" align-center finish-status="success">
                    <el-step title="下单" :description="tData.created_at"></el-step>
                    <el-step title="付款" :description="tData.pay_time"></el-step>
                    <el-step title="配货" :description="tData.picking_time"></el-step>
                    <el-step title="出库" :description="tData.shipping_time"></el-step>
                    <el-step title="交易成功" :description="tData.finish_time"></el-step>
                </el-steps>
                <el-collapse accordion>
                    <el-collapse-item title="展开物流详情">
                        <iframe width="100%" height="400px" :src="'http://m.kuaidi100.com/index_all.html?type='+ tData.express.code + '&postid='+tData.express_code"></iframe>
                    </el-collapse-item>
                </el-collapse>
                <div class="goods_info" v-for="product in tData.order_products">
                    <img :src="product.product.image | checkUrl" alt="" width="60">
                    <span>{{product.product.name}}</span>
                    <span>{{product.product.price}}×{{product.num}}</span>
                </div>
            </div>
            <div class="receive">
                <h2>收货信息</h2>
                <div class="r_info">
                    <div class="r_left">
                        <span>客户编号：</span>
                        <span>姓&#12288;&#12288;名：</span>
                        <span>联系电话：</span>
                        <span>收货地址：</span>
                    </div>
                    <div class="r_left" :data="Address">
                        <span>{{tData.id}}</span>
                        <span>{{Address.name}}</span>
                        <span class="r_blue">{{Address.tel}}</span>
                        <span>{{Address.province}}&#12288;{{Address.city}}&#12288;{{Address.area}}&#12288;{{Address.detail}}</span>
                    </div>
                </div>
            </div>
            <div class="receive">
                <h2>支付方式及送货时间</h2>
                <div class="r_info">
                    <div class="r_left">
                        <span>支付方式：</span>
                        <span>送货时间：</span>
                    </div>
                    <div class="r_left">
                        <span>货到付款</span>
                        <span>不限送货时间</span>
                    </div>
                </div>
            </div>
            <div class="price">
                <div class="price_detail">
                    <div class="row">
                        <span>商品总价：</span>
                        <span>{{tData.total_price}}元</span>
                    </div>
                    <div class="row">
                        <span>运&#12288;&#12288;费：</span>
                        <span>{{tData.express_money}}元</span>
                    </div>
                    <div class="row">
                        <span>订单金额：</span>
                        <span>{{Number(tData.total_price)+Number(tData.express_money)}}元</span>
                    </div>
                    <div class="row">
                        <span>实付金额：</span>
                        <span class="price_big">{{Number(tData.total_price)+Number(tData.express_money)}}元</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "O_Info",
        data(){
            return{
                express:[],
                Ship:{},
                Address:{},
                tData:{},
                rules:{

                }
            }
        },
        filters:{
            checkStatus(val){
            //     console.log(val)
                let order=['待付款', '待发货', '配货中', '待收货', '交易成功'];
                return val = order[val]

            },
            checkUrl(val){
                if(val==null){
                    return val='';
                }else{
                    if(val.substr(0,4)=='http'){
                        return val=val;
                    }else {
                        return val='http://images.canon4ever.com/' + val
                    }
                }
            },
            // numfilter(val){
            //         // 截取当前数据到小数点后两位
            //       return   val = parseFloat(val).toFixed(2)
            //
            // }
        },
        created(){
            this.refresh()
        },
        methods:{
            refresh(){
                let id = this.$route.params.id
                // console.log(id)
                axios.get(`http://127.0.0.1:8000/admin/shop/orders/${id}`).then(res=>{
                    this.Ship = res.data.data.expresses
                    this.tData=res.data.data.order
                    // this.express = res.data.data.order.express
                    this.Address=res.data.data.order.address
                    console.log(res)

                })
            },
            doShipping(){
                axios.patch(`http://127.0.0.1:8000/admin/shop/orders/shipping?id=${this.tData.id}&status=${this.tData.status}&express_id=${this.tData.express_id}&express_code=${this.tData.express_code}`).then(res=>{
                    this.tData.status=4
                })

                this.refresh()
            },
            changeCode(){
                axios.patch(`http://127.0.0.1:8000/admin/shop/orders/shipping?id=${this.tData.id}&status=${this.tData.status}&express_id=${this.tData.express_id}&express_code=${this.tData.express_code}`)
                this.refresh()
            },
            transactionSuccess(){
                return this.tData.status=5
                this.refresh()
            }
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
    #content{
        min-width:570px;
    }
    .header{
        font-size:14px;
        padding-bottom:5px;
        border-bottom:1px solid #ccc;
    }
    .header span{
        display: inline-block;
        width:30px;
        font-size:12px;
        text-align:center;
        color:#fff;
        background-color:#1E90FF;
    }

    .transaction{
        display:flex;
        flex-direction:column;
    }
    .t_hd{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .el-form{
        display: flex;
        flex-direction: row;
        max-width:600px;
        /*flex-wrap: nowrap;*/
    }
    #inp_ship{
        display:flex;
        align-items:center;
    }
    .order_info .el-button+.el-button{
         margin-left:0;
     }
    .order_info  .inp{
        margin:0 4px;
    }
    .order_info .el-form-item{
        margin-bottom:0;
    }
    .transaction .title{
        flex:20%;
        padding:20px 0;
        font-size:14px;
    }
    .transaction .el-steps{
        flex: 80%;
        padding:30px 0;
    }
    .goods_info{
        margin-top: 20px;
        padding-bottom:8px;
        font-size: .87em;
        display: flex;
        flex-direction: row;
        align-items: center;
        border-bottom:1px solid #ccc;
    }
    .goods_info img,span{
        margin-right: 10px;
    }
    .receive h2{
        font-size:1.1em;
        padding: 15px 0;
    }
    .r_info{
        color:grey;
        display:flex;
        flex-direction:row;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }
    .r_left{
        display:flex;
        flex-direction:column;

    }
    .r_left span{
        margin-bottom: 15px;
        font-size:.87em;
    }
    .r_left r_blue{
        color:#1E90FF;
    }
    .price{
        display:flex;
        justify-content:flex-end;
    }
    .price .price_detail{
        padding: 20px 0 25px;
        display:flex;
        flex-direction:column;
    }
    .price_detail .row{
        display: flex;
        color: grey;
        font-size: .87em;
        padding-bottom: 10px;
    }
    .price_detail .row span:last-child{
        color: orange;

    }
    .price_detail .row .price_big{
        fone-size:1.23em;
    }




</style>