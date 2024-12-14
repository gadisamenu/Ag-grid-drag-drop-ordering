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
import { useCallback, useMemo, useState } from "react";
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
import AddRowForm from "@/components/common/AddRow";
import DeleteCellRenderer from "@/components/common/DeleteRenderer";
import { AiOutlineTable } from "react-icons/ai";

export default function Home() {
  const { data } = useGetParentItemsQuery({});

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

  const memoData = useMemo<ParentItem[]>(
    () => (data ? [...data.map((elt) => ({ ...elt }))] : []),
    [data]
  );

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
        const response = await changeOrder(changeData).unwrap();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleAddRow = async (name: string) => {
    try {
      await createItem({ name }).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <div className="min-h-screen bg-gray-100 p-4">
        {/* Header Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between">
            {/* Title and Subtitle */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <AiOutlineTable className="text-blue-500 mr-2" /> Data Grid
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your data effectively with detailed insights. Column Name
                is editable. To edit the field double click on the cell.
              </p>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="ag-theme-alpine" style={{ width: "100%" }}>
            <div className="flex flex-col gap-2">
              <AddRowForm loading={createLoading} submit={handleAddRow} />
              <AgGridReact<ParentItem>
                domLayout="autoHeight"
                rowData={memoData}
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
        </div>
      </div>
    </Container>
  );
}
