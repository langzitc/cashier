<template>
	<div style="width: 600px;">
    <Form :model="formItem" ref="formValidate" :label-width="80" :rules="ruleValidate">
        <FormItem label="栏目名称" prop="title">
            <Input v-model="formItem.title" placeholder="栏目名称"></Input>
        </FormItem>
        <FormItem label="SEO标题" prop="seotitle">
			<Input v-model="formItem.seotitle" placeholder="SEO标题"></Input>
        </FormItem>
        <FormItem label="简介" prop="description">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>        
        <FormItem label="关键词" prop="keywords">
			<Input v-model="formItem.keywords" placeholder="多个用逗号隔开"></Input>
        </FormItem>
        <FormItem label="排序">
			<Input v-model="formItem.orders" placeholder="1-100"></Input>
        </FormItem>        
        <FormItem label="类型">
            <RadioGroup v-model="formItem.chaneltype">
                <Radio label="1">最终栏目</Radio>
                <Radio label="0">频道栏目</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="热点" prop="hottype">
            <CheckboxGroup v-model="formItem.hottype">
                <Checkbox label="1">热点</Checkbox>
                <Checkbox label="2">推荐</Checkbox>
                <Checkbox label="3">点击</Checkbox>
                <Checkbox label="4">首页</Checkbox>
                <Checkbox label="5">图片</Checkbox>
                <Checkbox label="6">视频</Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem label="启用栏目">
            <i-switch v-model="formItem.istop" size="large">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </i-switch>
        </FormItem>
        <FormItem label="父栏目">
            <Cascader :data="chanelList" change-on-select @on-change="chanelChange"></Cascader>
        </FormItem>        
        <FormItem label="栏目模板">
            <Cascader :data="templateList" v-model="formItem.chaneltemplate"></Cascader>
        </FormItem>
        <FormItem label="列表模板">
            <Cascader :data="templateList" v-model="formItem.listtemplate"></Cascader>
        </FormItem>
        <FormItem label="文章模板">
            <Cascader :data="templateList" v-model="formItem.articletemplate"></Cascader>
        </FormItem>        
        <FormItem label="栏目图片">
		    <div class="demo-upload-list" v-for="item in uploadList">
		        <template v-if="item.status === 'finished'">
		            <img :src="item.url">
		            <div class="demo-upload-list-cover">
		                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
		                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
		            </div>
		        </template>
		        <template v-else>
		            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
		        </template>
		    </div>
		    <Upload
		        ref="upload"
		        :show-upload-list="false"
		        :default-file-list="defaultList"
		        :on-success="handleSuccess"
		        :format="['jpg','jpeg','png']"
		        :max-size="2048"
		        :on-format-error="handleFormatError"
		        :on-exceeded-size="handleMaxSize"
		        :before-upload="handleBeforeUpload"
		        type="drag"
		        action="/service/upload/fileupload"
		        :data="tocken"
		        style="display: inline-block;width:58px;">
		        <div style="width: 58px;height:58px;line-height: 58px;">
		            <Icon type="camera" size="20"></Icon>
		        </div>
		    </Upload>
		    <Modal title="查看图片" v-model="visible">
		        <img :src="imgName" v-if="visible" style="width: 100%">
		    </Modal>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>		
	</div>
</template>
<script>
    export default {
    	name: "AddChanel",
        data () {
            return {
                formItem: {
                    title: '',
                    seotitle: '',
                    description: '',
                    keywords: "",
                    imgs: "",
                    orders: 1,
                    hottype: ["1"],
                    chaneltype: 1,
                    rechanelid: [],
                    istop: true,
                    chaneltemplate: ["chanel.ejs"],
                    listtemplate: ["list.ejs"],
                    articletemplate: ["article.ejs"]
                },
                defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                ruleValidate: {
                    title: [
	                    { required: true, message: '栏目名称不能为空', trigger: 'blur' },
	                    { type: 'string', min: 2, message: '不能少于2个字', trigger: 'blur' },
	                    { type: 'string', max: 10, message: '不能超过10个字', trigger: 'blur' }
                    ],
                    seotitle: [
	                    { type: 'string', max: 10, message: '不能超过20个字', trigger: 'blur' }                    
                    ],
                    description: [
						{ type: 'string', max: 100, message: '不能超过100个字', trigger: 'blur' }                     
                    ],
                    hottype: [
                        { type: 'array', max: 1, message: '最多选择1个', trigger: 'change' }                    
                    ]
                }
            }
        },
        methods: {
            handleView (item) {
                this.imgName = item.response.path;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
            	file.url = res.path;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 2;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 1 张图片。'
                    });
                }
                return check;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let pdata = JSON.parse(JSON.stringify(this.formItem));
                    	let pob = {};
                    	pob.tocken = this.$store.state.user.tocken;
                    	if(pdata.hottype.length){
                    		pob.hottype = pdata.hottype[0];
                    	}
                    	pob.chaneltemplate = pdata.chaneltemplate.join("");
                    	pob.articletemplate = pdata.chaneltemplate.join("");
                    	pob.listtemplate = pdata.chaneltemplate.join("");
                    	if(this.uploadList.length){
                    		pob.imgs = this.uploadList[0].url; 
                    	}
                    	Object.assign(pdata,pob);
						reqwest({
						    url: '/service/addchanel',
							type: 'json',					
						    method: 'post',
						    data: pdata,
						}).then((res)=>{
								if(res.code === 200){
									this.$Message.success('提交成功!');
								}else{
									this.$Message.success('提交失败!');
								}
						}).fail((err,msg)=>{
							console.log(msg);
						})	                    	
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },  
            chanelChange (value) {
            	if(value.length){
            		this.formItem.rechanelid = value[value.length-1];
            	}
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
            this.$store.dispatch("getChanelList",0);
        },
        computed: {
        	templateList (){
        		return this.$store.state.resource.templateList;
        	},
        	chanelList (){
        		return this.$store.state.resource.chanelList;
        	},
            tocken (){
            	return {tocken: this.$store.state.user.tocken};
            }        	
        }
    }
</script>

<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }	
</style>