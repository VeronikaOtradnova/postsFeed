import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../model/IPost';

interface IResp {
  posts: IPost[],
  totalCount: number
}

export const postAPI = createApi({
  reducerPath: 'postAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  endpoints: (builder) => ({
    fetchAllPosts: builder.query<IResp, {limit: number, start: number}>({
      query: ({limit = 10, start = 0}) => ({
        url: '/posts',
        params: {
          _limit: limit,
          _start:start,
        }
      }),
      transformResponse: (apiResponse: IPost[], meta):IResp => {
        return { posts: apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
      }
    }),
    fetchPostById: builder.query<IPost,number>({
      query:(id:number=1)=>({
        url:`/posts/${id}`,
      })
    })
  })
})