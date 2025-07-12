import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

function Selector(
    {
        value,
        label,
        setValue,
        options,
        optionValue,
        optionLabel,
        placeholder
    }:{
        value: string,
        label: string
        setValue: (value: string) => void,
        options: any[],
        optionValue: string,
        optionLabel: string,
        placeholder: string
    }
) {
    function getNestedValue(obj: any, path: string) {
        return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    }

    return (
        <>
            <Label>{label}</Label>
            <Select value={value} onValueChange={(val) => { setValue(val)}}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {
                            options.map((option, index) => (
                                <SelectItem key={index} value={getNestedValue(option, optionValue)}>{option[optionLabel as keyof typeof option]}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default Selector