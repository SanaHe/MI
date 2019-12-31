<template>
    <div class="sbform">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商城管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/brand'}">商品品牌</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <h2>新增品牌</h2>
        <el-form :model="brands" :rules="rules" ref="brands" label-width="100px" class="demo-ruleForm">
            <el-form-item label="品牌名称" prop="name">
                <el-input v-model="brands.name"></el-input>
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
            <el-form-item label="品牌网址" prop="url">
                <el-input v-model="brands.url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort_order">
                <el-input v-model.number="brands.sort_order"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="is_show">
                <el-switch v-model="brands.is_show"></el-switch>
            </el-form-item>
            <el-form-item label="品牌描述" prop="description">
                <el-input type="textarea" v-model="brands.description"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('brands')">立即创建</el-button>
                <el-button>取消</el-button>
                <el-button @click="resetForm('brands')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "sbform",
        data() {
            return {
                fileList:[],
                dialogVisible:false,
                dialogImageUrl:'',
                brands: {
                    name: '',
                    url: '',
                    sort_order: 2,
                    is_show: true,
                    image: '',
                    description: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: '请输入品牌网址', trigger: 'blur'}
                    ],
                    description: [
                        {min: 0, max: 300, message: '不能超过300字', trigger: 'blur'}
                    ],
                    sort_order: [
                        {type: 'number', message: '排序内容必须是数字'}
                    ]
                }
            };
        },
        methods: {

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`http://127.0.0.1:8000/admin/shop/brands`, this.brands).then(res => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，这是一条成功消息',
                                type: 'success'
                            })
                            this.$router.push({name: 'brand'})
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
            handleExceed(files, fileList) {
                this.$message.error('最多只能上传一张图片！')
            },
            handlePreview(file) {
                this.dialogVisible = true;
                this.dialogImageUrl = file.url;
            },
            handleSuccess(response, file, fileList) {
                console.log(file);
                this.brands.image = response.image_url;
            },
            handleRemove(file, fileList) {
                this.brands.image = '';
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
            }
        }
    }
</script>

<style scoped>

</style>