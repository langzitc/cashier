<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
	import router from './router'
export default {
  name: 'app',
  created(){
		reqwest.ajaxSetup({
		  dataFilter: function (response, type) {
		  	let res = JSON.parse(response);
				if(res.code === 202){
					router.push("/login");
				}else{
					return response;
				}
		  }
		});
  }
}
</script>

<style>
html,body,#app{
	width: 100%;
	height: 100%;
}	
</style>
