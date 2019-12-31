<template>
    <div class="recycleB">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品回收站</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btn">
            <el-button type="success" icon="el-icon-top-left" @click="RecycleAll">还原</el-button>
            <el-button type="info" icon="el-icon-delete" @click="DeletAll">删除</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="id"
                    width="80">
                <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="商品名称"
                    width="120">
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
                            type="success"
                            @click="handleRecycle(scope.$index, scope.row)">还原</el-button>
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
        name: "recycleBin",
        data(){
            return{
                msg:'',
                delarr:[],
                tableData:[],
                multipleSelection: [],
                checkedID:[],
            }
        },
        created(){
           this.getData()
        },
        methods:{
            getData(){
                axios.get(`http://127.0.0.1:8000/admin/shop/products/trash`).then(res=>{
                    this.tableData = res.data.data.products.data
                    console.log(res)
                })
            },
            handleRecycle(index,row){
                this.$confirm('此操作将还原该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let id = this.delarr[0];
                    axios.get(`http://127.0.0.1:8000/admin/shop/products/${row.id}/restore`).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '还原成功!'
                        });
                        this.getData()
                        // this.handleCurrentChange(this.page.currentPage1)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`http://127.0.0.1:8000/admin/shop/products/${row.id}/force_destroy`).then(res=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getData()
                        // this.handleCurrentChange(this.page.currentPage1)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.checkedID = val.map((item)=>{
                    return item.id
                })
                console.log(this.checkedID)
            },
            RecycleAll(){
                if(this.multipleSelection!=''){
                    axios.post(`http://127.0.0.1:8000/admin/shop/products/restore_checked`, {checked_id:this.checkedID}).then(res=>{
                        this.$message({
                            showClose: true,
                            message: '还原成功',
                            type: 'success'
                        })
                        this.getData()
                    })
                }else{
                    this.$message({
                        showClose: true,
                        message: '请选择需要还原的商品',
                        type: 'error'
                    });
                }

            },
            DeletAll(){

                if(this.multipleSelection!=''){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() =>{
                        axios.post(`http://127.0.0.1:8000/admin/shop/products/force_destroy_checked`, {checked_id:this.checkedID}).then(res=>{
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            })
                            this.getData()
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '请选择需要删除的商品',
                        type: 'error'
                    });
                }

            },
        },
        filters:{

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
            },
            addSeparator(val){
                let categories = val.map((item)=>{
                    return item.name
                })
                return categories.join(', ')
            }
        }
    }
</script>

<style>

    .el-breadcrumb{
        margin-bottom: 20px;
    }
    .recycleB .el-table .cell{
        text-align: center;
    }
    .cell .el-button+.el-button {
        margin-left: 0;
        margin-top:5px
    }
</style>