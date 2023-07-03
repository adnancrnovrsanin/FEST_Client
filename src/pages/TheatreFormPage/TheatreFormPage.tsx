import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import InitialLoader from "../../components/InitialLoader";
import './style.css';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { CreateTheatreDto, EditTheatreDto, Theatre } from "../../common/interfaces/TheatreInterfaces";
import CustomTextInput from "../../common/form/CustomTextInput/CustomTextInput";

const validate = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    address: Yup.string()
        .required('Address is required'),
    phoneNumber: Yup.string()
        .required('Phone number is required'),
    yearOfCreation: Yup.number()
        .required('Year of creation is required')
})

const TheatreFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theatreStore } = useStore();
    const { theatres, loading, createTheatre, updateTheatre } = theatreStore;
    const [selectedTheatre, setSelectedTheatre] = useState<Theatre | null>(id ? theatres.find(t => t.id === id) ?? null : null);

    useEffect(() => {
        if (id) setSelectedTheatre(theatres.find(t => t.id === id) ?? null);
    }, [id]);

    const initialValues: EditTheatreDto = {
        id: selectedTheatre === null ? "" : selectedTheatre.id,
        name: selectedTheatre === null ? "" : selectedTheatre.name,
        address: selectedTheatre === null ? "" : selectedTheatre.address,
        phoneNumber: selectedTheatre === null ? "" : selectedTheatre.phoneNumber,
        yearOfCreation: selectedTheatre === null ? 0 : selectedTheatre.yearOfCreation,
        managerEmail: selectedTheatre === null ? "" : selectedTheatre.managerEmail
    }

    if (loading) return <InitialLoader adding="" />

    return (
        <div className="theatreFormPageContainer">
            <h1 className="text-center">{id ? "Edit theatre" : "Create theatre"}</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validate}
                onSubmit={values => {
                    if (id) {
                        const newTheatre: Theatre = {
                            ...values,
                            id: id
                        };

                        updateTheatre(newTheatre).then(() => navigate("/admin/theatres"));
                    } else {
                        const newTheatre: CreateTheatreDto = {
                            name: values.name,
                            address: values.address,
                            phoneNumber: values.phoneNumber,
                            yearOfCreation: values.yearOfCreation,
                            managerEmail: values.managerEmail
                        };

                        createTheatre(newTheatre).then(() => navigate("/admin/theatres"));
                    } 
                }}
            >
                {({ values, setFieldValue, errors, isSubmitting, dirty, touched }) => (
                    <Form className="theatreForm">
                        <CustomTextInput label="Name" name="name" placeholder="Enter name" />
                        <CustomTextInput label="Address" name="address" placeholder="Enter address" />
                        <CustomTextInput label="Phone number" name="phoneNumber" placeholder="Enter phone number" />
                        <CustomTextInput label="Year of creation" name="yearOfCreation" placeholder="Enter year of creation" type="number" />
                        <CustomTextInput label="Theatre manager's email:" name="managerEmail" placeholder="Enter manager's email" />

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
        </div>
    );
};

export default observer(TheatreFormPage);