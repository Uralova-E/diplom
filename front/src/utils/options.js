import { useEffect, useState } from "react";
import { getOptions } from "./getOptions";

export const GetDisciplineOptions = () => {
    const [disciplineOptions, setDisciplineOptions] = useState([])

    useEffect(() => {
        getOptions(
            'discipline/list/', 
            setDisciplineOptions, 
            'disciplineid',
            'name_of_discipline',
            'name_of_discipline')
    }, [])

    return disciplineOptions;
}

export const GetGroupOptions = () => {
    const [groupOptions, setGroupOptions] = useState([])

    useEffect(() => {
        getOptions(
            'groups/list/', 
            setGroupOptions, 
            'groupid',
            'number_of_group',
            'number_of_group')
    }, [])

    return groupOptions;
}

export const GetAuditoriumOptions = () => {
    const [auditoriumOptions, setAuditoriumOptions] = useState([])

    useEffect(() => {
        getOptions(
            'auditorium/list/', 
            setAuditoriumOptions, 
            'auditoriumid',
            'number_of_auditorium',
            'number_of_auditorium')
    }, [])

    return auditoriumOptions;
}