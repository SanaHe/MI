<template>
	<div id="app">
		<el-container>
			<el-header>
				<topheader></topheader>
			</el-header>

			<el-container>
				<asidemenu></asidemenu>

				<el-main>
					<transition name="el-fade-in">
						<router-view/>
					</transition>
				</el-main>
			</el-container>
		</el-container>

	</div>

</template>


<script>
	import topheader from './shared/topheader.vue'
	import asidemenu from "./shared/asidemenu";
    export default {

		components:{
			topheader,
			asidemenu
		},
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
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

<style>
	html,body,#app,.el-container{
		height: 100%;
	}
	.el-header{
		padding: 0;
	}


	.aside_menu li{
		width: 199px;
		background-color: #545c64;
	}





</style>
