//The purpose of the file is to define and export the function InputField. The idea is to take in certain specifications for the appearance and allowed inputs of an input field, i.e. a place where a user can input text. The file does not deal with processing inputs themselves, and simply focuses on structuring the boxes where said inputs are placed.

import "./inputField.scss"

//This is the only function in the file. The high-level summary is that it takes in a variety of specifications as inputs, and returns formatted html to display the InputField specified. A variety of inputs allow for specificity; this can include an input field name, placeholder text for the input field, different types of input field for different types of data, a validation/errors/validation message to require input to follow a certain format if desired, and a disabled option for fields that should not actually be used. The additionalClass input is used to select special css rendering options in addition to those defined in the imported inputField.scss file, increasing formatting flexibility.
const InputField = ({
    type,
    placeholder,
    name,
    additionalClass,
    validationMessage,
    validation,
    errors,
    disabled
}) => {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={`InputField
                    ${errors?.[name] && "Input--error"}
                    ${additionalClass && additionalClass}
                `}
                ref={validation}
                disabled={disabled}
            />
            {errors?.[name] && (
                <p className="InputField__label">{validationMessage}</p>
            )}
        </>
    )
}

export default InputField
