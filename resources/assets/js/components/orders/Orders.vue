<template>
    <div class="orders">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card id="box-card" v-for="item in tableData" :class="item.status-1| checkBorder">

                <div slot="header" class="clearfix" >
                    <span class="hd">{{item.status-1| checkStatus}}</span>
                    <div class="order_info">
                        <div class="O_info">
                            <span>{{item.created_at}}</span>
                            <span class="spacer"></span>
                            解决(
                            <span class="Cblue">{{item.address.tel}}</span>
                            )
                            <span class="spacer"></span>
                            订单号：
                            <span class="Cblue">{{item.id}}</span>
                        </div>
                        <div>
                            订单金额:
                            <span class="O_price">{{item.total_price}}</span>
                            元
                        </div>
                    </div>

                </div>

            <div class="text item">
                <div class="O_product" v-for="product in item.order_products">
                    <img :src="product.product.image | checkUrl" alt="" width="60">
                    <span>{{product.product.name}}×{{product.num}}</span>
                </div>
                <div class="btn">
                    <el-button type="success" size="small" @click="handleEdit(item.id)">订单详情</el-button>
                </div>
            </div>
        </el-card>
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.currentPage1"
                    :page-size="page.pageSize"
                    layout="prev, pager, next, jumper"
                    :total="page.totalNum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Orders",
        data(){
            return{
                tableData:{},
                page: {
                    currentPage1: 1,
                    pageSize: 0,
                    totalNum: 0,
                    from: null
                }

            }
        },
        filters:{
            checkStatus(val){
                // console.log(val)
               let order=['待付款', '待发货', '配货中', '待收货', '交易成功'];
               return val = order[val]

            },
            checkBorder(val){
                let b_color = ['box-red','box-orange','box-orange','box-green','box-green']
                return val = b_color[val]
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
            }
        },
        created(){
            axios.get(`http://127.0.0.1:8000/admin/shop/orders`).then(res=>{
                console.log(res)
                this.TB = res.data.data.orders
                this.tableData = this.TB.data
                this.getval()
            })
        },
        methods:{
            getval() {
                this.page = {
                    pageSize: this.TB.per_page,
                    totalNum: this.TB.total,
                    currentPage1: this.TB.current_page,
                    from: this.TB.from,
                }
            },
            handleEdit(val){
                // console.log(val)
                this.$router.push({ name:'O_info',params:{id:val}})
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.handleCurrentChange(this.page.currentPage1)
            },
            handleCurrentChange(val) {
                this.page.currentPage1 = val;

                axios.get(`http://127.0.0.1:8000/admin/shop/orders?page=${this.page.currentPage1}`).then(res => {
                    this.TB = res.data.data.orders
                    this.tableData = this.TB.data
                    this.getval()
                    console.log(this.TB)

                    if (this.page.from == null) {
                        this.page.currentPage1 = val - 1
                        axios.get(`http://127.0.0.1:8000/admin/shop/orders?page=${this.page.currentPage1}`).then(res => {
                            this.TB = res.data.data.orders
                        })
                    }
                    // console.log(res.data.data.brands)

                })

                console.log(`当前页: ${val}`);

            },
        }
    }
</script>

<style scoped>
    .el-breadcrumb{
        margin-bottom: 20px;
    }
    #box-card {
        display:flex;
        flex-direction: column;
        min-width:450px;
        margin-bottom:15px;
    }
    .box-green{
        border-color:#32CD32;
    }
    .box-orange{
        border-color:orange;
    }
    .box-red{
        border-color:red;
    }
    /*.item {*/
    /*    margin-bottom: 18px;*/
    /*}*/

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .clearfix .hd{
        flex: 1;
        font-size:.88em;
        display:flex;
        flex-direction:row;
        align-items:center;
        padding: 0 25px 20px;

    }
    .clearfix .order_info{
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size:.67em;
        padding:0 25px 10px;

    }
    .order_info .O_info{

        display: flex;
        align-items:center;
    }
    .O_info .spacer{
        display:inline-block;
        width: 1px;
        height: 12px;
        background-color: #cccccc;
        margin:0 4px;
        overflow: hidden;
    }
    .O_info .Cblue{
        color:#1E90FF;
    }
    .O_price{
        font-size:1.4em;
    }
    .item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 25px 20px;
    }
    .O_product{
        font-size:.67em;
        display: flex;
        align-items: center;
    }
    .O_product img{
        margin-right: 10px;
    }
    .item .btn{
        display:flex;
        align-items: center;
    }


</style>