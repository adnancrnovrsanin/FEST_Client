import { createContext, useContext } from "react"
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import FestivalStore from "./festivalStore";
import TheatreStore from "./theatreStore";
import AuditionStore from "./auditionStore";
import ShowStore from "./showStore";
import ProfileStore from "./profileStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    festivalStore: FestivalStore;
    theatreStore: TheatreStore;
    auditionStore: AuditionStore;
    showStore: ShowStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    festivalStore: new FestivalStore(),
    theatreStore: new TheatreStore(),
    auditionStore: new AuditionStore(),
    showStore: new ShowStore(),
    profileStore : new ProfileStore(),

}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}