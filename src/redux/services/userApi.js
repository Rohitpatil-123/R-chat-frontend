import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => {
        return {
          url: "user/register",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    login: builder.mutation({
      query: (data) => {
        return {
          url: "user/login",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "user/logout",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    getuser: builder.mutation({
      query: () => {
        return {
          url: "user/getuser",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    myusers: builder.mutation({
      query: () => {
        return {
          url: "getmyuser",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    users: builder.mutation({
      query: (data) => {
        return {
          url: `user?search=${data}`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    messages: builder.mutation({
      query: (data) => {
        return {
          url: "getchat",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    createchat: builder.mutation({
      query: (data) => {
        return {
          url: "createchat",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    pertiuser: builder.mutation({
      query: (data) => {
        return {
          url: "user/peruser",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
    addmessage: builder.mutation({
      query: (data) => {
        return {
          url: "addmessage",
          method: "POST",
          body: data,
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetuserMutation,
  useMyusersMutation,
  useUsersMutation,
  useMessagesMutation,
  useCreatechatMutation,
  usePertiuserMutation,
  useAddmessageMutation,
} = userApi;
