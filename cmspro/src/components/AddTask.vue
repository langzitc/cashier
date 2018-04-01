<template>
	<div style="width:600px">
    <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120">
        <FormItem label="任务名" prop="name">
            <Input v-model="formItem.name" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="小说栏目">
        	<Cascader :data="storyTypeList" v-model="formItem.story_type"></Cascader>
        </FormItem>
        <FormItem label="采集源URL" prop="source_path">
            <Input v-model="formItem.source_path" placeholder="请输入"></Input>
        </FormItem>      
        <FormItem label="时间类型" prop="task_time_type">
            <CheckboxGroup v-model="formItem.task_time_type">
                <Checkbox label="day">每天</Checkbox>
                <Checkbox label="week">每周</Checkbox>
                <Checkbox label="month">每月</Checkbox>
                <Checkbox label="other">自定义</Checkbox>
            </CheckboxGroup>
        </FormItem> 
        <FormItem label="采集时间">
            <DatePicker type="datetime" v-model="formItem.task_time" placeholder="选择日期"></DatePicker>
        </FormItem>   
        <FormItem label="规则">
			<Input v-model="formItem.rules" placeholder="请输入" type="textarea" :rows="8"></Input>			
        </FormItem>        
        <FormItem label="自动采集">
            <i-switch v-model="formItem.auto_collection" size="large">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </i-switch>
        </FormItem> 
        <FormItem label="自动导入">
            <i-switch v-model="formItem.auto_import" size="large">
                <span slot="open">开启</span>
                <span slot="close">关闭</span>
            </i-switch>
        </FormItem>         
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>		
	</div>
</template>
<script>
    export default {
    	name: "AddTask",
        data () {
            return {
                formItem: {
                    name: '',
                    source_path: '',
                    task_time: '',
                    task_time_type: [],
                    auto_collection: true,
                    auto_import: true,
                    story_type: [],
                    rules: "<br>c_list:$('.clist')|<br>c_url:$('.curl')|<br>c_title:$('c_title')|<br>c_list:$('.clist')|<br>c_url:$('.curl')|<br>c_title:$('c_title')|<br>c_list:$('.clist')|<br><br>c_url:$('.curl')|<br>c_title:$('c_title')|<br>c_list:$('.clist')|<br>c_url:$('.curl')|<br>c_title:$('c_title')|<br>c_list:$('.clist')|<br>c_url:$('.curl')|<br>c_title:$('c_title')"
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '任务名不能为空', trigger: 'blur' }
                    ],                   
                    source_path: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],                 
                    task_time_type: [
                        { required: true, type: 'array', min: 1, message: '至少1位', trigger: 'change' },
                        { type: 'array', max: 1, message: '最多1位', trigger: 'change' }
                    ],
                    task_time: [
                    	{ required: true, message: '时间不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
        	storyTypeList(){
        		return this.$store.state.resource.storyTypeList2;
        	}
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let data = JSON.parse(JSON.stringify(this.formItem));
                    	data.task_time_type = data.task_time_type[0];
                    	data.task_time = (new Date(data.task_time)).getTime();
                    	data.tocken = this.$store.state.user.tocken;
                    	data.typeid = data.story_type[data.story_type.length-1];
                    	delete data.story_type;
						reqwest({
						    url: '/service/addtask',
							type: 'json',	
							data: data,
						    method: 'post',
						}).then((res)=>{
							if(res.code === 200){
								this.$Message.success(res.msg);	
							}else{
								this.$Message.error(res.msg);	
							}
						})	                    	
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style>
</style>