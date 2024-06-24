import React from 'react'
import TopBar from '../../components/topBar/TopBar';
import LeftSide from '../../components/left/LeftSide';
import TaskBoard from '../../components/taskboard/TaskBoard';
const Tasks = () => {
  return (
      <>
    <TopBar/>
        <main>
            <div className="Container">
                <LeftSide/>
                <TaskBoard/>
                
            </div>
        </main>
    </>
  )
}

export default Tasks