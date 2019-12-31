<template>
    <div class="category">
        <h2>商品分类</h2>

        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
            <el-button type="success" icon="el-icon-d-caret" @click="collapseTable">{{expandControl}}</el-button>
            <el-button type="primary" icon="el-icon-edit" @click="jump">新增</el-button>
        </el-breadcrumb>
        <el-table
                :data="tableData"
                row-key="id"
                v-if="changing"
                :default-expand-all="expandAll"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                style="width: 100%">
            <el-table-column
                    sortable
                    label="商品 ID"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="缩略图"
                    prop="image">
                <template slot-scope="scope">
                    <img :src="scope.row.image | checkUrl" alt="" width="60">
                </template>
            </el-table-column>
            <el-table-column
                    label="品牌分类"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="是否显示"
                    prop="is_show">
                <template slot-scope="scope">
                    <i :class="scope.row.is_show | checkSign"></i>
                </template>
            </el-table-column>
            <el-table-column
                    label="排序"
                    width="70"
                    prop="sort_order">
                <template slot-scope="scope">
                    <el-input v-model.number="scope.row.sort_order"  size="small"
                    @change="editSort(scope.row.id,scope.row.sort_order)"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="描述"
                    prop="description">
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
    </div>
</template>

<script>
    export default {
        name: "cate",
        data(){
          return{
              tableData:[],
              changing:true,
              expandAll:false,
          }
        },
        filters:{
            checkSign(val){
                return val? "el-icon-check":"el-icon-close"
            },
            checkUrl(val){
                return val == null || val.match('http://images.canon4ever.com/') ? val:'http://images.canon4ever.com/'+val
            }
        },
        created(){
            this.refresh()
        },
        computed:{
          expandControl(){
              return this.expandAll? '关闭':'展开'
          }
        },
        methods:{
            refresh(){
                axios.get(`http://127.0.0.1:8000/admin/shop/categories`).then(res=>{
                    this.tableData = res.data.data.categories
                    console.log(this.tableData)
                    // console.log(res)
                })
            },
            collapseTable(){
                this.expandAll = !this.expandAll
                this.changing = false
                this.$nextTick(()=>{
                    this.changing = true
                })
                console.log(this.expandAll)
            },
            jump(){
                this.$router.push({ path:'/subform'})
            },

            editSort(id,num){
                console.log(num)
                axios.patch(`http://127.0.0.1:8000/admin/shop/categories/sort_order`, {id:id,sort_order:num}).then(res=>{
                    // console.log(res)
                    this.tableData = res.data.data.categories
                }).catch(error=>{
                    // console.log(error)
                    if(error.response && error.response.status=='422'){
                        this.$message.error('填写的排序不正确!必须是0~99的数字')
                    }
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({name:'C_edit',params:{id:row.id}})
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`http://127.0.0.1:8000/admin/shop/categories/${row.id}`).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    this.refresh()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .el-breadcrumb{
        line-height:40px;
        margin:20px 0;
    }
    .el-breadcrumb .el-button{
        float:right;
        margin-right: 5px
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

</style>