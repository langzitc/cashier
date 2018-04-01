<template>
	<div class="login-box">
		<ul class="login-tip">
			<li><a href="#/">网站首页</a></li>
			<li><a href="#/register">注册</a></li>
			<li><a href="">找回密码</a></li>
		</ul>
		<div class="login-wrap">
		    <Form ref="formInline" :model="formInline" :rules="ruleInline">
		        <FormItem prop="user">
		            <Input type="text" v-model="formInline.user" placeholder="手机号|邮箱">
		                <Icon type="ios-person-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem prop="password">
		            <Input type="password" v-model="formInline.password" placeholder="密码">
		                <Icon type="ios-locked-outline" slot="prepend"></Icon>
		            </Input>
		        </FormItem>
		        <FormItem label="记住密码">
		            <i-switch v-model="formItem.switch" size="large">
		                <span slot="open">开启</span>
		                <span slot="close">关闭</span>
		            </i-switch>
		        </FormItem>		        
		        <FormItem align="center">
		            <Button type="success" @click="handleSubmit('formInline')" long>登录</Button>
		        </FormItem>
		    </Form>		
		</div>
	</div>
</template>

<script>
import router from '../router'	
export default {
  name: 'Login',
    data () {
        return {
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 4, message: '密码长度不能小于4位', trigger: 'blur' }
                ]
            },
            formItem: {
            	switch: true
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
//                  this.$Message.success('提交成功!');
					this.$store.dispatch("login",{
						username: this.formInline.user,
						password: this.formInline.password,
						msg: this.$Message,
						recode: this.formItem.switch
					});
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        }
    },
    activated(){
    	if(this.$store.state.user.tocken){
    		router.push("/");
    	}
    },
    mounted(){
    	let user = localStorage.getItem("tuchusercodes");
    	if(user){
    		let a = JSON.parse(user);
    		this.formInline.user = a.un;
    		this.formInline.password = a.up;
    		this.formItem.switch = true;
    	}else{
    		this.formItem.switch = false
    	}
    }
}	
</script>
<style>
.login-box{
	width: 100%;
	height: 100%;
	background: url(../../static/310259.jpg);
}	
.login-wrap{
	box-shadow: 0 0 5px rgba(0,0,0,.5) inset;
	height: 300px;
	width: 350px;
	margin: auto;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: rgba(0,0,0,.2);
	border-radius: 5px;
	padding: 20px 40px;
}
.login-tip{
	display: flex;
	justify-content: flex-end;
	margin-right: 20px;
}
.login-tip li{
	margin: 5px 3px;
}
.login-tip li a{
	color: #2d8cf0;
}
@media only screen and (max-width: 480px) {
	.login-wrap{
		width: 95%;
		margin: 0 auto;
		top: 20px;
	}	
}
</style>