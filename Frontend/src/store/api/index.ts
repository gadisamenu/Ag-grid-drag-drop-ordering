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
    getParentItems: builder.query<ParentItem[], undefined>({
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
      providesTags: (result, error, args) => [
        { parentId: args.parentId, type: TagTypes.ChildItems },
      ],
    }),

    createChildItem: builder.mutation<ChildItem, CreateChildItem>({
      query: (item) => ({
        url: `childitems`,
        method: "POST",
        body: { ...item },
      }),
      async onQueryStarted({ parentId }, { dispatch, queryFulfilled }) {
        try {
          const { data: createdPost } = await queryFulfilled;
          dispatch(
            webApi.util.updateQueryData(
              "getParentItems",
              undefined,
              (draft) => {
                const parentItem = draft.find((p) => p.id === parentId);
                if (parentItem) {
                  parentItem.childCount =
                    createdPost.parent?.childCount || parentItem.childCount + 1;
                }
              }
            )
          );
        } catch (e) {
          console.log("error", e);
        }
      },
      invalidatesTags: (result, meta, args) => [
        { parentId: args.parentId, type: TagTypes.ChildItems },
      ],
    }),

    deleteChildItem: builder.mutation<
      ParentItem,
      { id: number; parentId: number }
    >({
      query: (payload) => ({
        url: `childitems/${payload.id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ parentId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            webApi.util.updateQueryData(
              "getParentItems",
              undefined,
              (draft) => {
                const parentItem = draft.find((p) => p.id === parentId);
                if (parentItem) {
                  parentItem.childCount -= 1;
                }
              }
            )
          );
        } catch (e) {
          console.log("error", e);
        }
      },
      invalidatesTags: (results, meta, args) => [
        { parentId: args.parentId, type: TagTypes.ChildItems },
      ],
    }),

    updateChildItem: builder.mutation<
      ChildItem,
      { id: number; parentId: number; data: UpdateChildItem }
    >({
      query: (payload) => ({
        url: `childitems/${payload.id}`,
        method: "PUT",
        body: { ...payload.data },
      }),
      invalidatesTags: (results, meta, args) => [
        { parentId: args.parentId, type: TagTypes.ChildItems },
      ],
    }),
    changeChildItemOrder: builder.mutation<
      ChildItem,
      { parentId: number; data: ChangeChildItemOrder }
    >({
      query: (payload) => ({
        url: `childitems/change-order`,
        method: "PUT",
        body: { ...payload.data },
      }),
      invalidatesTags: (results, meta, args) => [
        { parentId: args.parentId, type: TagTypes.ChildItems },
      ],
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
