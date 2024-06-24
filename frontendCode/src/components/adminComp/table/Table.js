import React from 'react'
import '../table/table.scss'
const Table = () => {
  return (
    <div className='table'>
      <table id="tasks">
  <tr>
    <th>Projects</th>
    <th>Start Date</th>
    <th>End Date</th>
    <th>Status</th>
    
  </tr>
  <tr>
    <td>UI designing</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}}>Completed</td>
   
  </tr>
  <tr>
  <td>Login module</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}}>Completed</td>
  </tr>
  <tr>
  <td>Database connectivity</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}}>Completed</td>
    
  </tr>
  <tr>
  <td>Presentation</td>
    <td>20/10/2022</td>
    <td >20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(245, 203, 88)'}}>Pending</td>
    
  </tr>
  <tr>
  <td>3D Model</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(245, 203, 88)'}}>Pending</td>
    
  </tr>
  <tr>
  <td>3D Model</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}}>Completed</td>
  </tr>
  <tr>
  <td>3D Model</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(245, 203, 88)'}}>Pending</td>
    
  </tr>
  <tr>
  <td>3D Model</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}}>Completed</td>
  </tr>
  <tr>
  <td>3D Model</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}}>Completed</td>
  </tr>
  <tr>
  <td>3D Model</td>
    <td>20/10/2022</td>
    <td>20/10/2022</td>
    <td className="status" style={{backgroundColor:'rgb(157, 224, 157)'}} >Completed</td>
  </tr>
</table>
    </div>
  )
}

export default Table