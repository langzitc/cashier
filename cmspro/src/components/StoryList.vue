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
    	name: "StoryList",
        data () {
            return {
            	total: 0,
            	page: 1,
            	size: 10,
            	loading: true,            	
                columns: [
                    {
                        title: '小说名',
                        key: 'title'
                    },
                    {
                        title: 'SEO标题',
                        key: 'seotitle'
                    },
                    {
                        title: '简介',
                        key: 'description'
                    },
                    {
                        title: '关键字',
                        key: 'keywords'
                    },
                    {
                        title: '发布时间',
                        key: 'publish_time'
                    },
                    {
                        title: '作者',
                        key: 'author'
                    },
                    {
                        title: '来源',
                        key: 'source'
                    },
                    {
                    	title: "类型",
                    	key: 'type'
                    },
                    {
                        title: '封面',
                        key: 'img'
                    }                     
                ],
                data: []
            }
        },
        methods: {
        	getData(){
				this.loading = true;
				reqwest({
				    url: '/service/storylist',
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