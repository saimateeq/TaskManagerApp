import SideBar from "./Pages/SideBar";
import Navbar from "./Pages/Navbar";
import Dashboard from "./Pages/Dashboard";
import AddTask from "./Pages/AddTask";
import MyTasks from "./Pages/MyTasks";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./Pages/Layout";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import { Provider }from "react-redux"
import { store } from "./app/store";
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/mytasks" element={<MyTasks/>} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}
export default App;