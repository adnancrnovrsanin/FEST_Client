import { observer } from "mobx-react-lite";
import PhotoWidgetDropzone from "../imageUploadComponents/PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useStore } from "../../stores/store";

const AuditionVideoUpload = () => {
    const { auditionStore } = useStore();
    const { setTempVideoUri } = auditionStore;
    const [files, setFiles] = useState<any>([]);

    useEffect(() => {
        if (files && files.length > 0)
            setTempVideoUri(files[0].preview);

        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files, setTempVideoUri]);

    return (
        <div>
            {
                files && files.length > 0 ? (
                    <ReactPlayer
                        url={files[0].preview}
                        width='100%'
                        height='100%'
                        controls
                    />
                ) : (
                    <PhotoWidgetDropzone setFiles={setFiles} />
                )
            }
        </div>
    );
}

export default observer(AuditionVideoUpload);