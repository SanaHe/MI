<template>
    <div class="customers">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="customer" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="customer.nickname" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item >
                <el-input v-model="customer.openid" placeholder="openId"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="customer.sex" placeholder="性别">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="S_date">
                <template>
                    <el-date-picker
                            v-model="customer.created_at"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </template>
            </el-form-item>
            <el-form-item class="btn">
                <el-button type="primary" @click="init">查询</el-button>
            </el-form-item>
        </el-form>

        <div class="TB">
            <template>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            fixed
                            label="#"
                            width="100">
                        <template slot-scope="scope">
                            <span>{{scope.$index+1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="缩略图"
                            width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.headimgurl" alt="" width="50">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="nickname"
                            label="昵称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="openid"
                            label="OpenId"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别"
                            width="80">
                        <template slot-scope="scope">
                            <span>{{scope.row.sex | checkSex}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="关注时间"
                            width="180">
                    </el-table-column>
                </el-table>
            </template>
        </div>
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
        name: "customers",
        data() {
            return {
                value1: '',
                input: '',
                value: '',
                msg:'',
                delarr:[],
                tableData:[],
                customer:{
                    nickname:'',
                    headimgurl:'',
                    openid:'',
                    sex:'',
                    created_at:'',
                },

                TB:{},
                page:{
                    currentPage1: 1,
                    pageSize:0,
                    totalNum:0,
                    from:null
                }
            }
        },
        filters:{
            checkSex(val){
                return val == 1? '男':'女'
            },
        },
        created(){
           this.init()

        },
        methods:{
            init(){
                axios.get(`http://127.0.0.1:8000/admin/shop/customers?
            nickname=${this.customer.nickname}
            &sex=${this.customer.sex}
            &created_at=${this.customer.created_at}`).then(res=>{
                    this.tableData = res.data.data.customers.data
                    this.TB =res.data.data.customers
                    this.getval()
                    console.log(res)
                })
            },
            getval(){
                this.page={
                    pageSize:this.TB.per_page,
                    totalNum : this.TB.total,
                    currentPage1 : this.TB.current_page,
                    from : this.TB.from,
                }
            },
            cleararr(){
                this.delarr=[]
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.handleCurrentChange(this.page.currentPage1)
            },
            handleCurrentChange(val) {
                this.page.currentPage1 = val;

                axios.get(`http://127.0.0.1:8000/admin/shop/customers?page=${this.page.currentPage1}`).then(res=>{
                    this.tableData = res.data.data.customers.data
                    this.TB =res.data.data.customers
                    this.getval()
                    console.log(this.TB)

                    if (this.page.from == null){
                        this.page.currentPage1=val-1
                        axios.get(`http://127.0.0.1:8000/admin/shop/customers?page=${this.page.currentPage1}`).then(res=>{
                            this.TB = res.data.data.customers
                            // this.getval()
                        })
                    }
                    // console.log(res.data.data.brands)
                })
                this.cleararr()
                console.log(`当前页: ${val}`);

            },
        },
    }
</script>

<style scoped>
.el-breadcrumb{
    margin: 25px 0  20px 10px;
}
.el-form--inline .el-form-item{
    width: 150px;
    height: 62px;
}
.el-form--inline .S_date{
    width: 360px;
}
.el-form--inline .btn{
    width: 70px;
}
.cell img{
    border-radius:50%
}
</style>