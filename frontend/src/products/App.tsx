import React from 'react'
import { auth } from '@products/firebase/firebase'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Route, Routes } from 'react-router-dom'
import Header from '@component/header/Header'
import MyPage from '@page/myPage/MyPage'
import AuthPage from '@page/auth/AuthPage'
import {useAuthState} from 'react-firebase-hooks/auth'

const defaultTheme = createTheme()

export default function App() {
    const [user, loading, error] = useAuthState(auth);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {user && (
                <Routes>
                    <Route path='/' element={<Header />}>
                        <Route path='' element={<MyPage />} />
                    </Route>
                </Routes>
            )}
            {(!user && !loading ) && <AuthPage />}
            {error && <>Authentication Error!!</>}
        </ThemeProvider>
    )
}
