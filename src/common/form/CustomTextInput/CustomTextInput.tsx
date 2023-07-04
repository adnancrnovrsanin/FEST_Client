import { useField } from "formik";

interface Props {
    placeholder?: string;
    name: string;
    label?: string;
    type?: string;
    readonly?: boolean;
}

const CustomTextInput = (props: Props) => {
    const [field, meta] = useField(props.name);

    return (
        <div className="textField">
            <label htmlFor={props.name}>{props.label}</label>
            <input
                {...field}
                {...props}
                className={`form-control shadow-none ${meta.touched && meta.error && "is-invalid"}`}
                placeholder={props?.placeholder ?? undefined}
                autoComplete="off"
                readOnly={props.readonly}
            />
            {meta.touched && meta.error ? (
                <div className="invalid-feedback">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CustomTextInput;