import { observer } from "mobx-react-lite";
import { ShowSchedule, ShowScheduleDto } from "../../common/interfaces/ShowInterfaces";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader";
import * as Yup from 'yup';
import { Form, Formik } from "formik";
import CustomTextInput from "../../common/form/CustomTextInput/CustomTextInput";
import { DatePicker, DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "./style.css";
import { ActorProfile, ManagerProfile } from "../../common/interfaces/ProfileInterfaces";

interface EditActorFormValues {
    surname : string;
    name : string;
    email : string;
}

const validate = Yup.object({
    showName: Yup.string()
        .required('Name is required'),
    lengthOfPlay: Yup.string()
        .required('Surname is required'),
    timeOfPlay: Yup.string()
        .required('Email is required')
});

const EditManager = () => {
    const { showStore,profileStore } = useStore();
const {manager,updateManager} = profileStore
    const { id } = useParams();
    const navigate = useNavigate();
  if (!manager) return <h1>404 not found</h1>
    

    if (!id || !manager) return (
        <InitialLoader adding="manager"/>
    );

    const initialValues: EditActorFormValues = {
        name: manager.name,
        surname: manager.surname,
        email: manager.email,
    }

    return (
        <div className="editSchedulePageContainer">
            <h1>Edit Manager</h1>

            <LocalizationProvider dateAdapter={AdapterMoment}>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={values => {
                        const newActor: ManagerProfile = {
                            id: manager.id,
                            name : values.name,
                            surname : values.surname,
                            email : manager.email,
                            role : manager.role,
                            managedTheatre : manager.managedTheatre
                        }

                        updateManager(newActor).then(() => {
                            navigate("/");
                        });
                    }}
                >
                    {
                        ({ values, setFieldValue, isSubmitting, dirty }) => (
                            <Form className="scheduleEditForm">
                                <CustomTextInput name="name" label="Name:" placeholder="Enter the name" />
                                <CustomTextInput name="surname" label="Surname:" placeholder="Enter the length of play" />
                                <CustomTextInput name="email" label="Email:" placeholder="Enter the Email" readOnly />

                                

                                <button className="btn btn-dark mt-3" type="submit" disabled={isSubmitting || !dirty}>
                                    {
                                        isSubmitting ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <span>Submit</span>
                                        )
                                    }
                                </button>
                            </Form>
                        )
                    }
                </Formik>
            </LocalizationProvider>
        </div>
    )
}

export default observer(EditManager);