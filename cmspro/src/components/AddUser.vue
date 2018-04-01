<template>
	<div style="width:600px">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="手机" prop="tel">
            <Input v-model="formValidate.tel" placeholder="请输入手机号"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
        </FormItem>        
        <FormItem label="角色" prop="role">
            <CheckboxGroup v-model="formValidate.role" @on-change="test">
                <Checkbox v-for="el in roleList" :label="el.id" :key="el.id">{{el.name}}</Checkbox>
            </CheckboxGroup>
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
    	name: "AddUser",
        data () {
            return {
                formValidate: {
                    tel: '',
                    email: '',
                    role: [],
                    password: ''
                },
                ruleValidate: {
                    tel: [
                        { required: true, message: '手机号不能为空', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                    ],
                    role: [
                        { required: true, type: 'array', min: 1, message: '至少选择一个角色', trigger: 'change' },
                        { type: 'array', max: 1, message: '最多选择一个个角色', trigger: 'change' }
                    ],
                    password: [
                        { required: true, type: 'string', min: 6, message: '至少6位', trigger: 'change' },
                        { type: 'string', max: 16, message: '最多16位', trigger: 'change' }
                    ]                    
                }
            }
        },
        computed: {
        	roleList(){
        		return this.$store.state.resource.roleList;
        	}
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                    	let data = JSON.parse(JSON.stringify(this.formValidate));
                    	data.tocken = this.$store.state.user.tocken;
                        this.$store.dispatch("addUser",{
                        	data: data,
                        	msg: this.$Message
                        })
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            test(s){
            	console.log(s);
            }
        }
    }
</script>

<style>
</style>