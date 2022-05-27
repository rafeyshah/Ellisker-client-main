import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeView from './Views/HomeView/HomeView';
import DashView from './Views/DashView/DashView';
import AdminLoginView from './Views/AdminView/AdminLoginView';
import AdminDashboard from './Views/AdminView/AdminDashboard';
import ProfileView from './Views/DashView/ProfileView/ProfileView';
import MessagesView from './Views/DashView/MessagesView/MessagesView';
import MessageThread from './Views/DashView/MessageThread/MessageThread';
import DetailsView from './Views/DashView/DetailsView/DetailsView';
import MainMobileView from './Views/DashView/MainMobileView/MainMobileView';
import ProfileEditView from './Views/DashView/ProfileEditView/ProfileEditView';
import Login from './Components/LoginRegister.js/Login';
import Calenderr from './Components/Calender/Calender';
import RequireAuthh from '../src/RequireAuthh';
import RequireAdmin from './RequireAdmin';
import Register from './Components/LoginRegister.js/Register';
import Myitem from './Components/Myitem/Myitem';

// const RequireAuth = ({ children }) => {
//   let isAuthenticated = false;
//   if (localStorage.getItem('currentUser')) isAuthenticated = true;
//   return isAuthenticated ? children : <Navigate to='/' />;
// };

// const CheckAuth = ({ children }) => {
//   let isAuthenticated = false;
//   if (localStorage.getItem('currentUser')) isAuthenticated = true;
//   return isAuthenticated ? <Navigate to='/dashboard' /> : children;
// };

// const RequireAdminAuth = ({ children }) => {
//   let isAuthenticated = false;
//   if (sessionStorage.getItem('currentAdmin')) isAuthenticated = true;
//   return isAuthenticated ? children : <Navigate to='/login' />;
// };

const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          
            <HomeView />
         
        }
        exact
      />
      <Route
        path='/dashboard'
        element={
     
            <DashView>
              <MessagesView />
            </DashView>
         
        }
        exact
      />
      <Route
        path='/dashboard-mobile'
        element={
    
            <DashView>
              <MainMobileView />
            </DashView>
       
        }
        exact
      />
      <Route
        path='/dashboard-mobile/messages'
        element={
      
            <DashView>
              <MessagesView />
            </DashView>
     
        }
        exact
      />
      <Route
        path='/dashboard/profile'
        element={
          <DashView>
            <ProfileView />
          </DashView>
        }
        exact
      />
      <Route
        path='/dashboard/profile-edit'
        element={
          
            <DashView>
              <ProfileEditView />
            </DashView>
        
        }
        exact
      />
      <Route
        path='/dashboard/messages'
        element={
        
            <DashView>
              <MessageThread />
            </DashView>
        
        }
        exact
      />
      <Route
        path='/dashboard/messages/details'
        element={
        
            <DashView>
              <DetailsView />
            </DashView>
         
        }
        exact
      />
      <Route path='/admin-login' element={<AdminLoginView />} exact />
      <Route
        path='/admin-dashboard'
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
        exact
      />
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Register></Register>}></Route>
      <Route path='/myitem' element={<Myitem></Myitem>}></Route>
      <Route
        path='/dashboard/calenderView'
        element={<Calenderr></Calenderr>}></Route>
    </Routes>
  );
};

export default MyRoutes;
