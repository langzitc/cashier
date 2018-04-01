export default  [{
	title: "栏目管理",
	icon: "compose",
	name: "ChanelManager",
	child: [{
		title: "栏目列表",
		icon: "android-list",
		name: "ChanelList"		
	},{
		title: "添加栏目",
		icon: "android-add",
		name: "AddChanel"
	},{
		title: "文章列表",
		icon: "ios-list-outline",
		name: "ArticleList"		
	},{
		title: "添加文章",
		icon: "android-add",
		name: "AddArticle"		
	}]
},{
	title: "小说管理",
	name: "CollectManager",
	icon: "ios-cloud-download",
	child: [{
		title: "添加任务",
		icon: "android-add",
		name: "AddTask"		
	},{
		title: "任务列表",
		icon: "ios-list-outline",
		name: "TaskList"		
	},{
		title: "采集内容",
		icon: "ios-browsers-outline",
		name: "CollectContent"		
	},{
		title: "小说列表",
		icon: "ios-browsers-outline",
		name: "StoryList"		
	},{
		title: "分类管理",
		icon: "ios-browsers-outline",
		name: "StoryType"		
	}]
},{
	title: "系统设置",
	icon: "android-settings",
	name: "SystemSet",
	child: [{
		title: "基本设置",
		icon: "settings",
		name: "BaseSet"
	},{
		title: "邮箱设置",
		icon: "email",
		name: "EmailSet"		
	},{
		title: "微信登录",
		icon: "paperclip",
		name: "WXLogin"		
	},{
		title: "QQ登录",
		icon: "paperclip",
		name: "QQLogin"		
	},{
		title: "消息通知设置",
		icon: "volume-high",
		name: "MessageSet"			
	},{
		title: "安全设置",
		icon: "wrench",
		name: "SecrectSet"			
	},{
		title: "数据备份",
		icon: "shuffle",
		name: "DataBack"			
	},{
		title: "清空缓存",
		icon: "android-remove-circle",
		name: "CacheClear"			
	}]
},{
	title: "扩展模块",
	icon: "merge",
	name: "ExtendModel"
},{
	title: "模板管理",
	icon: "code-working",
	name: "TemplateManager"
},{
	title: "数据统计",
	icon: "stats-bars",
	name: "DataStatistic"
},{
	title: "文件管理",
	icon: "film-marker",
	name: "FileManager"
},{
	title: "用户管理",
	icon: "person",
	name: "UserManager",
	child: [{
		title: "用户列表",
		icon: "person-stalker",
		name: "UserList"
	},{
		title: "添加用户",
		icon: "person-add",
		name: "AddUser"
	}]
},{
	title: "分类信息",
	icon: "social-buffer",
	name: "ClassInfoManager"
},{
	title: "评论管理",
	icon: "social-twitch-outline",
	name: "ExtendModel",
},{
	title: "多媒体",
	icon: "playstation",
	name: "MediaManager",
	child: [{
		title: "视频",
		name: "Video",
		icon: "video-camera"
	},{
		title: "音频",
		icon: "radio-waves",
		name: "Radio"
	},{
		title: "图片",
		icon: "images",
		name: "Picture"
	},{
		title: "文档",
		icon: "social-wordpress",
		name: "Document"
	}]
}]