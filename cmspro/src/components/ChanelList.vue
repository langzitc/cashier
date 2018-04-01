<template>
    <!--<Tree :data="datas" show-checkbox></Tree>-->
    <TableList :datas="datas"></TableList>
</template>
<script>
	import TableList from './TableList'
    export default {
    	name: "ChanelList",
        data () {
            return {

            }
        },
        computed: {
        	datas(){
        		return this.$store.state.resource.chanelList2;
        	}
        },
        mounted () {
            this.$store.dispatch("getChanelList",1);
        },
        components: {
        	TableList
        }
    }
</script>

<style>
</style>