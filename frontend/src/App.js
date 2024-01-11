import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'


import AptitudeHome from './screens/AptitudeHome'
import AdminLoginPage from './screens/AdminLoginPage'
import StudentRegisterPage from './screens/StudentRegisterPage'
import MainDashboard from './screens/MainDashboard'
import TestDashboard from './screens/TestDashboard'
import AdminDashboard from './screens/AdminDashboard'
import FeedbackPage from './screens/FeedbackPage'
import ResponseCheckScreen from './screens/ResponseCheckScreen'
import Test from './components/Test'
import NewTest from './components/NewTest'

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <>
		
	<Router>
		<Routes>
			<Route path='/' element={<AptitudeHome/>}/>
			<Route path="/register" element={<StudentRegisterPage/>}/>  
			<Route path="/admin" element={<AdminLoginPage/>}/> 

			<Route path = "/dashboard" element={<MainDashboard/>}/> 
			<Route path = "/testdashboard" element={<TestDashboard/>}/>  
			<Route path = "/adashboard" element={<AdminDashboard/>}/> 
			<Route path = "/feedback" element={<FeedbackPage/>}/>
			<Route path = "/response" element={<ResponseCheckScreen/>}/>

			<Route path = "/test" element={<Test/>}/>
			<Route path = "/newtest" element={<NewTest/>}/>

		</Routes>
	</Router>
		
		<ToastContainer/>
    </>

  )
}
