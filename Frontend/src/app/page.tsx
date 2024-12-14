"use client";
import Container from "@/components/common/Container";
import {
  useChangeParentItemOrderMutation,
  useCreateParentItemMutation,
  useDeleteParentItemMutation,
  useGetParentItemsQuery,
  useUpdateParentItemMutation,
} from "@/store/api";
import { ChangeParentItemOrder, ParentItem } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  NumberFilterModule,
  RowDragModule,
  TextFilterModule,
  ValidationModule,
  ClientSideRowModelApiModule,
  RowApiModule,
  TextEditorModule,
  CellEditingStoppedEvent,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  MasterDetailModule,
} from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  ClientSideRowModelApiModule,
  RowApiModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  ColumnMenuModule,
  ContextMenuModule,
  TextFilterModule,
  NumberFilterModule,
  RowDragModule,
  TextEditorModule,
  ValidationModule,
]);

import ChildItemGrid from "@/components/child-item/ChidlItem";
import { ColDef, DragStoppedEvent } from "ag-grid-community";

import React from "react";
import { MdDelete } from "react-icons/md";
import AddRowForm from "@/components/common/AddRow";
import DeleteCellRenderer from "@/components/common/DeleteRenderer";

export default function Home() {
  const { data, isLoading, isFetching, refetch } = useGetParentItemsQuery({});

  const [items, setItems] = useState<ParentItem[]>([]);

  useEffect(() => {
    if (data) {
      setItems([...data]);
    }
  }, [data]);

  const [changeOrder, { isLoading: changeLoading, isSuccess: changeSuccess }] =
    useChangeParentItemOrderMutation();

  const [updateItem, { isLoading: updateLoading, isError }] =
    useUpdateParentItemMutation();

  const [createItem, { isLoading: createLoading }] =
    useCreateParentItemMutation();

  const [deleteItem, { isLoading: deleteLoading }] =
    useDeleteParentItemMutation();

  const [columnDefs, setColumnDefs] = useState<ColDef<ParentItem>[]>([
    {
      headerName: "Id",
      field: "id",
      cellRenderer: "agGroupCellRenderer",
      flex: 1,
    },
    {
      headerName: "Name",
      field: "name",
      editable: !updateLoading,
    },
    {
      headerName: "Child Count",
      field: "childCount",
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

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: false,
      suppressHeaderMenuButton: true,
      flex: 2,
    };
  }, []);

  // const memoData = useMemo<ParentItem[]>(() => (data ? [...data] : []), [data]);

  //   console.log(data);
  console.log("iserr", isError);
  console.log("isloading", updateLoading);

  const saveEdit = useCallback(
    async (event: CellEditingStoppedEvent) => {
      const rowData = { ...event.data };
      console.log("saveEdit", event.column);
      if (rowData) {
        try {
          console.log("rowData", rowData);
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
        const response = await changeOrder(changeData);

        console.log("response", response);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleAddRow = async (name: string) => {
    try {
      await createItem({ name });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-8 lg:gap-16">
        <p> here is the page</p>
        <div>
          <AddRowForm loading={createLoading} submit={handleAddRow} />
          <AgGridReact<ParentItem>
            domLayout="autoHeight"
            rowData={items}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowDragEntireRow={true}
            rowDragManaged={true}
            onDragStopped={dragStopHandler}
            masterDetail={true}
            detailCellRenderer={ChildItemGrid}
            detailRowAutoHeight={true}
            onCellEditingStopped={saveEdit}
          />
        </div>
      </div>
    </Container>
  );
}
