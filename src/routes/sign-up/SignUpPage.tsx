import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
    return ( 
        <div className="h-screen w-full flex justify-center items-center bg-neutral-900">
            <SignUp path="/sign-up"/>
        </div>
     );
}
 
export default SignUpPage;