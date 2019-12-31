<template>
    <div class="sbform">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/cate'}">商品分类</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>新增分类</h2>
        <el-form :model="categories" :rules="rules" ref="categories" label-width="100px" class="demo-ruleForm">
            <el-form-item label="二级分类" prop="name">
                <el-input v-model="categories.name"></el-input>
            </el-form-item>

            <el-form-item label="缩略图" prop="image">
                <el-upload
                        class="upload-demo"
                        drag
                        action="/admin/photo"
                        :limit="1"
                        :on-exceed="handleExceed"
                        :on-preview="handlePreview"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                        :before-upload="handleBeforeUpload"
                        :file-list="fileList"
                        list-type="picture">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品分类">
                <template>
                    <el-select v-model="categories.parent_id" placeholder="请选择">
                        <el-option
                                v-for="item in tableData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="是否显示" prop="is_show">
                <el-switch v-model="categories.is_show"></el-switch>
            </el-form-item>
            <el-form-item label="排序" prop="sort_order">
                <el-input v-model.number="categories.sort_order"></el-input>
            </el-form-item>
            <el-form-item label="品牌描述" prop="description">
                <el-input type="textarea" v-model="categories.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('categories')">立即创建</el-button>
                <el-button @click="resetForm('categories')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "sbform",
        data(){
            return{

                fileList:[],
                dialogVisible:false,
                dialogImageUrl:'',
                tableData:[],
                categories:{
                    name: '',
                    image:'',
                    is_show:true,
                    sort_order:'',
                    description: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: '请输入品牌网址', trigger: 'blur' }
                    ],
                    description: [
                        { min:0, max:300, message: '不能超过300字', trigger: 'blur' }
                    ],
                    sort_order:[
                        {type:'number', message:'排序内容必须是数字'}
                    ]
                }
            }
        },
        created(){
            axios.get(`http://127.0.0.1:8000/admin/shop/categories`).then(res=>{
                this.tableData = res.data.data.categories
                console.log(res)
            })
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`http://127.0.0.1:8000/admin/shop/categories`, this.categories).then(res => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，这是一条成功消息',
                                type: 'success'
                            })
                            this.$router.push({name: 'cate'})
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleExceed(files, fileList){
                this.$message.error('最多只能上传一张图片！')
            },
            handlePreview(file){
                this.dialogVisible=true;
                this.dialogImageUrl = file.url;
            },
            handleSuccess(response, file, fileList) {
                console.log(response);
                this.categories.image = response.image_url;
            },
            handleRemove(file, fileList){
                this.categories.image = '';
            },
            handleBeforeUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGIF = file.type === 'image/jpeg';

                if (!isJPG && !isPNG && !isGIF) {
                    this.$message.error("上传文件类型必须是jpg/png/gif格式!");
                    return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error("上传图片大小不能超过2M!");
                    return false
                }
            },
        }
    }
</script>

<style>

</style>