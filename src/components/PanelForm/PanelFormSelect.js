import { forwardRef } from "react";

const PanelFormSelect = forwardRef((props, ref) => {
    return (
        <div className='choose-type'>
            <label htmlFor="standard-select">Choose device's size caterogy:</label><br/>
            <div className='select'>
                <select 
                    id="standard-select" 
                    ref={ref} 
                >
                    <option value="Extra Small">Extra Small</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="Extra Large">Extra Large</option>
                </select>
                <span className="focus"></span>
            </div>
        </div>
    )
})


export default PanelFormSelect;