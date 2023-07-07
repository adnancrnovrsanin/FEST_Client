import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getFirebaseApp } from "../firebase";
import { v4 as uuid } from "uuid";

export const firebaseUploadAuditionfromUri = async (uri: string) => {
    const app = getFirebaseApp();

    const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
            resolve(xhr.response);
        };

        xhr.onerror = (e) => {
            console.log(e);
            reject(new TypeError("Network request failed"));
        };

        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send();
    });

    const storageRef = ref(getStorage(app), `auditions/${uuid()}`);

    try {
        await uploadBytesResumable(storageRef, blob);

        return await getDownloadURL(storageRef);
    } catch (error) {
        console.log(error);
    }
}