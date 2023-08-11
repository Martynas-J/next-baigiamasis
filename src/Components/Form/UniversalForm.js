import { useEffect, useState } from "react";

import "./Formik.scss"
import { toast } from "react-toastify";

const UniversalForm = ({ inputs, onAddData, newData }) => {
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
    const [buttonText, setButtonText] = useState("Add");


    useEffect(() => {
        if (newData) {
            setButtonText("Save")
            Object.keys(newData).forEach((key) => {
                setFormValues((prevValues) => ({ ...prevValues, [key]: newData[key] }));
            });
        }
    }, [newData]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!value || value[0] === ' ') {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: 'Invalid' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasErrors = Object.values(errors).some((error) => error !== '');
        if (hasErrors) {
            toast.error("Empty or incorrect input", { autoClose: 5000 })
        } else {
            setFormValues({});
            setErrors({});
            onAddData(formValues)
        }
    };

    return (
        <div className="photo-form-wrapper">
            <form onSubmit={handleSubmit}>
                {inputs.map((input, index) => {
                    const { type, name, label, options, required } = input;
                    return (
                        <div key={index}>
                            <label htmlFor={name} className={errors[name] ? "textErr" : ""}>
                                {label}:
                            </label>
                            {type === "select" ? (
                                <select
                                    name={name}
                                    id={name}
                                    onChange={handleChange}
                                    value={formValues[name] || ""}
                                    required={required}
                                    className={errors[name] ? "inputErr" : ""}
                                >
                                    <option value="">Choose...</option>
                                    {options.map((option, optionIndex) => (
                                        <option key={optionIndex} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={type}
                                    name={name}
                                    id={name}
                                    onChange={handleChange}
                                    value={formValues[name] || ""}
                                    required={required}
                                    className={errors[name] ? "inputErr" : ""}
                                />
                            )}
                            {errors[name] && (
                                <div className="textErr">{errors[name]}</div>
                            )}
                        </div>
                    );
                })}
                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
};
export default UniversalForm