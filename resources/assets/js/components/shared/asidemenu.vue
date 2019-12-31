<template>
    <div class="asidemenu">
        <el-aside >
            <el-col :span="24">
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-vertical-demo aside_menu"
                        @open="handleOpen"
                        @close="handleClose"
                        :router="true"
                        width="199px"
                        background-color="#545c64"
                        text-color="#fff"
                        overflow="hidden"
                        active-text-color="#ffd04b">
                    <el-menu-item index="/">
                        <i class="el-icon-menu"></i>
                        <span slot="title" class="br">首页</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商城管理</span>
                        </template>
                        <el-menu-item index="/charts" class="s_active">
                            <i class="el-icon-rank"></i>
                            <span slot="title">仪表盘</span>
                        </el-menu-item>
                        <el-menu-item index="/brand" class="s_active">
                            <i class="el-icon-s-goods"></i>
                            <span slot="title">商品品牌</span>
                        </el-menu-item>
                        <el-menu-item index="/cate">
                            <i class="el-icon-more-outline"></i>
                            <span slot="title">商品分类</span>
                        </el-menu-item>
                        <el-menu-item index="/customers">
                            <i class="el-icon-user"></i>
                            <span slot="title">会员管理</span>
                        </el-menu-item>
                        <el-menu-item index="/product">
                            <i class="el-icon-goods"></i>
                            <span slot="title">商品管理</span>
                        </el-menu-item>
                        <el-menu-item index="/orders">
                            <i class="el-icon-view"></i>
                            <span slot="title">订单管理</span>
                        </el-menu-item>
                        <el-menu-item index="/recycleBin">
                            <i class="el-icon-delete"></i>
                            <span slot="title">商品回收站</span>
                        </el-menu-item>
                    </el-submenu>

                    <!--							<el-menu-item index="3" disabled>-->
                    <!--								<i class="el-icon-document"></i>-->
                    <!--								<span slot="title">导航三</span>-->
                    <!--							</el-menu-item>-->
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统管理</span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i class="el-icon-delete"></i>
                        <span slot="title">商品</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-aside>

    </div>
</template>

<script>
    export default {
        name: "asidemenu",
        name: "topheader",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '/'
            };
        },
        created(){
            // console.log(this.$route)
            this.activeIndex2 = this.$route.path
        },

        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleOpen(){

            },
            handleClose(){

            }
        }
    }
</script>

<style scoped>
    .el-aside{
        width: 199px!important;
        height: 100%;
        overflow:hidden!important;
    }
    .el-col-24 {
        height: 100%;
    }
    .el-col .el-menu{
        height: 100%;
        border-right:none;
    }
    .s_active:active{
        color:rgb(255, 208, 75)
    }
</style>