import { act, screen, waitFor, within } from '@testing-library/react'
import App from '@products/App'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import setup from '@tests/setupTests'
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { UserRepository } from '@repository/NetworkUserRepository'
import { asyncClick } from '@tests/DomOperationHelpers'

const mockSignInEmail = jest.fn()
const mockSignInGoogle = jest.fn()
const mockSignUpEmail = jest.fn()
const mockSendPasswordResetEmail = jest.fn()
jest.mock('@repository/NetworkUserRepository', () =>
    jest.fn().mockImplementation(() => {
        return {
            ...jest.requireActual('@repository/NetworkUserRepository'),
            signInEmail: mockSignInEmail,
            signInGoogle: mockSignInGoogle,
            signUpEmail: mockSignUpEmail,
            sendPasswordResetEmail: mockSendPasswordResetEmail
        } as UserRepository
    })
)

window.alert = jest.fn();

describe('elements', () => {
    let sharedUser: UserEvent

    beforeEach(async () => {
        const { user } = setup(
            <Provider store={store}>
                <App />
            </Provider>
        )
        sharedUser = user
        await act(async () => {})
    })

    test('共通項目が見える', () => {
        // assert
        let lockIconElement = screen.getByRole('generic', {
            name: 'lockIcon'
        })
        expect(lockIconElement).toBeInTheDocument()

        let emailInputElement = screen.getByRole('textbox', {
            name: 'メールアドレス'
        })
        expect(emailInputElement).toBeInTheDocument()

        let passwordInputElement = screen.getByLabelText('パスワード')
        expect(passwordInputElement).toBeInTheDocument()
        expect(passwordInputElement).toHaveAttribute('type', 'password')

        let googleLoginButton = screen.getByRole('button', {
            name: 'Googleアカウントでサインイン'
        })
        expect(googleLoginButton).toBeInTheDocument()
    })

    test('ページ画像が見える', () => {
        let pageImageElement = screen.getByRole('generic', {
            name: 'image'
        })
        expect(pageImageElement).toBeInTheDocument()
    })

    test('コピーライトが見える', () => {
        // assert
        const element = screen.getByRole('link')
        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('Penguin')
    })

    test('サインイン項目がが見える', async () => {
        // assert
        const element = screen.getByRole('heading')
        expect(element).toBeInTheDocument()
        expect(element.textContent).toBe('サインイン')

        let loginButton = screen.getByRole('button', { name: 'サインイン' })
        expect(loginButton).toBeInTheDocument()

        let passwordResetButtonElement = screen.getByRole('generic', {
            name: 'passwordReset'
        })
        expect(passwordResetButtonElement).toBeInTheDocument()
        expect(passwordResetButtonElement.textContent).toBe(
            'パスワードを忘れましたか?'
        )

        let switchButtonElement = screen.getByRole('generic', {
            name: 'authSwitch'
        })
        expect(switchButtonElement).toBeInTheDocument()
        expect(switchButtonElement.textContent).toBe('アカウントを作成')
    })

    test('作成項目がが見えない', async () => {
        // assert
        let userNameInputElement = screen.queryByRole('textbox', {
            name: 'ユーザーネーム'
        })
        expect(userNameInputElement).not.toBeInTheDocument()

        let registerButtonElement = screen.queryByRole('button', {
            name: 'アカウント作成'
        })
        expect(registerButtonElement).not.toBeInTheDocument()
    })

    describe('サインイン-新規作成切り替えボタンを押す', () => {
        beforeEach(async () => {
            await act(async () => {
                let loginButton = screen.getByRole('generic', {
                    name: 'authSwitch'
                })
                await asyncClick(sharedUser, loginButton)
            })
        })

        test('作成項目がが見える', async () => {
            // assert
            const element = screen.getByRole('heading')
            expect(element).toBeInTheDocument()
            expect(element.textContent).toBe('アカウント作成')

            let mailInputElement = screen.getByRole('textbox', {
                name: 'メールアドレス'
            })
            expect(mailInputElement).toBeInTheDocument()

            let userNameInputElement = screen.getByRole('textbox', {
                name: 'ユーザーネーム'
            })
            expect(userNameInputElement).toBeInTheDocument()

            let loginButton = screen.getByRole('button', {
                name: 'アカウント作成'
            })
            expect(loginButton).toBeInTheDocument()
        })

        test('サインイン項目がが見えない', async () => {
            // assert
            let loginButton = screen.queryByRole('button', {
                name: 'サインイン'
            })
            expect(loginButton).not.toBeInTheDocument()

            let passwordResetButtonElement = screen.queryByRole('generic', {
                name: 'passwordReset'
            })
            expect(passwordResetButtonElement).not.toBeInTheDocument()
        })
    })

    describe('【パスワードを忘れましたか?】を押す', () => {
        beforeEach(async () => {
            await act(async () => {
                let passwordResetButtonElement = screen.getByRole('generic', {
                    name: 'passwordReset'
                })
                await asyncClick(sharedUser, passwordResetButtonElement)
            })
            await act(async () => {})
        })
        test('メールアドレス入力 ダイアログが見える', async () => {
            // assert
            const dialogElement = screen.getByRole('dialog', {
                name: 'password reset'
            })
            expect(dialogElement).toBeInTheDocument()
            const dialogTitleElement = within(dialogElement).getByRole(
                'heading',
                {
                    name: 'password reset'
                }
            )
            expect(dialogTitleElement.textContent).toBe('パスワードをリセット')
            let mailInputElement = screen.getByRole('textbox', {
                name: 'リセットするメールアドレス'
            })
            expect(mailInputElement).toBeInTheDocument()
            const submitButton = within(dialogElement).getByRole('button', {
                name: 'send'
            })
            expect(submitButton).toBeInTheDocument()
            const closeButton = within(dialogElement).getByRole('button', {
                name: '閉じる'
            })
            expect(closeButton).toBeInTheDocument()
        })

        test('【閉じる】ボタンを押した時、ダイアログが表示されない', async () => {
            // act
            await act(async () => {
                const dialogElement = screen.getByRole('dialog', {
                    name: 'password reset'
                })
                const closeButton = within(dialogElement).getByRole('button', {
                    name: '閉じる'
                })
                await asyncClick(sharedUser, closeButton)
            })

            // assert
            await waitFor(() => {
                const element = screen.queryByRole('dialog', {
                    name: 'password reset'
                })
                expect(element).not.toBeInTheDocument()
            })
        })
    })
})

describe('userRepository.signInEmail', () => {
    test('サインインボタンを押した時、userRepository.signInEmailを叩いている', async () => {
        // arrange
        const { user } = setup(
            <Provider store={store}>
                <App />
            </Provider>
        )
        await act(async () => {})

        let mailInputElement = screen.getByRole('textbox', {
            name: 'メールアドレス'
        })
        let passwordInputElement = screen.getByLabelText('パスワード')

        await act(async () => {
            await user.clear(mailInputElement)
            await user.type(mailInputElement, 'password@gmail.com')
            await user.clear(passwordInputElement)
            await user.type(passwordInputElement, 'password100%')
        })

        // act
        let loginButton = screen.getByRole('button', { name: 'サインイン' })
        await act(async () => {
            await user.click(loginButton)
        })

        // assert
        expect(mockSignInEmail).toHaveBeenCalled()
        expect(mockSignInEmail).toHaveBeenCalledWith(
            'password@gmail.com',
            'password100%'
        )
    })
})

describe('userRepository.signInGoogle', () => {
    test('サインインボタンを押した時、userRepository.signInGoogleを叩いている', async () => {
        // arrange
        const { user } = setup(
            <Provider store={store}>
                <App />
            </Provider>
        )
        await act(async () => {})

        // act
        let loginButton = screen.getByRole('button', {
            name: 'Googleアカウントでサインイン'
        })
        await act(async () => {
            await user.click(loginButton)
        })

        // assert
        expect(mockSignInGoogle).toHaveBeenCalled()
    })
})

describe('userRepository.signUpEmail', () => {
    test('アカウント作成ボタンを押した時、userRepository.signUpEmailを叩いている', async () => {
        // arrange
        const { user } = setup(
            <Provider store={store}>
                <App />
            </Provider>
        )
        await act(async () => {})

        let switchButtonElement = screen.getByRole('generic', {
            name: 'authSwitch'
        })
        await act(async () => {
            await user.click(switchButtonElement)
        })
        await act(async () => {})

        let userNameInputElement = screen.getByRole('textbox', {
            name: 'ユーザーネーム'
        })
        let mailInputElement = screen.getByRole('textbox', {
            name: 'メールアドレス'
        })
        let passwordInputElement = screen.getByLabelText('パスワード')

        await act(async () => {
            await user.clear(userNameInputElement)
            await user.type(userNameInputElement, 'new account')
            await user.clear(mailInputElement)
            await user.type(mailInputElement, 'password@gmail.com')
            await user.clear(passwordInputElement)
            await user.type(passwordInputElement, 'password100%')
        })

        await act(async () => {})
        // act
        let registerButton = screen.getByRole('button', {
            name: 'アカウント作成'
        })
        await act(async () => {
            await user.click(registerButton)
        })

        // assert
        expect(mockSignUpEmail).toHaveBeenCalled()
        expect(mockSignUpEmail).toHaveBeenCalledWith(
            'password@gmail.com',
            'password100%',
            'new account',
            null
        )
    })
})

describe('userRepository.sendPasswordResetEmail', () => {
    test('[パスワードを忘れましたか?]ボタンを押して送信ボタンを押したとき、userRepository.sendPasswordResetEmailを叩いている', async () => {
        // arrange
        mockSendPasswordResetEmail.mockResolvedValue(undefined)
        const { user } = setup(
            <Provider store={store}>
                <App />
            </Provider>
        )
        await act(async () => {})

        // act
        await act(async () => {
            let passwordResetButtonElement = screen.getByRole('generic', {
                name: 'passwordReset'
            })
            await user.click(passwordResetButtonElement)
        })

        // assert
        const dialogElement = screen.getByRole('dialog', {
            name: 'password reset'
        })

        let emailInputElement = screen.getByRole('textbox', {
            name: 'リセットするメールアドレス'
        })
        await act(async () => {
            await user.type(emailInputElement, 'password@gmail.com')
        })
        const submitButton = within(dialogElement).getByRole('button', {
            name: 'send'
        })
        await act(async () => {
            await user.click(submitButton)
        })

        // assert
        expect(mockSendPasswordResetEmail).toHaveBeenCalled()
        expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(
            'password@gmail.com'
        )
    })
})
