<template>
    <div class="p_edit">
        <el-form :model="products" :rules="rules" ref="products" label-width="100px" class="demo-ruleForm">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="通用信息" name="first">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="products.name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类">
                        <el-select v-model="products.category_id" multiple placeholder="请选择">
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
                    <el-form-item label="单价" prop="price">
                        <el-input v-model="products.price"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" prop="stock">
                        <el-input v-model="products.stock"></el-input>
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
                    <el-form-item label="商品描述" prop="description">
                        <el-input type="textarea" v-model="products.description"></el-input>
                    </el-form-item>
                    <el-form-item label="是否上架">
                        <el-switch v-model="products.is_onsale"></el-switch>
                    </el-form-item>
                    <el-form-item label="加入推荐">
                        <el-checkbox v-model="products.is_top">置顶</el-checkbox>
                        <el-checkbox v-model="products.is_recommend">推荐</el-checkbox>
                        <el-checkbox v-model="products.is_hot">热销</el-checkbox>
                        <el-checkbox v-model="products.is_new">新品</el-checkbox>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="商品介绍" name="second">
                    <div class="quill-editor-example">
                        <!-- quill-editor -->
                        <quill-editor ref="myTextEditor"
                                      v-model="content"
                                      :options="editorOption"
                                      @blur="onEditorBlur($event)"
                                      @focus="onEditorFocus($event)"
                                      @ready="onEditorReady($event)">
                        </quill-editor>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品相册" name="third">
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-tab-pane>
            </el-tabs>


            <el-form-item>
                <el-button type="primary" @click="submitForm('products')">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "P_form",
        data(){
          return{
              activeName:'first',
              textarea2: '',
              tableData:[],
              fileList:[],
              dialogVisible:false,
              dialogImageUrl:'',
              products:{
                  name: '',
                  category_id: [],
                  is_hot: false,
                  is_new: false,
                  is_recommend: false,
                  is_top: false,
                  is_onsale: false,
              },
              rules: {
                  name: [
                      {required: true, message: '请输入商品名称', trigger: 'blur'},
                      {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
                  ],
                  price: [
                      {required: true, message: '请输入商品单价', trigger: 'blur'}
                  ],
                  description: [
                      {min: 0, max: 300, message: '不能超过300字', trigger: 'blur'}
                  ],
                  // stock: [
                  //     {type: 'number', message: '库存必须是数字'}
                  // ]
              },
              content: ``,
              editorOption: {
                 placeholder:'请输入商品介绍'
              }
          };
        },
        created(){
            axios.get(`http://127.0.0.1:8000/admin/shop/categories`).then(res=> {
                this.tableData = res.data.data.categories
                console.log(this.tableData)
            })
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        axios.post(`http://127.0.0.1:8000/admin/shop/products`, this.products).then(res => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，创建成功',
                                type: 'success'
                            })
                            this.$router.push({name: 'product'})
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },resetForm(formName) {
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
                this.products.image = response.image_url;
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
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            onEditorBlur(editor) {
                console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },
        },


    }
</script>

<style>
.quill-editor .ql-container{
    height:200px;
    margin-bottom:10px;
}
</style>