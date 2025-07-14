import { Route, Routes, useNavigate } from "react-router"
import WelcomePage from "./routes/welcome/Welcome"
import HomePage from "./routes/home/Home"
import { useUser } from "@clerk/clerk-react"
import { useEffect, type ReactNode } from "react"
import SignInPage from "./routes/sign-in/SignInPage"
import HomeLayout from "./routes/home/HomeLayout"
import CreatePage from "./routes/home/routes/create/Create"
import { getUser, postUser } from "./services/user"
import ExplorePage from "./routes/home/routes/explore/Explore"
import SignUpPage from "./routes/sign-up/SignUpPage"

interface RequireAuthProps {
  children: ReactNode
}

const ProfileChecker = ({ children }: RequireAuthProps) => {
  const { isLoaded, user } = useUser()

  useEffect(() => {
    if (isLoaded && user)  {
      const checkProfile = async () => {
        try {
          const request = await getUser(user.id)
          if (!request) {
            await postUser(user.id, user.fullName || "", user.imageUrl, user.username || "")
          }
        } catch (error) {
          console.log(error)
        }
      }

      checkProfile()
    }
  }, [isLoaded, user])

  return children
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
  const { user } = useUser()


    return (

      <ProfileChecker>
        <Routes>
          <Route index element={<WelcomePage />} />
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/home" element={<HomeLayout user={user} />}>
            <Route index element={<HomePage />} />
            <Route path="create" element={<RequireAuth><CreatePage /></RequireAuth>} />
            <Route path="explore" element={<ExplorePage />} />
          </Route>
        </Routes>
      </ProfileChecker>
    )
}

export default App
