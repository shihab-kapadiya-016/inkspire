import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Layout } from './Layout'
import { Home, 
        Login, 
        Register,
        About,
        Dashboard,
        LogoutPage,
        EditBlog,
        CreateBlog,
        BlogList,
        BlogDetail
    } from './Components/index.js'
import store from './app/store.js'
import { 
    ChangeEmail,
    ChangePassword,
    ChangeUsername 
} from './Components/Settings/index.js'
import Contact from './Components/Contact/Contact.jsx'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route path='' element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />
            <Route path='about' element= {<About />}/>
            <Route path='dashboard' element={<Dashboard />}/>
            <Route path='settings/username' element={<ChangeUsername />} />
            <Route path='settings/password' element={<ChangePassword />} />
            <Route path='settings/email' element={<ChangeEmail />} />
            <Route path='logout' element={<LogoutPage />}/>
            <Route path='blogs' element={<BlogList  />}/>
            <Route path='dashboard/create' element={<CreateBlog />} />
            <Route path='dashboard/edit-blog/:id' element={<EditBlog />} />
            <Route path='blogs/:id' element={<BlogDetail />} />
            <Route path='/contact' element={<Contact />} />
        </Route>
    )
) 



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
        <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)
