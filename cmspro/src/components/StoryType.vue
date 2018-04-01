<template>
	<div>
		<Tree :data="baseData" show-checkbox ref="tree" @on-check-change="checkNode"></Tree>
	    <ButtonGroup>
	        <Button type="info" size="small"  @click="add">增加分类</Button>
	        <Button type="error" size="small" :disabled="isOper" @click="del">删除分类</Button>
	        <Button type="ghost" size="small" :disabled="isOper" @click="edit">编辑分类</Button>
	    </ButtonGroup>		
	    <Modal
	        v-model="maddtype"
	        :title="title"
	        @on-ok="sub">
		    <Form :label-width="80">
		        <FormItem label="父类">
		            <Input v-model="rname" disabled></Input>
		        </FormItem>		    	
		        <FormItem label="分类名称">
		            <Input v-model="name" placeholder="请输入"></Input>
		        </FormItem>
		    </Form>    
	    </Modal>	    
	</div>
</template>

<script>
	export default {
		name: "StoryType",
		data(){
			return {
				maddtype: false,
				name: "",
				isOper: "disabled",
				id: 0,
				rid: 0,
				rname: "无",
				title: "",
				type: true
			}
		},
		computed: {
			baseData(){
				return this.$store.state.resource.storyTypeList;
			}
		},
		methods: {
			sub(){
				let data,url;
				if(!this.type){
					url = '/service/storytypeedit';
					data = {tocken: this.$store.state.user.tocken,id: this.id,rid: this.rid,name: this.name};					
				}else{
					url = '/service/storytypeadd';
					data = {tocken: this.$store.state.user.tocken,rid: this.id,name: this.name};
				}
				reqwest({
				    url: url,
					type: 'json',	
				    method: 'post',
				    data: data,
				}).then((res)=>{
					if(res.code === 200){
						this.$store.dispatch("getStoryTypeList",res.data);
						this.$Message.success(res.msg);
					}else{
						this.$Message.error(res.msg);
					}
				})					
			},
			checkNode(){
				let a = this.$refs.tree.getCheckedNodes();
				this.isOper = a.length ? false : true;
				if(a.length){
					this.id = a[a.length-1].id;
					this.rname = a[a.length-1].title;
					this.rid = a[a.length-1].rid;
				}
			},
			edit(){
				this.type = false;
				this.maddtype = true;
				this.title = "修改分类";
			},
			add(){
				this.type = true;
				this.maddtype = true;
				this.title = "添加分类";
			},
			del(){
				reqwest({
				    url: '/service/storytypedel',
					type: 'json',	
				    method: 'post',
				    data: {tocken: this.$store.state.user.tocken,id: this.id},
				}).then((res)=>{
					if(res.code === 200){
						this.$store.dispatch("getStoryTypeList",res.data);
						this.$Message.success(res.msg);
					}else{
						this.$Message.error(res.msg);
					}
				})				
			}
		}
	}
</script>

<style>
	
</style>