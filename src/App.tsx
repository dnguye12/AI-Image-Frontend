import { Route, Routes, useNavigate } from "react-router"
import WelcomePage from "./routes/welcome/Welcome"
import HomePage from "./routes/home/Home"
import { useUser } from "@clerk/clerk-react"
import { useEffect, type ReactNode } from "react"
import SignInPage from "./routes/sign-in/SignInPage"
import HomeLayout from "./routes/home/HomeLayout"
import CreatePage from "./routes/home/routes/create/Create"

interface RequireAuthProps {
  children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isSignedIn, user, isLoaded } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in"); // Redirects to sign-in if the user is not signed in.
    }
  }, [isLoaded, isSignedIn, navigate])

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
}
const App = () => {

  return (
    <Routes>
      <Route index element={<WelcomePage />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/home" element={
        <RequireAuth>
          <HomeLayout />
        </RequireAuth>
      }>
        <Route index element={<HomePage />} />
        <Route path="create" element={<CreatePage />} />
      </Route>
    </Routes>
  )
}

export default App
