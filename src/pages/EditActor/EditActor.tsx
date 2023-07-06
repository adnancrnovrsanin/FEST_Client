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
import { act } from "react-dom/test-utils";

interface EditScheduleFormValues {
    showName: string;
    lengthOfPlay: number;
    timeOfPlay: Date;
}

const validate = Yup.object({
    showName: Yup.string()
        .required('Name is required'),
    lengthOfPlay: Yup.string()
        .required('Surname is required'),
});

const EditSchedule = () => {
    const { profileStore } = useStore();
    const {actor, updateActor } = profileStore;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            ;
        }
    }, [id, actor]);

    if (!id ) return (
        <InitialLoader adding="actor"/>
    );

    const initialValues: EditScheduleFormValues = {
        showName: selectedSchedule.showName,
        lengthOfPlay: selectedSchedule.lengthOfPlay,
        timeOfPlay: selectedSchedule.timeOfPlay ?? new Date(),
    }

    return (
        <div className="editSchedulePageContainer">
            <h1>Edit Schedule</h1>

            <LocalizationProvider dateAdapter={AdapterMoment}>
            <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={values => {
                        const newSchedule: ShowScheduleDto = {
                            id: selectedSchedule.id,
                            showName: values.showName,
                            lengthOfPlay: values.lengthOfPlay,
                            timeOfPlay: values.timeOfPlay.toISOString(),
                            festivalId: selectedSchedule.festivalId,
                            theatreId: selectedSchedule.theatreId,
                            showId: selectedSchedule.showId,
                            festivalName: selectedSchedule.festivalName,
                            theatreName: selectedSchedule.theatreName,
                        }

                        editSchedule(newSchedule).then(() => {
                            navigate("/");
                        });
                    }}
                >
                    {
                        ({ values, setFieldValue, isSubmitting, dirty }) => (
                            <Form className="scheduleEditForm">
                                <CustomTextInput name="showName" label="Name of the show:" placeholder="Enter the name of the show" readOnly/>
                                <CustomTextInput name="lengthOfPlay" label="Length of the show (in minutes):" placeholder="Enter the length of play" type="number" readOnly />
                                <DateTimePicker 
                                    label="Start date"
                                    value={moment(values.timeOfPlay)}
                                    ampm={false}
                                    onChange={(newValue) => {
                                        setFieldValue("timeOfPlay", newValue?.toDate());
                                    }}
                                />

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

export default observer(EditSchedule);