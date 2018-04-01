<template>
	<div>
	    <Table :loading="loading" stripe :columns="columns" :data="data"></Table>
	    <div style="text-align: right;padding: 20px 0;">
	    	<Page :total="total" :page-size="size" size="small" :current="page" @on-change="changePage"></Page>	
	    </div>	
	</div>
</template>
<script>
    export default {
    	name: "TaskList",
        data () {
            return {
            	total: 0,
            	page: 1,
            	size: 10,
            	loading: true,            	
                columns: [
                    {
                        title: '任务名',
                        key: 'name'
                    },
                    {
                        title: '保存路径',
                        key: 'save_path'
                    },
                    {
                        title: '来源',
                        key: 'source_path'
                    },
                    {
                        title: '采集时间',
                        key: 'task_time'
                    },
                    {
                        title: '是否采集',
                        key: 'finished'
                    },
                    {
                        title: '自动导入',
                        key: 'auto_import'
                    },
                    {
                        title: '定时类型',
                        key: 'task_time_type'
                    },
                    {
                    	title: "类型",
                    	key: 'storytype'
                    },
                    {
                        title: '是否已导入',
                        key: 'is_import'
                    }                     
                ],
                data: []
            }
        },
        methods: {
        	getData(){
				this.loading = true;
				reqwest({
				    url: '/service/tasklist',
					type: 'json',					
				    method: 'get',
				    data: {tocken: this.$store.state.user.tocken,size: this.size,page: this.page},
				}).then((res)=>{
					this.total = res.count;
					this.data = res.rows;
				}).always(()=>{
					this.loading = false;
				})        		
        	},
            changePage (page){
            	this.getData();
            }
        },
        mounted(){
        	this.getData();
        }
    }
</script>

<style>
</style>