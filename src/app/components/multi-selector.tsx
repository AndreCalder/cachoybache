import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React from 'react'

function MultiSelector({
    values,
    label,
    setValues,
    options,
    optionValue,
    optionLabel,
    placeholder
}: {
    values: string[],
    label: string,
    setValues: (values: string[]) => void,
    options: any[],
    optionValue: string,
    optionLabel: string,
    placeholder: string
}) {
    const [isOpen, setIsOpen] = React.useState(false);

    function getNestedValue(obj: any, path: string) {
        return path.split('.').reduce((acc, key) => acc && acc[key], obj);
    }

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isOpen && !target.closest('.multi-selector-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const toggleOption = (optionVal: string) => {
        if (values.includes(optionVal)) {
            setValues(values.filter(v => v !== optionVal));
        } else {
            setValues([...values, optionVal]);
        }
    };

    const removeValue = (valueToRemove: string) => {
        setValues(values.filter(v => v !== valueToRemove));
    };

    const getSelectedLabels = () => {
        return values.map(value => {
            const option = options.find(opt => getNestedValue(opt, optionValue) === value);
            return option ? option[optionLabel as keyof typeof option] : value;
        });
    };

    return (
        <div className="w-full multi-selector-container">
            <Label>{label}</Label>
            <div className="relative">
                <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {values.length > 0 ? `${values.length} seleccionados` : placeholder}
                </Button>
                
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {options.map((option, index) => {
                            const optionVal = getNestedValue(option, optionValue);
                            const isSelected = values.includes(optionVal);
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => toggleOption(optionVal)}
                                >
                                    <Checkbox
                                        checked={isSelected}
                                        onCheckedChange={() => toggleOption(optionVal)}
                                        className="border-black data-[state=checked]:bg-black rounded-none"
                                    />
                                    <span className="text-sm">
                                        {option[optionLabel as keyof typeof option]}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            
            {/* Selected items display */}
            {values.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {getSelectedLabels().map((label, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm"
                        >
                            <span>{label}</span>
                            <button
                                type="button"
                                onClick={() => removeValue(values[index])}
                                className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MultiSelector; 