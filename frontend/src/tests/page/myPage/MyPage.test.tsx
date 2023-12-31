import setup from '@tests/setupTests'
import MyPage from '@page/myPage/MyPage'
import { screen } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { UserRepository } from '@repository/NetworkUserRepository'

jest.mock('react-firebase-hooks/auth');
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

const mockGetUser = jest.fn()
jest.mock('@repository/NetworkUserRepository', () =>
    jest.fn().mockImplementation(() => {
        return {
            ...jest.requireActual('@repository/NetworkUserRepository'),
            getUser: mockGetUser
        } as UserRepository
    })
)

function TestFn() {
    return (
        <MemoryRouter>
            <MyPage />
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

    test('ページタイトルが見える', () => {
        // assert
        const element = screen.getByRole('heading', { name: 'pageTitle' })
        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('MY PAGE')
    })
})
