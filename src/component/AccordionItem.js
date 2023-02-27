import React, { useCallback, useState, memo, useMemo, useEffect } from 'react';
import '../App.css';

import { useAccordion } from '../core/context/AccordionContext';

const AccordianItem = ({ celebrity }) => {

    const { regex, celebrityId, ageInYears, setCelebrityId, saveCelebrity, setShowDeleteDialog } = useAccordion()

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setEdit(false)
    }, [celebrityId])

    // Form

    const [age, setAge] = useState()
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')

    const [initFormState, setInitFormState] = useState('')

    const updated = useMemo(() => {
        return initFormState !== `${age}|${gender}|${country}|${description}|${name.split(' ')[0]}|${name.split(' ')[1]}`
    }, [age, name, gender, country, description, initFormState])

    const showSaveButton = useMemo(() => {
        return !regex.test(name) && name.length > 0 && !regex.test(country) && country.length > 0 && !regex.test(description) && description.length > 0 && updated
    }, [regex, name, country, description, updated])

    const save = () => {
        setEdit(false)
        const [first, last] = name.split(' ')
        const data = { id: celebrity.id, first, last, dob: age, gender, country, description }
        saveCelebrity(data)
    }

    const setFormData = useCallback(() => {
        const { dob, gender, country, description, first, last} = celebrity
        setAge(dob)
        setGender(gender)
        setCountry(country)
        setName(`${first} ${last}`)
        setDescription(description)
        setInitFormState(`${dob}|${gender}|${country}|${description}|${first}|${last}`)
    }, [celebrity])

    useEffect(() => {
        setFormData()
    }, [setFormData])

    useEffect(() => {
        setFormData()
    }, [edit, setFormData])

    return (
        <div className='accordion-item'>
            <div className='row'>
                <img alt='celeb' className='image' src={celebrity.picture} />
                {!edit && <div className='title'>{celebrity.first} {celebrity.last}</div>}
                {edit && <div className='title'><input value={name} onChange={e => setName(e.target.value)} type="text" /></div>}
                <img alt='state' className='state-image' src={require(`../assets/${celebrityId === celebrity.id ? 'up' : 'down'}-arrow.png`)} onClick={() => setCelebrityId(celebrityId === null || celebrityId !== celebrity.id ? celebrity.id : null)}/>
            </div>
            {!edit && celebrityId === celebrity.id && <div className='row-flex'>
                <div className='row-item'>
                    <p>Age<br/><small>{ ageInYears(age) } years</small></p>
                </div>
                <div className='row-item'>
                    <p>Gender<br/><small>{ celebrity.gender }</small></p>
                </div>
                <div className='row-item'>
                    <p>Country<br/><small>{ celebrity.country }</small></p>
                </div>
            </div>}
            {edit && celebrityId === celebrity.id && <div className='row-flex'>
                <div className='row-item'>
                    <p>Age<br/><input value={ age } onChange={e => setAge(e.target.value)} type="date" /></p>
                </div>
                <div className='row-item'>
                    <p>Gender<br/>
                        <select value={ gender } onChange={e => setGender(e.target.value)}>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                            <option value='transgender'>Transgender</option>
                            <option value='rather not say'>Rather not say</option>
                            <option value='other'>Other</option>
                        </select>
                    </p>
                </div>
                <div className='row-item'>
                    <p>Country<br/><input value={ country } type="text" onChange={e => setCountry(e.target.value)} /></p>
                </div>
            </div>}
            {!edit && celebrityId === celebrity.id && <div className='row'>
                <p>Description<br/><small>{ celebrity.description }</small></p>
            </div>}
            {edit && celebrityId === celebrity.id && <div className='row'>
                <p>Description<br/><textarea value={ description } onChange={e => setDescription(e.target.value)}></textarea></p>
            </div>}
            {!edit && celebrityId === celebrity.id && <div className='row-action'>
                <img alt='delete' className='delete-or-close' src={require('../assets/delete.png')} onClick={() => setShowDeleteDialog(true)}/>
                {ageInYears(age) > 18 && <img alt='edit' className='edit-or-save' src={require('../assets/edit.png')} onClick={() => setEdit(true)}/>}
            </div>}
            {edit && celebrityId === celebrity.id && <div className='row-action'>
                <img alt='close' className='delete-or-close' src={require('../assets/close.png')} onClick={() => setEdit(false)} />
                {showSaveButton && <img alt='save' className='edit-or-save' src={require('../assets/save.png')} onClick={save} />}
            </div>}
        </div>
    )
}

export default memo(AccordianItem);
