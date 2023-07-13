import React, { useState } from 'react'
import Box from '@mui/material/Box';
import styles from '../ListTable.module.css'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
type Row = {
  name: string;
  url:string;
};
 type TableProps={
    rows:Row[],
    columns: GridColDef<any | any | any>[],
    count?:number,
    getRowId: (row: Row) => string | number;
    onRowClick: (row: Row) => void;
 }
const ListTable = (props:TableProps) => {
    const {rows,columns,getRowId,onRowClick}=props
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const handleChangePage = (e:any, newPage:number) => {
      setPage(newPage);
    };
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRows = rows?.slice(startIndex, endIndex);
  
  return (
    <div className={styles.table}>
        <Box sx={{ height: 'auto', width: 320 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onRowClick={(row: any) => onRowClick(row)}
        getRowId={getRowId}
        pageSizeOptions={[5]}
      />
    </Box>
    </div>
  )
}

export default ListTable