import { createSlice } from '@reduxjs/toolkit'
import {toast} from 'react-toastify'


export const postSlice=createSlice({
    name:"posts",
    initialState:{
        items:localStorage.getItem('posts')?JSON.parse(localStorage.getItem('posts')):[]
    },
    reducers:{
        addPost:function(state,action){
            state.items.push(action.payload)
            toast.success('Added New Post',{
                position:'bottom-left'
            })
            localStorage.setItem("posts",JSON.stringify(state.items))
        },
        removePosts(state,action){
            const rmv= state.items.filter((post)=> post.id !== action.payload.id)
            state.items=rmv
            toast.error(`Post Removed`,{
                position:'bottom-left'
            })
            localStorage.setItem("posts",JSON.stringify(state.items))
        },
        update(state,action){
state.items.map(item=> {
    if(item.id === action.payload.id){
        item.title=action.payload.title;
        item.desc=action.payload.desc
        toast.info(`Post Updated`,{
            position:'bottom-left'
        })
        localStorage.setItem("posts",JSON.stringify(state.items))

    }
}
)
        },
        clear(state){
state.items=[]
toast.error(`All Posts Deleted`,{
    position:'bottom-left'
})
localStorage.setItem("posts",JSON.stringify(state.items))

        }

    }
})
export const {addPost,removePosts,clear,update}=postSlice.actions;
export default postSlice.reducer;