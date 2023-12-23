import { forwardRef } from "react";

const PanelFormInput = forwardRef(({ text, placeholder }, ref) => {
    return (
        <div>
            <label htmlFor="feedback-name">{text}:</label><br/>
            <input 
                required 
                ref={ref}
                type="text" 
                id={`${text}-name`}
                placeholder={placeholder}
            />
        </div>
    )
})


export default PanelFormInput;