import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-neutral-900">
            <SignIn path="/sign-in" appearance={{
                elements: {
                    footerAction: {display: "none"}
                }
            }}/>
        </div>

    );
}

export default SignInPage;