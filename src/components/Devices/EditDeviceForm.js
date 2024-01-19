import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PanelFormInput from "../PanelForm/PanelFormInput.js";
import PanelFormSelect from "../PanelForm/PanelFormSelect.js";
import PanelFormUpload from "../PanelForm/PanelFormUpload.js";
import ModalNewDevice from '../Modal/ModalNewDevice.js';

import { updateDevice, selectDevicesStatus } from '../../reducers/devices.js';
import { updateMeasurement } from '../../reducers/measurements.js';

import { csvToJson } from '../../utils/utils.js';

function EditDeviceForm() {
    const [file, setFile] = useState({
		measurements: [],
        name: '',
		isValid: false,
        showValidation: false,
        showModal: false
	});

    const status = useSelector(selectDevicesStatus);

    const navigate = useNavigate();
    const location = useLocation();
    const { device } = location.state;

    const dispatch = useDispatch();

    const inputName = useRef(null);
    const inputCompany = useRef(null);
    const inputSize = useRef(null);
    const select = useRef(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { measurements } = file;

        const category = {
            'Mini': 'xs',
            'Small': 's',
            'Medium': 'm',
            'Large': 'l',
            'Extra Large': 'xl'
        };

        const newDevice = {
            id: device.id,
            name: inputName.current.value.trim(),
            company: inputCompany.current.value.trim(),
            size: inputSize.current.value.trim().replace(',', '.'),
            category: category[select.current.value],
            measurements
        };
        
        await dispatch(updateDevice(newDevice));
        dispatch(updateMeasurement(newDevice.id));

        setFile({
            ...file,
            showModal: true
        })
    }

    const handleCancel = (e) => {
        
        e.preventDefault();
        
        navigate('/devices');
    }

    const handleFileChange = (e) => {

        if (!e.target.files) return;

        const { files } = e.target;
        const { name } = files[0];

        const reader = new FileReader();

        reader.onload = (e) => {
            const { result } = e.target;
            
            if (result) {
                const { isValid, fileData } = validate(csvToJson(result));
                
                setFile({
                    name,
                    isValid,
                    measurements: fileData,
                    showValidation: true
                });
            }
        }

        reader.readAsText(files[0]);
    };

    const validate = (rawData) => {

        let isValid = true;
        const fileData = [];

        for (let i = 0; i < rawData.length; i++) {
            for (const [ key, value ] of Object.entries(rawData[i])) {
                if (isNaN(value)) {
                    return {
                        isValid: false,
                        fileData
                    } 
                } else if (key !== 'Freq[Hz]' && key !== 'CHB[dBSPL]' && key !== 'Phase[Deg]' && key !== 'THD[%]' && key !== 'R&B[%]') {
                    return {
                        isValid: false,
                        fileData
                    }
                }
            }

            fileData.push(rawData[i]);
        }
        
        return {
            isValid,
            fileData
        };
    }

    const handleModalClose = (e) => {

        e.preventDefault();

        setFile({
            ...file,
            showModal: false
        })

        navigate('/devices');
    }

    if (status === 'loading')
        return <div className='loading'/>

  	return (
        <div>
            { file.showModal && <ModalNewDevice handleModalClose={handleModalClose} />}
            <div className='panel-form'>
                <h1>Edit device</h1>
                <form id='add-feedback-form' onSubmit={handleSubmit}>
                    <PanelFormInput ref={inputName} text="Device's name" defaultValue={device.name} />
                    <PanelFormInput ref={inputCompany} text="Company's name" defaultValue={device.company} />
                    <PanelFormInput ref={inputSize} text="Device's Size in litres" defaultValue={device.size} />
                    <PanelFormSelect ref={select} selected={device.category} />
                    <PanelFormUpload 
                        fileName={file.name}
                        showValidation={file.showValidation}
                        isValid={file.isValid}
                        handleFileChange={handleFileChange}
                        handleCancel={handleCancel} />
                </form>
            </div>
        </div>

  	);
}

export default EditDeviceForm;