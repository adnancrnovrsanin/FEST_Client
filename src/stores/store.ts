import { createContext, useContext } from "react"
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import FestivalStore from "./festivalStore";
import TheatreStore from "./theatreStore";
import AuditionStore from "./auditionStore";
import ShowStore from "./showStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    festivalStore: FestivalStore;
    theatreStore: TheatreStore;
    auditionStore: AuditionStore;
    showStore: ShowStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    festivalStore: new FestivalStore(),
    theatreStore: new TheatreStore(),
    auditionStore: new AuditionStore(),
    showStore: new ShowStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}