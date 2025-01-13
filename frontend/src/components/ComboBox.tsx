import React, { useState } from 'react';

interface AutocompleteProps {
    data: { [key: string]: string };
    setCityCode: (code: string, where: string) => void;
    where: string;
}

const Autocomplete: React.FC<AutocompleteProps> = ({data, setCityCode, where}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {  //event mean that function will be called when event occurs (event handler)
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filteredSuggestions = Object.keys(data).filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase()));

            setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : ['No matches']);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (value: string) => {
        setCityCode(data[value], where);
        setInputValue(value);
        setSuggestions([]);
    };

    return (
        <div className='autocomplete-wrapper'>
            <input type='text' value={inputValue} onChange={handleInputChange} />
            {suggestions.length > 0 && (
                <ul className='suggestions-list'>
                    {suggestions.map((suggestion: string, index: number) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion) }> {suggestion} </li>   
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Autocomplete;