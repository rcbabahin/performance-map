import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PanelFormInput from "./PanelFormInput.js";
import PanelFormSelect from "./PanelFormSelect.js";
import PanelFormUpload from "./PanelFormUpload.js";
import { csvToJson } from '../../utils/utils.js';
import { useSelector, useDispatch } from 'react-redux';
import { registerDevice } from '../../reducers/devices.js';
import Modal from '../Modal/Modal.js';

function PanelForm(props) {
    const [file, setFile] = useState({
		measurements: [],
        name: '',
		isValid: false,
        showValidation: false,
        showModal: false
	});

    const status = useSelector(state => state.devices.status)
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const inputName = useRef(null);
    const inputCompany = useRef(null);
    const select = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { measurements } = file;

        const category = {
            'Extra Small': 'xs',
            'Small': 's',
            'Medium': 'm',
            'Large': 'l',
            'Extra Large': 'xl'
        };

        const device = {
            name: inputName.current.value.trim(),
            company: inputCompany.current.value.trim(),
            category: category[select.current.value],
            measurements
        };

        dispatch(registerDevice(device));
        setFile({
            ...file,
            showModal: true
        })
    }

    const handleCancel = (e) => {
        e.preventDefault();
        
        navigate('/')
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
    }

    if (status === 'loading')
        return <div className='loading'/>

  	return (
        <div>
            { file.showModal && <Modal handleModalClose={handleModalClose} />}
            <div className='panel-form'>
                <h1>Add new device</h1>
                <form id='add-feedback-form' onSubmit={handleSubmit}>
                    <PanelFormInput ref={inputName} text='Device' placeholder="Type device's name" />
                    <PanelFormInput ref={inputCompany} text='Company' placeholder="Type company's name" />
                    <PanelFormSelect ref={select} />
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

export default PanelForm;

