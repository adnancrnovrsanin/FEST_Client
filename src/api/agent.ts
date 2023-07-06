import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../common/constants';
import { store } from '../stores/store';
import { toast } from 'react-toastify';
import { AuthUserDto, LoginRequestDto, LoginResponseDto, RegisterRequestDto } from '../common/interfaces/AuthInterfaces';
import { CreateFestivalDto, CreateShowFestivalApplicationReviewDto, Festival, FestivalDto, ShowFestivalApplication, ShowFestivalApplicationDto } from '../common/interfaces/FestivalInterfaces';
import { User } from '../common/interfaces/UserInterfaces';
import { CreateTheatreDto, Theatre } from '../common/interfaces/TheatreInterfaces';
import { Audition, CreateAuditionDto } from '../common/interfaces/AuditionInterfaces';
import { ActorProfile, ManagerProfile, ReviewerProfile } from '../common/interfaces/ProfileInterfaces';
import { ShowScheduleDto } from '../common/interfaces/ShowInterfaces';
import { ActorShowRole } from '../common/interfaces/ActorShowRole';

import { Photo } from '../common/interfaces/Photo';
import { ActorShowRoleAudition } from '../common/interfaces/ActorShowRoleAudition';
import { AuditionReviewDto } from '../common/interfaces/AuditionReviewDto';
import { ShowFestivalApplicationReviewDto } from '../common/interfaces/ShowFestivalApplicationReviewDto';

axios.defaults.baseURL = API_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(async response => {
    return response;
}, (error: AxiosError) => {
    const { data, status, headers } = error.response as AxiosResponse;

    if (status) {
        switch (status) {
            case 400:
                toast.error(data)
                break;
            case 401:
                if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                    store.userStore.logout();
                    toast.info('Session expired - please login again');
                }
                toast.error('Error code 401: Unauthorized')
                break;
            case 403:
                toast.error('Error code 403: Forbidden')
                break;
            case 404:
                toast.error('Error code 404: Not found')
                break;
            case 500:
                store.commonStore.setServerError(data);
                // router navigates to /server-error
                break;
        }
    }

    return Promise.reject(error);
});

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const AccountRequests = {
    current: () => requests.get<AuthUserDto>('/account'),
    login: (user: LoginRequestDto) => requests.post<LoginResponseDto>('/account/login', user),
    register: (user: RegisterRequestDto) => requests.post<AuthUserDto>('/account/register', user),
    refreshToken: () => requests.post<AuthUserDto>('/account/refreshToken', {})
}

const FestivalRequests = {
    all: () => requests.get<FestivalDto[]>('/festival'),
    details: (id: string) => requests.get<FestivalDto>(`/festival/${id}`),
    create: (festival: CreateFestivalDto) => requests.post<FestivalDto>('/festival', festival),
    update: (festival: FestivalDto) => requests.put<FestivalDto>(`/festival`, festival),
    delete: (id: string) => requests.del<void>(`/festival/${id}`),
    apply: (festival: ShowFestivalApplicationDto) => requests.post<void>('/festival/apply', festival),
    allApplications: () => requests.get<ShowFestivalApplication[]>('/festival/applications'),
}

const TheatreRequests = {
    all: () => requests.get<Theatre[]>('/theatre'),
    details: (id: string) => requests.get<Theatre>(`/theatre/${id}`),
    create: (theatre: CreateTheatreDto) => requests.post<Theatre>('/theatre', theatre),
    update: (theatre: Theatre) => requests.put<Theatre>(`/theatre`, theatre),
    delete: (id: string) => requests.del<void>(`/theatre/${id}`),
}

const ProfileRequests = {
    photosDetails: (id : string) => requests.get<Photo[]>(`/profile/photos?Id=${id}`),
    auditionReviewDetails: (id : string) => requests.get<AuditionReviewDto[]>(`/profile/reviewerauditions?Id=${id}`),
    showFestivalApplicationReviewDetails: (id : string) => requests.get<ShowFestivalApplicationReviewDto[]>(`/profile/reviewerfestivals?Id=${id}`),
    actingRoleDetails: (id : string) => requests.get<ActorShowRole[]>(`/profile/roles?Id=${id}`),
    auditionsReviewedDetails: (id : string) => requests.get<ActorShowRoleAudition[]>(`/profile/auditionsreviewed?Id=${id}`),
    auditionsNotReviewedDetails: (id : string) => requests.get<ActorShowRoleAudition[]>(`/profile/auditionsnotreviewed?Id=${id}`),
    actorDetails: (id: string) => requests.get<ActorProfile>(`/profile/actor/${id}`),
    reviewerDetails: (id: string) => requests.get<ReviewerProfile>(`/profile/reviewer/${id}`),
    managerDetails: (id: string) => requests.get<ManagerProfile>(`/profile/manager/${id}`),
    updateActor: (actor: ActorProfile) => requests.put<ActorProfile>(`/profile/editactor`, actor),
    updateReviewer: (reviewer: ReviewerProfile) => requests.put<ReviewerProfile>(`/profile/editreviewer`, reviewer),
    updateManager: (manager: ManagerProfile) => requests.put<ManagerProfile>(`/profile/editmanager`, manager),
}

const ReviewerRequests = {
    reviewShowRequest: (request: CreateShowFestivalApplicationReviewDto) => requests.post<void>('/reviewer/review/show', request), 
}

const AuditionRequests = {
    create: (audition: CreateAuditionDto) => requests.post<void>('/audition', audition),
};

const ScheduleRequests = {
    editScheduleRequest: (schedule: ShowScheduleDto) => requests.put<void>('/schedule', schedule),
    getAllTheatreUnappointed: (id: string) => requests.get<ShowScheduleDto[]>(`/schedule/theatre/unappointed/${id}`),
    getAllTheatre: (id: string) => requests.get<ShowScheduleDto[]>(`/schedule/theatre/${id}`),
};

const agent = {
    AccountRequests,
    FestivalRequests,
    TheatreRequests,
    AuditionRequests,
    ProfileRequests,
    ReviewerRequests,
    ScheduleRequests,
}

export default agent;