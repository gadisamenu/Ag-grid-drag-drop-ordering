import {
  ParentItem,
  ChildItem,
  CreateParentItem,
  CreateChildItem,
  UpdateParentItem,
  UpdateChildItem,
  ChangeChildItemOrder,
  ChangeParentItemOrder,
} from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

enum TagTypes {
  ParentItems = "ParentItems",
  ChildItems = "ChildItems",
}

export const webApi = createApi({
  reducerPath: "webApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = (getState() as RootState).auth.session as string;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: Object.values(TagTypes),

  endpoints: (builder) => ({
    getParentItems: builder.query<ParentItem[], any>({
      query: () => {
        return `parentitems`;
      },
      providesTags: [TagTypes.ParentItems],
    }),
    createParentItem: builder.mutation<ParentItem, CreateParentItem>({
      query: (item) => ({
        url: `parentitems`,
        method: "POST",
        body: { ...item },
      }),
      invalidatesTags: (results, meta, args) => [
        { type: TagTypes.ParentItems },
      ],
    }),
    deleteParentItem: builder.mutation<ParentItem, { id: number }>({
      query: (payload) => ({
        url: `parentitems/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, meta, args) => [
        { type: TagTypes.ParentItems },
      ],
    }),
    updateParentItem: builder.mutation<
      ParentItem,
      { id: number; data: UpdateParentItem }
    >({
      query: (payload) => ({
        url: `parentitems/${payload.id}`,
        method: "PUT",
        body: { ...payload.data },
      }),
      invalidatesTags: [TagTypes.ParentItems],
    }),

    changeParentItemOrder: builder.mutation<ParentItem, ChangeParentItemOrder>({
      query: (payload) => ({
        url: `parentitems/change-order`,
        method: "PUT",
        body: { ...payload },
      }),
      invalidatesTags: [{ type: TagTypes.ParentItems }],
    }),

    getChildItems: builder.query<ChildItem[], { parentId: Number }>({
      query: (params) => {
        return `childitems/${params.parentId}`;
      },
      providesTags: [TagTypes.ChildItems],
    }),

    createChildItem: builder.mutation<ChildItem, CreateChildItem>({
      query: (item) => ({
        url: `childitems`,
        method: "POST",
        body: { ...item },
      }),
      invalidatesTags: (results, meta, args) => [
        { type: TagTypes.ChildItems },
        { type: TagTypes.ParentItems },
      ],
    }),

    deleteChildItem: builder.mutation<ParentItem, { id: number }>({
      query: (payload) => ({
        url: `childitems/${payload.id}`,
        method: "DELETE",
      }),
      invalidatesTags: (results, meta, args) => [
        { type: TagTypes.ChildItems },
        { type: TagTypes.ParentItems },
      ],
    }),
    updateChildItem: builder.mutation<
      ChildItem,
      { id: number; data: UpdateChildItem }
    >({
      query: (payload) => ({
        url: `childitems/${payload.id}`,
        method: "PUT",
        body: { ...payload.data },
      }),
      invalidatesTags: (results, meta, args) => [{ type: TagTypes.ChildItems }],
    }),
    changeChildItemOrder: builder.mutation<ChildItem, ChangeChildItemOrder>({
      query: (payload) => ({
        url: `childitems/change-order`,
        method: "PUT",
        body: { ...payload },
      }),
      invalidatesTags: [{ type: TagTypes.ChildItems }],
    }),
  }),
});

export const {
  useGetParentItemsQuery,
  useGetChildItemsQuery,
  useCreateParentItemMutation,
  useCreateChildItemMutation,
  useDeleteParentItemMutation,
  useDeleteChildItemMutation,
  useUpdateParentItemMutation,
  useUpdateChildItemMutation,
  useChangeParentItemOrderMutation,
  useChangeChildItemOrderMutation,
} = webApi;
