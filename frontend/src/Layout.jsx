import React from 'react'
import { Header } from './Components/Header/Header'
import {Outlet} from 'react-router-dom'
import { Footer } from './Components/Footer/Footer'

export function Layout(props) {
    

    return (
        <>
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <Outlet />
            </main>

            <Footer />
    </div>
        </>
    )
}
