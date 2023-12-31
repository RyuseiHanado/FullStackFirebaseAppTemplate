import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@products/theme'
import { resolveAwaitingPromises } from '@tests/DomOperationHelpers'
import setup from '@tests/setupTests'
import React, { ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

export const renderComponentWithRoutingAndTheme = async (
	initialUrl: string,
	path: string,
	element: ReactNode,
) => {
	const { user } = setup(
		<MemoryRouter initialEntries={[initialUrl]}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route path={path} element={element} />
				</Routes>
			</ThemeProvider>
		</MemoryRouter>,
	)
	await resolveAwaitingPromises()
	return user
}
