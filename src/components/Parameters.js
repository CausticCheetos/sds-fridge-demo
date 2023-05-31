import { useEffect, useState } from 'react';
import { IconPencil, IconTrash} from  '@tabler/icons-react'
import Clock from "./Clock"
import ParameterForm from './ParameterForm';
import ParameterItem from "./ParameterItem"
import './Parameters.css'
import DropDown from 'react-bootstrap/Dropdown'
import DropDownButton from 'react-bootstrap/DropdownButton'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import api from '../services/api'

const Parameters = ({fridgeData, setFridgeData}) => {
    const [selected, setSelected] = useState(0)
    const [editShow, setEditShow] = useState(false);
    const [emailShow, setEmailShow] = useState(false);
    const [smsShow, setSmsShow] = useState(false);
    const [editTarget, setEditTarget] = useState(0);
    const [state, setState] = useState(0)
    const [data,setData] = useState([]);
    const [email, setEmail] = useState('');
    const [sms, setSms] = useState('');
    const handleSelect = (e) => setSelected(e)
    const handleClose = () => setEditShow(false)

    const handleDelete = (index,data) => {
        const newData = fridgeData.concat()
        newData[selected]['params'].splice(index, 1)
        setFridgeData(newData)
        api.deleteParameters(data._id)
        setState(state-1)
    }   

    const handleOpenEdit = (index) => {
        setEditShow(true)
        setEditTarget(index)
    }

    const handleEmailSubmit = () => {
        console.log(email);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSMSSubmit = () => {
        console.log(sms);
    }

    const handleSMS = (e) => {
        setSms(e.target.value);
    }

    const getData = () =>{
        api.getParameters()
            .then((data) => setData(data))
    }

    useEffect(() =>{
        getData();
    }, [state])

    return (
        <>
        {/* TODO Refactor Edit Form. */}
        <Modal
            show={editShow}
            onHide={handleClose}>
                <div style={{padding: 10}}>
                    <h3>Edit</h3>
                    <ParameterForm {...{data, setFridgeData, selected, editShow, editTarget}}/> 
                </div>
        </Modal>

        <Modal
            show={emailShow}
            onHide={() => setEmailShow(false)}>
                <div style={{ padding: 8}}>
                    Email form
                    <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Control className="createParam" onChange={handleEmail} placeholder="Email"/>
                    <button className='createButton' style={{ marginBottom: 8}} type='submit' onClick={handleEmailSubmit}>Submit</button>
                    </Form>

                    {/* Map Email here */}
                    <div style={{display: 'flex'}}>
                        <div className='childItem'>
                        emails here 
                        </div>
                        <button className='paramButton' /* onClick={} */>
                            <IconPencil/>
                        </button>
                        <button className='paramButton' /* onClick={} */>
                            <IconTrash/>
                        </button>
                    </div>
                </div>
        </Modal>

        <Modal
            show={smsShow}
            onHide={() => setSmsShow(false)}>
                <div style={{ padding: 8}}>
                    SMS form
                    <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Control className="createParam" onChange={handleSMS} placeholder="Email"/>
                    <button className='createButton' style={{ marginBottom: 8}} type='submit' onClick={handleSMSSubmit}>Submit</button>
                    </Form>

                    {/* Map SMS here */}
                    <div style={{display: 'flex'}}>
                        <div className='childItem'>
                        numbers here 
                        </div>
                        <button className='paramButton' /* onClick={} */>
                            <IconPencil/>
                        </button>
                        <button className='paramButton' /* onClick={} */>
                            <IconTrash/>
                        </button>
                    </div>
                </div>
        </Modal>

        <div className="warningParamsContent">
            <div className="header">
                <h1>Parameters</h1>
                <Clock/>
            </div>
            <div className="contents">
                <DropDownButton className="dropdownBox"
                        title={fridgeData[selected].name}
                        id="dropdown-basic-button"
                        onSelect={handleSelect}>
                            {fridgeData.map((fridge, index) =>
                                <DropDown.Item 
                                    className="w-100" 
                                    key={index} 
                                    eventKey={index}>
                                        {fridge.name}
                                </DropDown.Item>)}
                    </DropDownButton>   
                    <div className='paramContainer'>
                        <div className='createContainer'>
                            <h3>Create/Edit Parameter</h3>
                            <ParameterForm {...{data, setFridgeData, selected, editShow,state,setState}}/>  
                            <button className='createButton' style={{margin: 5}} onClick={() => setEmailShow(true)}>Email</button>
                            <button className='createButton' style={{margin: 5}} onClick={() => setSmsShow(true)}>SMS</button>
                        </div>
                        <div className='manageContainer'>
                        <h3>Manage Parameter</h3>
                            {data.map((data, index) =>
                                <ParameterItem key={index} {...{data, index, handleDelete, handleOpenEdit,state,setState}}/>
                            )}       
                        </div>
                        
                    </div>
            </div>
            
        </div>
        </>
        
    )
}

export default Parameters