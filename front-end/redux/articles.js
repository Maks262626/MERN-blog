import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "../axios";
export const fetchArticles = createAsyncThunk('/posts/fetchPosts', async () => {
    const { data } = await instance.get('/posts');
    return data;
})
export const fetchTags = createAsyncThunk('/tags/fetchTags', async () => {
    const { data } = await instance.get('/tags');
    return data;
})
export const fetchLike = createAsyncThunk("/posts/fetchLike", async (id) => {
    const { data } = await instance.put(`/posts/${id}`);
    return data;
});
// export const fetchPostComment = createAsyncThunk("/comment/fetchPostComment", async () => {
//     const 
// }); 
export const fetchDeleteArticle = createAsyncThunk(
    "/posts/fetchDeleteArticle",
    async (id) => {
        await instance.delete(`/posts/${id}`);
        return id;
    }
);
const initialState = {
    articles: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}
const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.articles.items = [];
                state.articles.status = "loading";
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles.items = action.payload;
                state.articles.status = "loaded";
            })
            .addCase(fetchArticles.rejected, (state) => {
                state.articles.items = [];
                state.articles.status = "error";
            })

            .addCase(fetchTags.pending, (state) => {
                state.tags.items = [];
                state.tags.status = "loading";
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload;
                state.tags.status = "loaded";
            })
            .addCase(fetchTags.rejected, (state) => {
                state.tags.items = [];
                state.tags.status = "error";
            })

            .addCase(fetchDeleteArticle.fulfilled, (state, action) => {
                state.articles.items = state.articles.items.filter(
                    (el) => el._id !== action.payload
                );
            })

            .addCase(fetchLike.fulfilled, (state, action) => {
                const articleIndex = state.articles.items.findIndex(
                    (el) => el._id === action.payload._id
                ); 

                state.articles.items[articleIndex] = action.payload;
            });
    },
});

export const articleRecuder = articleSlice.reducer;
