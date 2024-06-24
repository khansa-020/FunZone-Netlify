import React, { useState } from 'react'
import '../dataTable/dataTable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../../dataTableSource';
import { Link } from 'react-router-dom';
const DataTable = () => {
  const [data, setData]=useState(userRows);
  const actionColumn=[{field:"action", headerName:"Action",
width:200, renderCell:(params)=>{
  const handleDelete=(id)=>{
    setData(data.filter((item)=>item.id !==id));
  }
  return(
    <div className="cellAction">
      <Link to='/admin/users/test' style={{textDecoration:'none'}}>
      <div className="viewButton">View</div>
      </Link>
      <div className="deleteButton" onClick={()=>handleDelete(params.row.id)}>Delete</div>
    </div>
  )
}}];
  return (
    <div className='dataTable'>
      <div className="dataTableTitle">
        Add New User
        <Link to='/admin/users/new' className='link' >
        Add New
      </Link>
      </div>
        <DataGrid
        className='datagrid'
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable