import { Navigate, Route, Routes } from 'react-router-dom'
import App from '../App'
import Login from '../pages/login/Login'
import MainLayout from '../components/MainLayout'
import VerifyOtp from '../pages/login/VerifyOtp'
import ProfilePage from '../pages/profilePage/ProfilePage'
import FeedPage from '../pages/FeedPage/FeedPage'
import FeedDetail from '../pages/FeedPage/FeedDetail'
import CreateFeed from '../pages/CreateFeed/CreateFeed'
import CreatePost from '../pages/CreateFeed/CreatePost'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/verifyotp" element={< VerifyOtp />} />
      <Route element={<MainLayout />}>
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed-detail" element={<FeedDetail />} />
        <Route path="/createfeed" element={<CreateFeed />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes