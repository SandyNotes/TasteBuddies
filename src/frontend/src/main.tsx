import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import SignUpOrLogin from './components/footers/SignUpOrLogin.tsx'
import Home from './components/pages/Home.tsx'
import Header from './components/headers/Header.tsx'
import SignUp from './components/pages/SignUp.tsx'
import Login from './components/pages/Login.tsx'
import Preferences from './components/pages/Preferences.tsx'
import Dashboard from './components/pages/Dashboard.tsx'
import MealDetails from './components/pages/MealDetails.tsx'
import NavBar from './components/footers/NavBar.tsx'

const router = createBrowserRouter (
  createRoutesFromElements (
    <>
      <Route path='/' element={<App />}>
        <Route index={true} path='/' element={
          <>
            <Header showBackButton={false} />
            <Home />
            <SignUpOrLogin />
          </>} 
        />
        <Route path='/signup' element={
          <>
            <Header showBackButton={true} content='Sign up' />
            <Container centerContent><SignUp /></Container>
          </>} 
        />
        <Route path='/login' element={
          <>
            <Header showBackButton={true} content='Login' />
            <Container centerContent><Login /></Container>
          </>} 
        />
        <Route path='/preferences' element={
          <>
            <Header showBackButton={false} content='Food Preferences?' />
            <Container centerContent><Preferences /></Container>
          </>} 
        />
        <Route path='/dashboard' element={
          <>
            <Header showBackButton={false} content='Dashboard' />
            <Container centerContent><Dashboard /></Container>
            <NavBar currentPage='Suggestions' />
          </>} 
        />
        <Route path='/mealdetails' element={
          <>
            <Header showBackButton={true} content='Logo' />
            <Container centerContent><MealDetails /></Container>
          </>} 
        />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
