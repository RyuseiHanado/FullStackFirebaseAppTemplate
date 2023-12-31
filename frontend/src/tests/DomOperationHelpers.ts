import { act, screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

export const resolveAwaitingPromises = async () => {
	await act(async () => {})
}

export const asyncClick = async (userEvent: UserEvent, target: HTMLElement) => {
	await act(async () => {
		await userEvent.click(target)
	})
	await resolveAwaitingPromises()
}

export const getTableHeaderCellByIndex = (columnIndex: number): HTMLElement => {
	const tableElement = screen.getByRole('table')
	const tableHeaderElement = within(tableElement).getAllByRole('rowgroup')[0]
	const tableHeaderCells = within(tableHeaderElement).getAllByRole('columnheader')
	return tableHeaderCells[columnIndex]
}

export const getTableBodyCellByIndex = (
	rowIndexWithoutHeader: number,
	columnIndex: number,
): HTMLElement => {
	const table = screen.getByRole('table')
	const rows = within(table).getAllByRole('row')
	const row = rows[rowIndexWithoutHeader + 1]
	const cells = within(row).getAllByRole('cell')
	return cells[columnIndex]
}

export const clickTab = async (user: UserEvent, tabIndex: number) => {
	const tabElementList = screen.getAllByRole('tab')
	const unstartedTabElement = tabElementList[tabIndex]
	await asyncClick(user, unstartedTabElement)
}
