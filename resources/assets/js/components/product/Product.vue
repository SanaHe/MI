<template>
    <div class="product">
        <el-form :inline="true" :model="product" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="product.name" placeholder="商品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="product.category_id" placeholder="请选择">
                    <el-option-group
                            v-for="group in tableData"
                            :key="group.id"
                            :label="group.name">
                        <el-option
                                v-for="item in group.children"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-checkbox v-model="product.is_top">置顶</el-checkbox>
            <el-checkbox v-model="product.is_recommend">推荐</el-checkbox>
            <el-checkbox v-model="product.is_hot">热销</el-checkbox>
            <el-checkbox v-model="product.is_new">新品</el-checkbox>
            <el-form-item>
                <el-select v-model="product.is_onsale" placeholder="上架状态">
                    <el-option label="上架" value="1"></el-option>
                    <el-option label="下架" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="S_date">
                <template>
                    <el-date-picker
                            v-model="product.created_at"
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
            <el-form-item class="btn">
                <el-button type="success" icon="el-icon-edit" @click="jump">新增</el-button>
            </el-form-item>
        </el-form>
        <div class="goods">
            <template>
                <el-table
                        :data="pro_cate"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            fixed
                            label="id"
                            prop="id"
                            width="50">
                        <template slot-scope="scope">
                            <span>{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="缩略图"
                            prop="image"
                            width="140">
                        <template slot-scope="scope">
                            <img :src="scope.row.image | checkUrl" alt="" width="120" height="50">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="商品名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="所属分类"
                            width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.categories | addSeparator}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="price"
                            label="单价">
                    </el-table-column>
                    <el-table-column
                            label="上架">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_onsale | checkR"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="置顶">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_top | checkR"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="推荐">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_recommend | checkR"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="热销">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_hot | checkR"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="新品">
                        <template slot-scope="scope">
                            <i :class="scope.row.is_new | checkR"></i>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="库存"
                            width="80"
                            prop="sort_order">
                        <template slot-scope="scope">
                            <el-input v-model.number="scope.row.stock"  size="small"
                                      @change="editStock(scope.row.id,scope.row.stock)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="上架日期"
                            width="170">
                        <template slot-scope="scope">
                            <span>{{ scope.row.created_at.substring(0,10) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <!--删除提示框-->
                        </template>
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
        data() {
            return {

                checked: false,
                msg:'',
                delarr:[],
                tableData:[],
                product: {
                    name: '',
                    created_at: '',
                    category_id: [],
                    is_hot: false,
                    is_new: false,
                    is_recommend: false,
                    is_top: false,
                    is_onsale: '',

                },
                TB: {},
                pro_cate:[],
                page: {
                    currentPage1: 1,
                    pageSize: 0,
                    totalNum: 0,
                    from: null
                }
            }
        },
        filters: {
            checkR(val) {
                return val ? "el-icon-check" : "el-icon-close"
            },
            checkUrl(val) {
                if(val==null){
                    return val='';
                }else{
                    if(val.substr(0,4)=='http'){
                        return val=val;
                    }else {
                        return val='http://images.canon4ever.com/' + val
                    }
                }
                // return val == null || val.match('http://images.canon4ever.com/') ? val : 'http://images.canon4ever.com/' + val
            },
            addSeparator(val){
                let categories = val.map((item)=>{
                    return item.name
                })
                return categories.join(', ')
            }
        },
        created() {
            axios.get(`http://127.0.0.1:8000/admin/shop/categories`).then(res=> {
                this.tableData = res.data.data.categories
                // console.log(this.tableData)
            })
           this.init()
        },
        methods: {
            init(){
                axios.get(`http://127.0.0.1:8000/admin/shop/products?name=${this.product.name}
            &category_id=${this.product.category_id}
            &is_hot=${this.product.is_hot}
            &is_new=${this.product.is_new}
            &is_recommend=${this.product.is_recommend}
            &is_top=${this.product.is_top}
            &is_onsale=${this.product.is_onsale}
            &created_at=${this.product.created_at}`).then(res => {
                    this.TB = res.data.data.products
                    this.pro_cate = this.TB.data
                    this.getval()
                    // console.log(this.pro_cate)
                })
            },
            jump(){
                this.$router.push({ path:'/P_form'})
            },
            editStock(id,Sto){
                axios.patch(`http://127.0.0.1:8000/admin/shop/products/change_stock`, {id:id,stock:Sto}).then(res=>{
                    // console.log(res)
                    // this.pro_cate = res.data.data.products.data
                    // console.log(res)
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({name:'P_edit',params:{id:row.id}})
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    axios.delete(`http://127.0.0.1:8000/admin/shop/products/${row.id}`).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });

                    })
                    this.init()

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },

            getval() {
                this.page = {
                    pageSize: this.TB.per_page,
                    totalNum: this.TB.total,
                    currentPage1: this.TB.current_page,
                    from: this.TB.from,
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.handleCurrentChange(this.page.currentPage1)
            },
            handleCurrentChange(val) {
                this.page.currentPage1 = val;

                axios.get(`http://127.0.0.1:8000/admin/shop/products?page=${this.page.currentPage1}`).then(res => {
                    this.TB = res.data.data.products
                    this.pro_cate = this.TB.data
                    this.getval()
                    console.log(this.TB)

                    if (this.page.from == null) {
                        this.page.currentPage1 = val - 1
                        axios.get(`http://127.0.0.1:8000/admin/shop/products?page=${this.page.currentPage1}`).then(res => {
                            this.TB = res.data.data.products
                            // this.getval()
                        })
                    }
                    // console.log(res.data.data.brands)
                })

                console.log(`当前页: ${val}`);

            },
        },

    }
</script>

<style>
    .el-form--inline .el-form-item{
        width: 150px;
        height: 42px;
    }
    .el-checkbox{
        margin:10px 5px
    }
    .el-form--inline .S_date{
        width: 360px;
    }
    .el-form--inline .btn{
        width: 70px;
    }
     .cell{
        text-align: center;
    }
    .el-icon-check{
        color:green;
        font-weight:bold;
    }
    .el-icon-close{
        color: red;
        font-weight:bold;
    }
    .el-table__body-wrapper .el-input input{
        text-align:center!important;
        padding: 0 10px;
    }
    .cell .el-button+.el-button {
        margin-left: 0;
        margin-top:5px
    }
    .goods img{
        border: none;
    }
</style>
