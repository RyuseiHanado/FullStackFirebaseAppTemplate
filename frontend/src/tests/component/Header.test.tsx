import { UserRepository } from '@repository/NetworkUserRepository'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { act, screen, waitFor, within } from '@testing-library/react'
import setup from '@tests/setupTests'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import Header from '@component/header/Header'
import { asyncClick } from '@tests/DomOperationHelpers'

const mockSignOut = jest.fn()
const mockGetUser = jest.fn()
jest.mock('@repository/NetworkUserRepository', () =>
    jest.fn().mockImplementation(() => {
        return {
            ...jest.requireActual('@repository/NetworkUserRepository'),
            signOut: mockSignOut,
            getUser: mockGetUser
        } as UserRepository
    })
)

function TestFn() {
    return (
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    )
}

describe('elements', () => {
    let sharedUser: UserEvent
    beforeEach(async () => {
        const { user } = setup(
            <TestFn />
        )
        sharedUser = user
    })

    test('サインアウトアイコンが見える', () => {
        // assert
        let signOutButton = screen.getByRole('button', {
            name: 'signOut'
        })
        expect(signOutButton).toBeInTheDocument()
    })

    describe('サインアウトアイコンを押す', () => {
        beforeEach(async () => {
            await act(async () => {
                let signOutButton = screen.getByRole('button', {
                    name: 'signOut'
                })
                await sharedUser.click(signOutButton)
            })
            await act(async () => {})
        })
        test('選択ダイアログが見える', async () => {
            // assert
            const dialogElement = screen.getByRole('dialog', {
                name: 'select'
            })
            expect(dialogElement).toBeInTheDocument()
            const dialogTitleElement = within(dialogElement).getByRole(
                'heading',
                {
                    name: 'select'
                }
            )
            expect(dialogTitleElement.textContent).toBe('サインアウト')
            const dialogMessageElement =
                within(dialogElement).getByText('サインアウトしますか？')
            expect(dialogMessageElement).toBeInTheDocument()
            const submitButton = within(dialogElement).getByRole('button', {
                name: 'サインアウト'
            })
            expect(submitButton).toBeInTheDocument()
            const cancelButton = within(dialogElement).getByRole('button', {
                name: 'キャンセル'
            })
            expect(cancelButton).toBeInTheDocument()
        })

        test('【サインアウト】ボタンを押した時に叩いている', async () => {
            // act
            await act(async () => {
                const dialogElement = screen.getByRole('dialog', {
                    name: 'select'
                })
                const signOutButton = within(dialogElement).getByRole('button', {
                    name: 'サインアウト'
                })
                await asyncClick(sharedUser, signOutButton)
            })

            expect(mockSignOut).toHaveBeenCalled()
        })

        test('【キャンセル】ボタンを押した時、ダイアログが表示されない', async () => {
            // act
            await act(async () => {
                const dialogElement = screen.getByRole('dialog', {
                    name: 'select'
                })
                const closeButton = within(dialogElement).getByRole('button', {
                    name: 'キャンセル'
                })
                await asyncClick(sharedUser, closeButton)
            })

            // assert
            await waitFor(() => {
                const element = screen.queryByRole('dialog', {
                    name: 'select'
                })
                expect(element).not.toBeInTheDocument()
            })
        })
    })
})