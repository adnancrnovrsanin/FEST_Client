import { observer } from "mobx-react-lite";
import './style.css';
import { Formik, Form } from "formik";
import CustomTextInput from "../../common/form/CustomTextInput/CustomTextInput";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";
import { Autocomplete, TextField } from "@mui/material";
import { CreateFestivalDto, Festival, FestivalDto } from "../../common/interfaces/FestivalInterfaces";
import { Theatre } from "../../common/interfaces/TheatreInterfaces";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader";
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";

const validate = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    startDate: Yup.date()
        .required('Start date is required'),
    endDate: Yup.date()
        .required('End date is required'),
    city: Yup.string()
        .required('City is required'),
    zipCode: Yup.number()
        .required('Zip code is required'),
    organizer: Yup.object()
        .required('Organizer is required')
})

const AdminCreateFestival = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theatreStore, festivalStore } = useStore();
    const { theatres, loading, getTheatres } = theatreStore;
    const { createFestival, festivals } = festivalStore;
    const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);

    useEffect(() => {
        (
            async () => {
                await getTheatres();
                if (id) setSelectedFestival(festivals.find(f => f.id === id) ?? null);
            }
        )();
    }, [id]);

    const initialValues: Festival = {
        id: selectedFestival === null ? "" : selectedFestival.id,
        name: selectedFestival === null ? "" : selectedFestival.name,
        startDate: selectedFestival === null ? new Date() : selectedFestival.startDate,
        endDate: selectedFestival === null ? new Date() : selectedFestival.endDate,
        city: selectedFestival === null ? "" : selectedFestival.city,
        zipCode: selectedFestival === null ? 0 : selectedFestival.zipCode,
        organizer: selectedFestival === null ? null : selectedFestival.organizer
    }

    if (loading) return <InitialLoader adding="theatres" />

    return (
        <div className="festivalCreateContainer">
            <h1>
                {id ? "Edit festival" : "Create a new festival"}
            </h1>

            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={values => {
                        if (id) {
                            const newFestival: FestivalDto = {
                                ...values,
                                id: id,
                                startDate: values.startDate.toISOString(),
                                endDate: values.endDate.toISOString(),
                            };

                            festivalStore.updateFestival(newFestival).then(() => navigate("/admin/festivals"));
                        } else {
                            const newFestival: CreateFestivalDto = {
                                name: values.name,
                                startDate: values.startDate.toISOString(),
                                endDate: values.endDate.toISOString(),
                                city: values.city,
                                zipCode: values.zipCode,
                                organizer: values.organizer ? {
                                    id: values.organizer.id,
                                    name: values.organizer.name,
                                    address: values.organizer.address,
                                    phoneNumber: values.organizer.phoneNumber,
                                    yearOfCreation: values.organizer.yearOfCreation,
                                } : null
                            };
    
                            createFestival(newFestival).then(() => navigate("/admin/festivals"));
                        } 
                    }}
                >
                    {({ values, setFieldValue, errors, isSubmitting, dirty, touched }) => (
                        <Form className="createFestivalForm">
                            <CustomTextInput label="Name" name="name" placeholder="Enter name" />
                            <DatePicker 
                                label="Start date"
                                value={moment(values.startDate)}
                                onChange={(newValue) => {
                                    setFieldValue("startDate", newValue?.toDate());
                                }}
                            />
                            <DatePicker 
                                label="End date"
                                value={moment(values.endDate)}
                                onChange={(newValue) => {
                                    setFieldValue("endDate", newValue?.toDate());
                                }}
                            />
                            <CustomTextInput label="City" name="city" placeholder="Enter city" />
                            <CustomTextInput label="Zip code" name="zipCode" placeholder="Enter zip code" type="number" />

                            <Autocomplete
                                value={values.organizer}
                                options={theatres}
                                getOptionLabel={(option) => option.name}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                onChange={(event: any, newValue: Theatre | null) => {
                                    setFieldValue("organizer", newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField 
                                        {...params} 
                                        label="Festival organizer theatre" 
                                        error={
                                            (touched.organizer && Boolean(errors.organizer)) ||
                                            (!isSubmitting && Boolean(errors.organizer))
                                        }
                                        helperText={errors.organizer}
                                    />
                                )}
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
                    )}
                </Formik>
            </LocalizationProvider>
        </div>
    )
}

export default observer(AdminCreateFestival);