<template>
    <div>
    	<Table :loading="loading" border :columns="columns" :data="data"></Table>
	    <div style="margin: 10px;overflow: hidden">
	        <div style="float: right;">
	            <Page :total="total" :page-size="size" size="small" :current="page" @on-change="changePage"></Page>
	        </div>
	    </div>    	
    </div>
</template>
<script>
	function getUser(size,page,tocken,context){
		context.loading = true;
		reqwest({
		    url: '/service/userlist',
			type: 'json',					
		    method: 'get',
		    data: {tocken: tocken,size: size,page: page},
		}).then((res)=>{
			context.total = res.count;
			context.data = res.rows;
		}).always(()=>{
			context.loading = false;
		})
	}
    export default {
    	name: "UserList",
        data () {
            return {
            	total: 0,
            	page: 1,
            	size: 10,
            	loading: true,
                columns: [
                    {
                        title: '手机',
                        key: 'tel'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '角色',
						render: (h, params)=>{
							return h("span",params.row.role.name);
						}
                    },
                    {
                        title: '状态',
						render: (h, params)=>{
							return h("span",params.row.flag ? '可用' : '禁止');
						}
                    },                    
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params)
                                        }
                                    }
                                }, '编辑'),                                
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods: {
            show (params) {
            	let reg = new Date(params.row.regtime).Format("yyyy-MM-dd hh:mm:ss");
            	let exp = new Date(params.row.exptime).Format("yyyy-MM-dd hh:mm:ss");
                this.$Modal.info({
                    title: '用户信息',
                    content: `
                    		姓名：${params.row.tel}<br>
                    		年龄：${params.row.email}<br>
                    		注册时间 : ${reg}<br>
                    		过期时间 : ${exp}<br>
                    		地址：${params.row.password}`
                })
            },
            remove (params) {
                this.data6.splice(index, 1);
            },
            edit (params) {
            	
            },
            changePage (page){
            	getUser(this.size,page,this.$store.state.user.tocken,this);
            }
        },
        mounted(){
        	getUser(this.size,this.page,this.$store.state.user.tocken,this);
        }
    }
</script>
<style>
</style>