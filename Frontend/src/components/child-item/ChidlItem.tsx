"use client";
import {
  useChangeChildItemOrderMutation,
  useCreateChildItemMutation,
  useDeleteChildItemMutation,
  useGetChildItemsQuery,
  useUpdateChildItemMutation,
} from "@/store/api";
import { ChangeParentItemOrder, ChildItem, ParentItem } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";

import {
  CellEditingStoppedEvent,
  ColDef,
  DragStoppedEvent,
} from "ag-grid-community";
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
  const [updateItem] = useUpdateChildItemMutation();
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
      editable: true,
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
        await changeOrder(changeData).unwrap();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveEdit = useCallback(
    async (event: CellEditingStoppedEvent) => {
      const rowData = { ...event.data };
      if (rowData) {
        try {
          await updateItem({
            id: rowData.id,
            data: { name: rowData.name },
          }).unwrap();
        } catch (e) {
          console.log(e);
        }
      }
    },
    [updateItem, data]
  );

  const handleAddRow = async (name: string) => {
    try {
      await createItem({ parentId: data?.id!, name: name }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (data) {
      refetch().unwrap();
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
        onCellEditingStopped={saveEdit}
        headerHeight={30}
        rowHeight={30}
      />
    </div>
  );
}
