"use client";
import {
  useChangeChildItemOrderMutation,
  useCreateChildItemMutation,
  useDeleteChildItemMutation,
  useGetChildItemsQuery,
} from "@/store/api";
import { ChangeParentItemOrder, ChildItem, ParentItem } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";

import { ColDef, DragStoppedEvent } from "ag-grid-community";
import AddRowForm from "../common/AddRow";
import DeleteCellRenderer from "../common/DeleteRenderer";

export default function ChildItemGrid({
  data,
}: CustomCellRendererProps<ParentItem>) {
  const [childItems, setChildItems] = useState<ChildItem[]>([]);
  const [changeOrder, { isLoading: changeLoading, isSuccess: changeSuccess }] =
    useChangeChildItemOrderMutation();

  const [createItem, { isLoading: createLoading }] =
    useCreateChildItemMutation();
  const [deleteItem] = useDeleteChildItemMutation();
  const [columnDefs, setColumnDefs] = useState<ColDef<ChildItem>[]>([
    {
      headerName: "Id",
      field: "id",
      flex: 1,
    },
    {
      headerName: "Name",
      field: "name",
    },
    {
      headerName: "Order",
      field: "order",
    },
    {
      headerName: "",
      field: "id",
      cellRenderer: DeleteCellRenderer,
      cellRendererParams: {
        onDelete: deleteItem,
      },
      flex: 1,
    },
  ]);

  const {
    data: gridData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetChildItemsQuery({ parentId: data?.id! });

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: false,
      suppressHeaderMenuButton: true,
      flex: 2,
    };
  }, []);

  const dragStopHandler = async (event: DragStoppedEvent) => {
    const rowIndex = event.target.getAttribute("row-index");
    const itemId = event.target
      ?.querySelector('div[col-id="id"]')
      ?.textContent?.trim();

    if (itemId && rowIndex != null) {
      const changeData: ChangeParentItemOrder = {
        id: parseInt(itemId),
        newOrder: parseInt(rowIndex) + 1,
      };
      try {
        await changeOrder(changeData);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleAddRow = async (name: string) => {
    try {
      await createItem({ parentId: data?.id!, name: name });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (gridData) {
      setChildItems(gridData);
    }
  }, [gridData]);

  return (
    <div className="flex flex-col">
      <AddRowForm loading={createLoading} submit={handleAddRow} />
      <AgGridReact<ChildItem>
        domLayout="autoHeight"
        rowData={childItems}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowDragEntireRow={true}
        rowDragManaged={true}
        onDragStopped={dragStopHandler}
      />
    </div>
  );
}
