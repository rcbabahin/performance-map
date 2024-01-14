import { forwardRef } from "react";

const PanelFormSelect = forwardRef(({ selected }, ref) => {

    return (
        <div className='choose-type'>
            <label htmlFor="standard-select">Choose device's size caterogy:</label><br/>
            <div className='select'>
                <select 
                    id="standard-select" 
                    ref={ref} 
                >
                    <option value="Mini" selected={selected === 'xs'} >Mini</option>
                    <option value="Small" selected={selected === 's'} >Small</option>
                    <option value="Medium" selected={selected === 'm'} >Medium</option>
                    <option value="Large" selected={selected === 'l'} >Large</option>
                    <option value="Extra Large" selected={selected === 'xl'} >Extra Large</option>
                </select>
                <span className="focus"></span>
            </div>
        </div>
    )
})


export default PanelFormSelect;