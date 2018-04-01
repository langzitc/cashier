<script>
	import ChanelList from './ChanelList'
	import AddChanel from './AddChanel'
	import ArticleList from './ArticleList'
	import AddArticle from './AddArticle'
	import UserList from './UserList'
	import AddUser from './AddUser'
	import StoryType from './StoryType'
	import StoryList from './StoryList'
	import AddTask from './AddTask'
	import TaskList from './TaskList'
    export default {
    	name: "Middle",
        data () {
            return {
				
            }
        },
        props: {
		    name: {
		    	type: String,
		    	default: "ChanelList",
		    	required: true
		    }
        },
        computed: {

        },
        methods: {

        },
        render(createElement){
			return createElement(this.name);
        },
        components: {
        	ChanelList,
        	AddChanel,
        	AddArticle,
        	ArticleList,
        	AddUser,
        	UserList,
        	StoryType,
        	StoryList,
        	AddTask,
        	TaskList
        }
    }	
</script>

<style>
</style>