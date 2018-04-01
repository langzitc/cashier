<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 800px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background-image: url(../../static/logo.png);
        background-size: contain;
        background-repeat: no-repeat;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
    .layout-ceiling{
        background: #464c5b;
        padding: 10px 0;
        overflow: hidden;
    }
    .layout-ceiling-main{
        float: right;
        margin-right: 15px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }   
    .avastar{
    	position: absolute;
    	left: 120px;
    	top: 7px;
    } 
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <div class="layout-ceiling">  
        	<div class="avastar">
        		<Avatar icon="person" :src="avastar"/>
        	</div>
            <div class="layout-ceiling-main">
                <a href="#">{{tel}}</a> |
                <a href="#">帮助中心</a> |
                <a href="javascript:;" v-on:click="destroyUser">注销</a> |
                <a href="#">{{address}}</a>
            </div>
            <div style="color: #fff;text-align: center;">
			    <RadioGroup v-model="theme">
			        <Radio label="light">白色</Radio>
			        <Radio label="dark">灰色</Radio>
			    </RadioGroup>            	
            </div>
        </div>    	
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu :active-name="routerName" :theme="theme" width="auto" :open-names="['ChanelManager']" @on-select="MenuHandle">
                    <div class="layout-logo-left"></div>
                    <Submenu v-for="el in menu" :name="el.name" :key="el.name">
                        <template slot="title">
                            <Icon :type="el.icon"></Icon>{{el.title}}
                        </template>
                        <MenuItem v-for="el2 in el.child" v-if="el.child" :name="el2.name" :key="el2.name">
                        	<Icon :type="el2.icon" v-if="el2.icon"></Icon>{{el2.title}}
                        </MenuItem>
                    </Submenu>                    
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">     
					    <Tabs type="card" closable @on-tab-remove="handleTabRemove" v-show="tabs.length" :value="currentTab">
					        <TabPane v-for="el in tabs" key="el.name" :label="el.label" :name="el.name"><Middle :name="el.name"></Middle></TabPane>
					    </Tabs>                    	           
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
	import Menu from '../menu.js'
	import Middle from './Middle'
	import router from '../router'
    export default {
    	name: "Index",
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                theme: "light",
                menu: Menu,
                routerName: "",
                tabs: [],
                currentTab: ""
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            },
            address () {
            	return `${this.$store.state.resource.city.province}${this.$store.state.resource.city.city}`;
            },
            tel () {
            	return this.$store.state.user.tel;
            },
            avastar () {
            	return this.$store.state.user.avastar;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            MenuHandle (name) {
            	let flag = false;
            	this.tabs.forEach((el)=>{
            		if(el.name === name){
            			flag = true;
            		}
            	})
            	if(!flag){
            		let label = "";
            		Menu.forEach((e)=>{
            			if(e.name === name){
            				label = e.title;
            				return;
            			}else if(e.child){
            				e.child.forEach((e2)=>{
            					if(e2.name === name){
            						label = e2.title;
            						return;
            					}
            				})
            			}
            		})
            		this.tabs.push({
            			name: name,
            			label: label
            		})
            	}
            	this.currentTab = name;
            },
            handleTabRemove(name){
            	this.tabs.forEach((e,i)=>{
            		if(e.name === name){
            			this.tabs.splice(i,1);
            		}
            	});
            },
            destroyUser(){
            	this.$store.dispatch("destory",{
            		tocken: this.$store.state.user.tocken,
            		msg: this.$Message
            	});
            }
        },
        components: {
        	Middle
        },
		mounted(){
        	if(!this.$store.state.user.tocken){
        		router.push("/login");
        	}		
			this.$store.dispatch("getCityList");
			this.$store.dispatch("getTemplateList");   
			this.$store.dispatch("getStoryTypeList");
		},          
		beforeCreate(){
		  	this.$store.dispatch("getPosition");
		  	this.$store.dispatch("getRoleList",this.$store.state.user.tocken);
		}        
    }
</script>