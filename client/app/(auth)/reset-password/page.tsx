import AuthHeader from "@/app/_components/auth/AuthHeader"
import ResetPasswordForm from "./ResetPasswordForm"

function page() {
    return (
        <>
            <AuthHeader message="Change your password" />   

            <ResetPasswordForm />
        </>
    )
}

export default page
