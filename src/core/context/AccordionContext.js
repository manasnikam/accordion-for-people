import { createContext, useState, useContext, useMemo, useEffect, useCallback } from "react";

import celebs from '../../assets/static/celebrities.json'

export const AccordionContext = createContext({})

export const AccordianProvider = ({ children }) => {

    const [search, setSearch] = useState('')
    
    const [celebrities, setCelebrities] = useState([])
    const [celebrityId, setCelebrityId] = useState(null)

    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    useEffect(() => {
        setCelebrities(celebs)
    }, [])

    const regex = useMemo(() => {
        return new RegExp(/[0-9]/)
    }, [])

    useEffect(() => {
        setCelebrityId(null)
    }, [search])

    const updateCelebrity = useCallback((celebrityId, callback, postCallback) => {
        const tmp = [ ...celebrities]
        let celebIndex = tmp.findIndex(celeb => celeb.id === celebrityId)
        callback(tmp, celebIndex)
        setCelebrities(tmp)
        postCallback()
    }, [celebrities])

    const deleteCelebrity = useCallback(() => {
        updateCelebrity(celebrityId, (arr, index) => arr.splice(index, 1), () => setCelebrityId(null))
        setShowDeleteDialog(false)
    }, [updateCelebrity, celebrityId])

    const saveCelebrity = useCallback((data) => {
        updateCelebrity(data.id, (arr, index) => arr[index] = { ...arr[index], ...data })
    }, [updateCelebrity])

    const check = useCallback((field, value) => field === undefined ? '' : field.toLowerCase().includes(value === undefined ? value : value.toLowerCase()), [])

    const getCelebrities = useMemo(() => {
        if (search) {
            if (search.includes(" "))
                return celebrities.filter(celeb => check(celeb.first, search.split(' ')[0]) || check(celeb.last, search.split(' ')[1]) )
            return celebrities.filter(celeb => check(celeb.first, search))
        }
        return celebrities
    }, [celebrities, search, check])

    const ageInYears = useCallback((age) => {
        return Math.ceil(
            ( new Date() - new Date(age) ) / ( 1000 * 60 * 60 * 24 * 365 )
        )
    }, [])

    const contextValue = useMemo(() => ({
        regex,
        showDeleteDialog,
        setShowDeleteDialog,
        search,
        setSearch,
        ageInYears,
        celebrityId,
        setCelebrityId,
        getCelebrities,
        deleteCelebrity,
        saveCelebrity
    }), [regex, showDeleteDialog, setShowDeleteDialog, search, setSearch, ageInYears, celebrityId, setCelebrityId, getCelebrities, deleteCelebrity, saveCelebrity])

    return (
        <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>
    )
}

export const useAccordion = () => useContext(AccordionContext)