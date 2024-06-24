import React from 'react'
import { Helmet } from 'react-helmet'
import DataTable from '../../../components/adminComp/dataTable/DataTable'
import Navbar from '../../../components/adminComp/navbar/Navbar'
import Sidebar from '../../../components/adminComp/sidebar/Sidebar'
import '../list/list.scss'
const List = () => {
  return (
    <div className="list">
      {/* <Helmet>
                <style>{'body { background-color: #fff }'}</style>
      </Helmet> */}
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataTable/>
      </div>
    </div>

  )
}

export default List