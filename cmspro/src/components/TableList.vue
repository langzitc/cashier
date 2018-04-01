<template>
	<div class="tl-div clearfix">
		<div v-for="(el,index) in datas" class="dubox clearfix" block="1">
			<div class="line"></div>
			<div class="duitem">
				<span v-on:click="expand(el)">
					<Icon type="android-expand" v-show="!el.expand" size="16"></Icon>
					<Icon type="android-contract" v-show="el.expand" size="16"></Icon>					
				</span>
				<Checkbox v-model="el.checked"></Checkbox>
				<span>
					{{el.title}}
					[ID:{{el.id}}]
				</span>
				<span v-if="el.chaneltype">
					(文档:<font style="color: red;">{{el.id}}</font>)
				</span>
				<span v-if="!el.istop">
					<Icon type="eye-disabled"></Icon>
				</span>
				<span v-if="el.chaneltype">
					<Icon type="edit"></Icon>
				</span>
			</div>			
			<div class="duitem text-right">
					<span class="oper-item" :disabled="el.id===0">预览</span>|
					<span v-if="el.chaneltype" class="oper-item" :disabled="el.id===0">内容</span>|
					<span class="oper-item" :disabled="el.id===0">增加子类</span>|
					<span class="oper-item" :disabled="el.id===0">更改</span>|
					<span class="oper-item" :disabled="el.id===0">移动</span>|
					<span class="oper-item" :disabled="el.id===0">删除</span>
			</div>	
			<div v-if="el.children" v-show="el.expand">
				<TableList :datas="el.children"></TableList>	
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TableList",
		data(){
			return {}
		},
        props: {
		    datas: {
		    	type: Array,
		    	default: [],
		    	required: true
		    }
        },
        methods: {
        	expand(el){
        		console.log(1);
        		el.expand = !el.expand;
        	}
        }
	}
</script>

<style>
	.duitem{
		float: left;
		width: 50%;
		height: 30px;
		line-height: 30px;
	}
	.tl-div{
		width: 100%;
	}
	.dubox{
		width: 100%;
		padding-left: 10px;
		float: left;
	}
	.line{
		width: 100%;
		height: 1px;
		border-bottom: 1px dashed #ddd;
	}
	.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
	.clearfix{*+height:1%;}
	.text-right{
		text-align: right;
	}
	.oper-item[disabled=disabled]{
		color: #ddd;
	}
</style>