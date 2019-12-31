<template>
    <div class="newAddress">
        <div id="wrapper">
            <div class="page-address-edit" data-log="地址">

                <div class="edit-box" v-model="address">
                    <ul class="ui-list">
                        <li class="ui-list-item">
                            <div class="label">收货人：</div>
                            <div class="ui-input"><input placeholder="真实姓名" name="consignee" v-model="address.name" maxlength="15" type="text" ></div>
                        </li>
                        <li class="ui-list-item">
                            <div class="label">手机号码：</div>
                            <div class="ui-input"><input placeholder="手机号" name="tel" v-model.number="address.tel" maxlength="13" type="tel"></div>
                        </li>
                        <li class="ui-list-item">
                            <div class="label">所在地区：</div>
                            <div class="ui-input" @click="doShow">
                                <input placeholder="省 市 区"  name="pcd" maxlength="20" type="text" readonly="readonly" :value="address.pca" >
                            </div>
                        </li>
                        <li class="ui-list-item">
                            <div class="label">街道地址：</div>
                            <div class="ui-input"><input placeholder="详细地址" name="address" v-model="address.detail" maxlength="120" type="text"></div>
                        </li>
                    </ul>
                    <div class="save-button">
                        <a href="javascript:;" class="ui-button" @click="saveAddress"><span>保存地址</span></a>
                    </div>
                </div>


                <div class="ui-mask" style="display:none;"></div>
                <div class="ui-pop" v-if="showing">
                    <div class="ui-pop-content">
                        <div class="region-list">
                            <template>
                                <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
                            </template>
                        </div>
                    </div>
                    <div class="ui-pop-title">选择所在地区</div>
                    <div class="ui-pop-close" @click="doShow"><a><span class="fa fa-window-close-o" style="color: #ccc;font-size: 18px"></span></a></div>
                </div>


                <div class="popup-risk-check"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewAddress",
        data(){
            return{

                showing:false,
                address:{
                    pca:'',
                }
            }
        },
        methods:{
            doShow(){
                return this.showing=!this.showing
            },
            onSelected(data){
                this.address.pca=data.province.value+' '+data.city.value+' '+data.area.value
            },
            saveAddress(){
                this.axios.post(`api/address`,this.address).then(res=>{
                    this.$router.push({name:'addresslist'})
                })
            }
        }
    }
</script>

<style scoped>

</style>