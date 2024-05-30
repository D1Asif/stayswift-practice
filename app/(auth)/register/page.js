import RegistrationForm from '@/components/auth/RegistrationForm'
import SocialLogins from '@/components/auth/SocialLogins'
import React from 'react'

export default function RegistrationPage() {
    return (
        <section className="grid min-h-screen mt-12 place-items-center">
            <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
                <h4 className="font-bold text-2xl">Sign up</h4>
                <RegistrationForm />
                <SocialLogins />
            </div>
        </section>
    )
}
