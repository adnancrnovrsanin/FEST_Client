import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import { useEffect } from "react";
import InitialLoader from "../../components/InitialLoader";
import './style.css';
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { CreateShowRoleCredentials, CreateShowRoleDto } from "../../common/interfaces/ShowRoleInterfaces";
import CustomTextInput from "../../common/form/CustomTextInput/CustomTextInput";

const validate = Yup.object({
    showRoleName: Yup.string()
        .required('Show role name is required'),
    pay: Yup.number()
        .required('Pay is required')
})

const CreateShowRole = () => {
    const { id } = useParams<{ id: string }>();
    const { showStore, showRoleStore } = useStore();
    const { getShow, selectedShow, loading } = showStore;
    const { createShowRole } = showRoleStore;

    useEffect(() => {
        (
            async () => {
                if (id) {
                    await getShow(id);
                }
            }
        )();
    }, [id, getShow]);

    if (loading) return (
        <InitialLoader 
            adding=" "
        />
    );

    if (!selectedShow) return (
        <div className="createShowRolePageContainer">
            <h1>There is no show with the given id.</h1>
        </div>
    );

    const initialValues: CreateShowRoleCredentials = {
        showRoleName: "",
        pay: 0,
    }

    return (
        <div className="createShowRolePageContainer">
            <h1>Create a role for "{selectedShow?.showName}"</h1>

            <Formik
                initialValues = {{
                    ...initialValues,
                    error: null
                }}
                validationSchema = {validate}
                onSubmit = {(values, { setErrors }) => {
                    (
                        async () => {
                            const request: CreateShowRoleDto = {
                                showId: selectedShow.showId,
                                showName: selectedShow.showName,
                                showRoleName: values.showRoleName,
                                pay: values.pay
                            }
                            await createShowRole(request).catch(() => setErrors({ error: "Problem with creating the role, check your input and try again" }));
                        }
                    )();
                }}
            >
                {
                    ({ isSubmitting, dirty }) => (
                        <Form className="createShowRoleForm">
                            <CustomTextInput name="showRoleName" label="Name of this role in the show:" placeholder="Enter the name of the role" />
                            <CustomTextInput name="pay" label="Expected pay for playing this role in the show:" placeholder="Enter the pay" type="number" />

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
        </div>
    );
}

export default observer(CreateShowRole);