import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import StudentDashboard from "./pages/StudentDashboard";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import UploadFiles from "./pages/uploads/UploadFiles";
import Auth from "./pages/Auth/Auth";
import Tasks from "./pages/tasks/Tasks";
import Chat from "./pages/chats/Chat";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contact/ContactUs";
import AdminDashboard from "./pages/Admin/adminDashboard/AdminDashboard";
import Login from "./pages/Admin/login/Login";
import List from "./pages/Admin/list/List";
import Single from "./pages/Admin/single/Single";
import NewUser from "./pages/Admin/newUser/NewUser";
import { projectInputs, userInputs } from "./formSource";
import "./styleMode/dark.scss";
import { useContext, useEffect, useMemo } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ChatPage from "./pages/chat/ChatPage";
import Notes from "./components/notes/myNotes/Notes";
import CreateNote from "./pages/notes/CreateNote";
import UpdateSingleNote from "./pages/notes/UpdateSingleNote";
import ScheduleMeeting from "./pages/scheduleMeeting/ScheduleMeeting";
import Supervisor from "./pages/supervisor/Supervisor";
import AddSupervisor from "./pages/AddSupervisor";
import NotificationPage from "./pages/Admin/NotificationPage";
import Users from "./pages/Admin/Users";
import Supervisors from "./pages/Admin/Supervisors";
import SupervisorProfile from "./pages/supervisor/SupervisorProfile";
import SupervisorList from "./components/supervisorComp/SupervisorList";
import AllSupervisors from "./pages/supervisor/AllSupervisors";
import MeetingSchedule from "./pages/supervisor/MeetingSchedule";
import Appointments from "./pages/supervisor/Appointments";
import SupervisorAppointments from "./pages/supervisor/SupervisorAppointments";
import Layout from "./components/adminComp/Layout";
import GamingProjects from "./pages/Admin/GamingProjects";
import DigitalArtsProjects from "./pages/Admin/DigitalArtsProjects";
import ProjectsChart from "./components/adminComp/ProjectsChart";
import CategoryChart from "./components/adminComp/CategoryChart";
import CategoryPercentagePieChart from "./components/adminComp/CategoryPercentagePieChart";
import AllStudents from "./pages/supervisor/AllStudents";
import AssignTask from "./pages/supervisor/AssignTask";
import AllTasks from "./pages/supervisor/AllTasks";
import GetFiles from "./components/PostShare/GetFiles";
import UploadProject from "./pages/UploadProject";
import ShowcaseProjects from "./pages/ShowcaseProjects";
import DetailPage from "./pages/DetailPage";
import MyProjects from "./pages/MyProjects";
import AllUserFiles from "./pages/supervisor/AllUserFiles";
import StudentProjects from "./pages/supervisor/StudentProjects";
import About from "./pages/aboutus/About";
import Analytics from "./pages/Admin/adminDashboard/Analytics";
import NotFound from "./pages/NotFound";
import AdminPostsView from "./components/Posts/AdminPostsView";
import ArtisticTools from "./pages/aiTools/ArtisticTools";
// import TopBar from './components/topBar/TopBar';
// import Theme from './components/themeCustomization/Theme';
function App() {
  // const modeChanger = useSelector((state) => console.log(state.global.mode));
  // const modeChanger = useSelector((state) => state.global.mode);

  // const themeChanger = useMemo(
  // () => createTheme(themeSettings(modeChanger)),
  // [modeChanger]
  // );
  // const {loading}=useSelector(state=>state.alerts)
  var { darkMode } = useContext(DarkModeContext);
  var modeapply;
  const user = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const mode = window.localStorage.getItem("darkMode");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      {/* <ThemeProvider themeChanger={themeChanger}> */}
      {/* <CssBaseline /> */}
      <div className={darkMode ? "app dark" : "app"}>
        {/* <TopBar /> */}
        <Routes>
          {/* <Route path='/stDashboard' element={ <StudentDashboard/>} />
     <Route path='/' element={user?<Navigate to='stDashboard'/>:<Navigate to='auth' />} />

     <Route path='/auth' element={ <Auth/>} />
     <Route path='/profile/:id' element={user?<Profile/>:<Navigate to='../auth'/>} /> */}
          {/* <Route path='/profile/:id' element={user?<Profile/>:<Auth/>} /> */}
          {/* <Route path='/theme' element={ <Theme/>} /> */}

          {/* <Route
          path="/"
          element={
            user ? (
              user.isSupervisor ? (
                <Supervisor />
              ) : (
                <StudentDashboard />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        /> */}
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={user ? <StudentDashboard /> : <Home />} />
          <Route path="/artistictools" element={<ArtisticTools />} />

          <Route path="/stDashboard" element={<StudentDashboard />} />

          <Route
            path="/auth"
            element={
              user ? (
                <Navigate to="../stDashboard" />
              ) : (
                <Auth /*showAlert={showAlert}*/ />
              )
            }
          />

          <Route
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          <Route
            path="/uploads/:id"
            element={user ? <UploadFiles /> : <Navigate to="../auth" />}
          />
          <Route
            path="/tasks/:id"
            element={user ? <Tasks /> : <Navigate to="../auth" />}
          />
          <Route
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../auth" />}
          />
          <Route
            path="/student/files"
            element={user ? <GetFiles /> : <Navigate to="../auth" />}
          />
          <Route
            path="/:id/student/myprojects"
            element={user ? <MyProjects /> : <Navigate to="../auth" />}
          />
          <Route
            path="/student/uploadproject"
            element={user ? <UploadProject /> : <Navigate to="../auth" />}
          />
          <Route path="/showcaseprojects" element={<ShowcaseProjects />} />
          <Route path="/:id/details" element={<DetailPage />} />
          <Route
            path="/chatpage"
            element={user ? <ChatPage /> : <Navigate to="../auth" />}
          />
          <Route
            path="/meeting"
            element={user ? <ScheduleMeeting /> : <Navigate to="../auth" />}
          />
          <Route
            path="/admin/students"
            element={user ? <Users /> : <Navigate to="../auth" />}
          />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route
            path="/admin/gamingprojects"
            element={user ? <GamingProjects /> : <Navigate to="../auth" />}
          />
          <Route
            path="/admin/projectspermonth"
            element={user ? <ProjectsChart /> : <Navigate to="../auth" />}
          />
          <Route
            path="/admin/projectsbycategory"
            element={user ? <CategoryChart /> : <Navigate to="../auth" />}
          />
          <Route
            path="/admin/projectsbycategorypercentage"
            element={
              user ? <CategoryPercentagePieChart /> : <Navigate to="../auth" />
            }
          />
          <Route
            path="/admin/digitalartsprojects"
            element={user ? <DigitalArtsProjects /> : <Navigate to="../auth" />}
          />

          <Route
            path="/admin/layout"
            element={user ? <Layout /> : <Navigate to="../auth" />}
          />
          <Route
            path="/admin/supervisors"
            element={user ? <Supervisors /> : <Navigate to="../auth" />}
          />
          <Route
            path="/supervisor/profile/:id"
            element={<SupervisorProfile />}
          />
          <Route
            path="/supervisor/schedulemeeting/:supervisorId"
            element={<MeetingSchedule />}
          />

          <Route
            path="/supervisordashboard"
            element={user ? <Supervisor /> : <Navigate to="../auth" />}
          />
          <Route
            path="/allapprovedSupervisors"
            element={user ? <AllSupervisors /> : <Navigate to="../auth" />}
          />
          <Route
            path="/addsupervisor"
            element={user ? <AddSupervisor /> : <Navigate to="../auth" />}
          />
          <Route
            path="/appointments"
            element={user ? <Appointments /> : <Navigate to="../auth" />}
          />
          <Route
            path="/supervisorappointments"
            element={
              user ? <SupervisorAppointments /> : <Navigate to="../auth" />
            }
          />
          <Route
            path="/supervisor/students"
            element={user ? <AllStudents /> : <Navigate to="../auth" />}
          />
          <Route
            path="/admin/postsview/:id"
            element={user ? <AdminPostsView /> : <Navigate to="../auth" />}
          />
          <Route
            path="/task/:id"
            element={user ? <AssignTask /> : <Navigate to="../auth" />}
          />
          <Route
            path="/alltasks/:id"
            element={user ? <AllTasks /> : <Navigate to="../auth" />}
          />
          <Route
            path="/allfiles/:id"
            element={user ? <AllUserFiles /> : <Navigate to="../auth" />}
          />
          <Route
            path="/userprojects/:id"
            element={user ? <StudentProjects /> : <Navigate to="../auth" />}
          />
          <Route
            path="/notification"
            element={user ? <NotificationPage /> : <Navigate to="../auth" />}
          />
          <Route
            path="/notes"
            element={user ? <Notes /> : <Navigate to="../auth" />}
          />
          <Route
            path="/createnote"
            element={user ? <CreateNote /> : <Navigate to="../auth" />}
          />
          <Route
            path="/note/:id"
            element={user ? <UpdateSingleNote /> : <Navigate to="../auth" />}
          />
          <Route path="/home" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin">
            <Route index element={<AdminDashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={
                  <NewUser inputs={userInputs} title="Add New Supervisor" />
                }
              />
            </Route>
            <Route path="projects">
              <Route index element={<List />} />
              <Route path=":projectId" element={<Single />} />
              <Route
                path="new"
                element={
                  <NewUser inputs={projectInputs} title="Add New Project" />
                }
              />
            </Route>
          </Route>
        </Routes>
      </div>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
