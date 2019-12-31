<template>
	<div>

      <h2>商品品牌</h2>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商城管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品品牌</el-breadcrumb-item>
          <el-button type="success" icon="el-icon-edit">导出</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="jump">新增</el-button>
      </el-breadcrumb>

      <el-table
        :data="TB"
        style="width: 100%">
        <el-table-column
          label="日期"
          width="150">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.created_at.substring(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="80">
            <template slot-scope="scope">
                <img :src="scope.row.image" alt="" width="50">
            </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
              label="品牌网址"
              width="180>">
          <template slot-scope="scope">
              <span>{{scope.row.url}}</span>
          </template>
        </el-table-column>
        <el-table-column
                label="品牌描述"
                width="180>">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column
                label="排序"
                width="80>">
          <template slot-scope="scope">
            <span>{{scope.row.sort_order}}</span>
          </template>
        </el-table-column>
        <el-table-column
                label="是否显示"
                width="80>">
          <template slot-scope="scope">
            <i :class="scope.row.is_show | checkSign"></i>
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
              @click="handleDelete(scope.$index, scope.row),open()">删除</el-button>
    <!--删除提示框-->
          </template>
        </el-table-column>
      </el-table>

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
        TB: [],
        tbData:{},
        msg:'',
        delarr:[],
        page:{
          currentPage1: 1,
          pageSize:0,
          totalNum:0,
          from:null
        }

      }
    },
    filters:{
      checkSign(val){
        return val? "el-icon-check":"el-icon-close"
      }
    },
    created(){
       this.refresh()
    },
    methods: {
        refresh(){
            axios.get(`http://127.0.0.1:8000/admin/shop/brands`).then(res=>{
              this.TB = res.data.data.brands.data;
              this.tbData = res.data.data.brands;
              this.getval()

                // console.log(this.tbData)
            })
        },
      getval(){
          this.page={
          pageSize:this.tbData.per_page,
          totalNum : this.tbData.total,
          currentPage1 : this.tbData.current_page,
          from : this.tbData.from,
        }
      },
      jump(){
            this.$router.push({ path:'/sbform'})
      },

      handleEdit(index, row) {
        console.log(index, row);
          this.$router.push({name:'edit',params:{id:row.id}})
      },
      handleDelete(index, row) {
        // console.log(index, row);
        this.msg=row;//每一条数据的记录
        this.delarr.push(this.msg.id);//把单行删除的每条数据的id添加进放删除数据的数组
        console.log(this.delarr);
        // this.TB.splice(index,1);

      },
      cleararr(){
          this.delarr=[]
      },
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.delarr[0];
          axios.delete(`http://127.0.0.1:8000/admin/shop/brands/`+id).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.handleCurrentChange(this.page.currentPage1)
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.handleCurrentChange(this.page.currentPage1)
      },
      handleCurrentChange(val) {
          this.page.currentPage1 = val;

          axios.get(`http://127.0.0.1:8000/admin/shop/brands?page=${this.page.currentPage1}`).then(res=>{
            this.tbData = res.data.data.brands;
            this.TB =this.tbData.data
            this.getval()
            console.log(this.page.from)

            if (this.page.from == null){
              this.page.currentPage1=val-1
              axios.get(`http://127.0.0.1:8000/admin/shop/brands?page=${this.page.currentPage1}`).then(res=>{
                this.TB = res.data.data.brands.data;
                // this.getval()
              })
            }
            // console.log(res.data.data.brands)
          })
        this.cleararr()
        console.log(`当前页: ${val}`);

      },
    }
  }
</script>

<style>
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
   .cell .el-button+.el-button {
      margin-left: 0;
      margin-top:5px
    }
</style>
