import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


export default function CustomDataGrid({data,...rest}) {

  const columns =data.columns

  return (
    <Box  sx={{height: 650, width: 1, p: 3 }}>
      <DataGrid
        {...data}
        {...rest}
        columns={columns}
        getRowId={(row) => row.id}
        
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </Box>
  );
}