import { createSlice } from '@reduxjs/toolkit';
import { fetchAllPosts, addPost, addComment, addLike } from './posts-operations';

const initialState = {
    posts: [],
    currentPostId: null,
};


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setCurrentPostId(state, { payload }) {
            state.currentPostId = payload;
        },
    },
    extraReducers: (buildre) =>
        buildre
            .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
                state.posts = payload
            })
            .addCase(addPost.fulfilled, (state, { payload }) => {
                state.posts.push(payload);
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {

                const postIndex = state.posts.findIndex(
                    (post) => post.id === payload.currentId
                );
                
                state.posts[postIndex].comments.push(payload.comment);
            })
            .addCase(addLike.fulfilled, (state, { payload }) => {
                const postIndex = state.posts.findIndex(
                    (post) => post.id === payload.postId
                );
                state.posts[postIndex].likes += 1;
                state.posts[postIndex].likeUserId.push(payload.uid)
            }),
           
            
});

export const { setCurrentPostId } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;