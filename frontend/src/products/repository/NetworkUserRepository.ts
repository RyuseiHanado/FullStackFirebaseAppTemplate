import { auth, googleProvider, storage } from '@products/firebase/firebase'
import {
    signInWithPopup,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import * as crypto from 'crypto'
import { User } from '@model/User'

export interface UserRepository {
    signInEmail(email: string, password: string): Promise<void>
    signUpEmail(
        email: string,
        password: string,
        username: string,
        avatarImage: File | null
    ): Promise<any>
    signInGoogle(): Promise<void>
    sendPasswordResetEmail(email: string): Promise<void>
    signOut(): Promise<void>
    getUser(): User | null
}
export default class NetworkUserRepository implements UserRepository {
    async signInEmail(email: string, password: string): Promise<void> {
        await signInWithEmailAndPassword(auth, email, password)
    }

    async signUpEmail(
        email: string,
        password: string,
        username: string,
        avatarImage: File | null
    ): Promise<any> {
        const authUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        let url = ''
        if (avatarImage) {
            const S =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
            const N = 16
            const randomChar = Array.from(
                crypto.getRandomValues(new Uint32Array(N))
            )
                .map((n) => S[n % S.length])
                .join('')
            const fileName = randomChar + '_' + avatarImage.name
            await uploadBytes(ref(storage, `avatars/${fileName}`), avatarImage)
            url = await getDownloadURL(ref(storage, `avatars/${fileName}`))
        }
        if (authUser.user) {
            await updateProfile(authUser.user, {
                displayName: username,
                photoURL: url
            })
        }
        return authUser
    }

    async signInGoogle(): Promise<void> {
        await signInWithPopup(auth, googleProvider).catch((err) => alert(err.message))
    }

    async sendPasswordResetEmail(email: string): Promise<void> {
        await sendPasswordResetEmail(auth, email)
    }

    async signOut(): Promise<void> {
        await auth.signOut()
    }

    getUser(): User | null {
        return auth.currentUser
    }
}
