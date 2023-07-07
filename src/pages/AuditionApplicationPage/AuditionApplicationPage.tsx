import { observer } from "mobx-react-lite";
import './style.css';
import AuditionVideoUpload from "../../components/AuditionVideoUpload/AuditionVideoUpload";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from 'yup';
import CustomTextAreaInput from "../../common/form/CustomTextAreaInput/CustomTextAreaInput";
import { useStore } from "../../stores/store";
import { toast } from "react-toastify";
import InitialLoader from "../../components/InitialLoader";
import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

interface AuditionFormValues {
    description: string;
}

const validate = Yup.object({
    description: Yup.string()
        .required('Description is required')
});

const initialValues: AuditionFormValues = {
    description: '',
}

const AuditionApplicationPage = () => {
    const { id } = useParams<{ id: string }>();
    const { auditionStore, showRoleStore } = useStore();
    const { tempVideoUri, loading, uploadingVideo } = auditionStore;
    const { getShowRole, loading: loadingShowRole } = showRoleStore;

    useEffect(() => {
        if (id)
            (
                async () => {
                    await getShowRole(id);
                }
            )();
    }, [id, getShowRole]);

    if (loading || loadingShowRole) 
        return (
            <InitialLoader adding=" " />
        );

    return (
        <div className="auditionApplicationPageContainer">
            <h1>Audition application page</h1>

            {
                uploadingVideo ? (
                    <div
                        style={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <CircularProgress color='primary'/>
                        <Typography sx={{
                            fontSize: "20px",
                            fontWeight: 400,
                            color: "black",
                            marginTop: "10px",
                            fontFamily: "Poppins, sans-serif"
                        }}>Uploading video...</Typography>
                    </div>
                ) : (
                    <AuditionVideoUpload />
                )
            }

            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={(values, { setSubmitting }) => {
                    if (!tempVideoUri) {
                        toast.error('Please upload a video');
                        return;
                    }

                    auditionStore.createAudition(values.description)
                        .catch(error => {
                            toast.error(error.message);
                            setSubmitting(false);
                        })
                }}
            >
                {
                    ({ isSubmitting, dirty }) => (
                        <Form className="descriptionForm">
                            <CustomTextAreaInput 
                                name='description'
                                placeholder='Description'
                                label="Summary of your performance"
                                rows={5}
                            />

                            <button className="btn btn-dark mt-3 submitBtn" type="submit" disabled={isSubmitting || !dirty}>
                                {
                                    isSubmitting ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span>Submit for audition</span>
                                    )
                                }
                            </button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}

export default observer(AuditionApplicationPage);