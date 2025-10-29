import * as React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  GridDemoData,
  useDemoData,
  randomInt,
} from "@mui/x-data-grid-generator";
import ModalLayout from "@/components/common/modal/ModalLayout";
import { Button } from "@mui/material";

function loadServerRows(page: number, data: GridDemoData): Promise<any> {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(data.rows.slice(page * 5, (page + 1) * 5));
      },
      randomInt(100, 600),
    ); // simulate network latency
  });
}

export default function ControlledSelectionServerPaginationGrid() {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 6,
  });

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [loading, setLoading] = React.useState(false);
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>([]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(paginationModel.page, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [paginationModel.page, data]);

  return (
    <div>
      <ModalLayout
        title="Title"
        maxWidth="md"
        targetComponent={
          <Button variant="outlined" onClick={() => {}}>
            Select Rows
          </Button>
        }
        dialogActions={{
          confirmButtonProps: {
            text: "Save changes",
            onClick: () => {},
          },
          cancelButtonProps: {
            text: "Cancel",
          },
        }}
      >
        <DataGrid
          {...data}
          rows={rows}
          pagination
          checkboxSelection
          paginationModel={paginationModel}
          pageSizeOptions={[5]}
          rowCount={100}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          loading={loading}
          keepNonExistentRowsSelected
        />
      </ModalLayout>
    </div>
  );
}
