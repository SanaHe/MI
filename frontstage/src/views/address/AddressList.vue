<template>
    <div class="addresslist">
        <div id="wrapper">
            <div class="page-address-list" data-log="地址列表">
                <div class="address-choose" v-if="address">
                    <ul class="ui-list" v-for="item in address" >
                        <li class="ui-list-item" @click="SelAddress(item.id)"><p class="ui_fz30"><span class="consignee">{{item.name}}</span><span>{{item.tel}}</span></p>
                            <p>{{item.province+' '+item.city+' '+item.area}}</p>
                            <p>{{item.detail}}</p></li>
                    </ul>
                </div>
                <div class="a_choose" v-else>
                    <strong>请新建地址</strong>
                </div>
                <div class="add"><a href="/newaddress" class="ui-button ui-button-active"><span>新建地址</span></a></div>
                <div class="popup-risk-check"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddressList",
        data(){
            return{
                address:{},
            }
        },
        created(){
            this.axios.get(`api/address`).then(res=>{

                this.address = res.data
                console.log(this.address);
            })
        },
        methods:{
            SelAddress(id){
                this.axios.patch(`api/address`,{address_id:id}).then(res=>{
                    this.$router.push({name:'checkaddress'})
                })
            },
        }
    }
</script>

<style scoped>

</style>