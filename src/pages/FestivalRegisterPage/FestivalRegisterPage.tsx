import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { Form, Formik } from "formik";
import CustomTextInput from "../../common/form/CustomTextInput/CustomTextInput";
import CustomTextAreaInput from "../../common/form/CustomTextAreaInput/CustomTextAreaInput";
import * as Yup from "yup";
import { ShowFestivalApplicationDto } from "../../common/interfaces/FestivalInterfaces";
import agent from "../../api/agent";
import InitialLoader from "../../components/InitialLoader";

interface FestivalRegisterFormValues {
    serialNumber: number;
    showName: string;
    directorName: string;
    storyWriterName: string;
    lengthOfPlay: number;
    additionalInformation: string;
    numberOfActors: number;
}

const validate = Yup.object({
    serialNumber: Yup.number()
        .required("Serial number is required"),
    showName: Yup.string()
        .required("Show name is required"),
    directorName: Yup.string()
        .required("Director name is required"),
    storyWriterName: Yup.string()
        .required("Story writer name is required"),
    lengthOfPlay: Yup.number()
        .required("Length of play is required"),
    additionalInformation: Yup.string()
})

const FestivalRegisterPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const initialValues: FestivalRegisterFormValues = {
        serialNumber: 0,
        showName: "",
        directorName: "",
        storyWriterName: "",
        lengthOfPlay: 0,
        additionalInformation: "",
        numberOfActors: 0
    };

    if (!id) {
        navigate('/');
        return <InitialLoader adding="page"/>;
    }

    return (
        <div className="festivalRegisterPageContainer">
            <h1>Register your theatre with your show</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={values => {
                    (
                        async () => {
                            try {
                                const registerRequest: ShowFestivalApplicationDto = {
                                    festivalId: id,
                                    serialNumber: values.serialNumber,
                                    name: values.showName,
                                    directorName: values.directorName,
                                    storyWriterName: values.storyWriterName,
                                    lengthOfPlay: values.lengthOfPlay,
                                    numberOfActors: values.numberOfActors,
                                    additionalInformation: values.additionalInformation
                                }

                                // console.log(registerRequest);

                                await agent.FestivalRequests.apply(registerRequest);

                                navigate('/festivals');
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    )();
                }}
            >
                {
                    ({ isSubmitting, dirty }) => (
                        <Form className="festivalRegisterForm">
                            <CustomTextInput label="Show serial number:" name="serialNumber" placeholder="Serial number" type="number" />
                            <CustomTextInput label="Show name:" name="showName" placeholder="Show name" type="text" />
                            <CustomTextInput label="Show director name:" name="directorName" placeholder="Director name" type="text" />
                            <CustomTextInput label="Show story writer name:" name="storyWriterName" placeholder="Story writer name" type="text" />
                            <CustomTextInput label="Show's length of play in minutes:" name="lengthOfPlay" placeholder="Length of play" type="number" />
                            <CustomTextInput label="Number of actors for this show:" name="numberOfActors" placeholder="Number of actors" type="number" />
                            <CustomTextAreaInput 
                                label="Additional information:"
                                name="additionalInformation"
                                placeholder="Additional information"
                                rows={5}
                            />

                            <button className="btn btn-dark mt-3" type="submit" disabled={isSubmitting || !dirty}>
                                {
                                    isSubmitting ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span>Login</span>
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

export default observer(FestivalRegisterPage);