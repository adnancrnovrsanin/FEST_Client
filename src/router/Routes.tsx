import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage/LoginPage";
import RequireAdmin from "./RequireAdmin";
import AdminFestivals from "../pages/AdminFestivals/AdminFestivals";
import AdminCreateFestival from "../pages/AdminCreateFestival/AdminCreateFestival";
import Theatres from "../pages/Theatres/Theatres";
import TheatreFormPage from "../pages/TheatreFormPage/TheatreFormPage";
import ShowSearchPage from "../pages/ShowSearchPage/ShowSearchPage";
import FestivalPage from "../pages/FestivalPage/FestivalPage";
import FestivalSearchPage from "../pages/FestivalSearchPage/FestivalSearchPage";
import FestivalRegisterPage from "../pages/FestivalRegisterPage/FestivalRegisterPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RequireReviewer from "./RequireReviewer";
import FestivalApplications from "../pages/FestivalApplications/FestivalApplications";
import FestivalApplication from "../pages/FestivalApplication/FestivalApplication";
import RequireTheatreManager from "./RequireTheatreManager";
import UnappointedShows from "../pages/UnappointedShows/UnappointedShows";
import EditSchedule from "../pages/EditSchedule/EditSchedule";
import TheatreShows from "../pages/TheatreShows/TheatreShows";
import ShowSchedule from "../pages/ShowSchedule/ShowSchedule";
import ReviewerProfilePage from "../pages/ProfilePage/ReviewerProfilePage";
import ManagerProfilePage from "../pages/ProfilePage/ManagerProfilePage";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: '/profile/reviewer/:id', element: <ReviewerProfilePage />},
                {path: '/profile/manager/:id', element: <ManagerProfilePage />},
            ]},
            {element: <RequireAdmin />, children: [
                {path: '/admin/festivals', element: <AdminFestivals />},
                {path: '/admin/festivals/create', element: <AdminCreateFestival />},
                {path: '/admin/festivals/:id/edit', element: <AdminCreateFestival />},
                {path: '/admin/theatres', element: <Theatres />},
                {path: '/admin/theatres/create', element: <TheatreFormPage />},
                {path: '/admin/theatres/:id/edit', element: <TheatreFormPage />},
            ]},
            {element: <RequireReviewer />, children: [
                {path: '/festivals/applications', element: <FestivalApplications />},
                {path: '/festivals/applications/:id', element: <FestivalApplication />}
            ]},
            {element: <RequireTheatreManager />, children: [
                {path: '/shows/unappointed', element: <UnappointedShows />},
                {path: '/shows/appointed', element: <TheatreShows />},
                {path: '/shows/edit/schedule/:id', element: <EditSchedule />}
            ]},
            {path: '/festivals', element: <FestivalSearchPage />},
            {path: '/festivals/:id', element: <FestivalPage />},
            {path: '/festivals/:id/register', element: <FestivalRegisterPage />},
            {path: '/profile/actor/:id', element: <ProfilePage />},
            {path: '/shows/:id', element: <ShowSchedule />},
            {path: '/shows', element: <ShowSearchPage />},
            {path: '/login', element: <LoginPage />},
            {path: '/shows', element: <ShowSearchPage />},
        ]
    }
];

export const router = createBrowserRouter(routes);