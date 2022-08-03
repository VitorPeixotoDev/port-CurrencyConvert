import React from 'react'
import RNPickerSelect from 'react-native-picker-select'

const placeholder = {
    label: 'select a currency...',
    value: null,
    color: '#666'
}

const Picker = ({currency, onChange}) => {
    return(
        <RNPickerSelect
            placeholder={placeholder}
            items={currency}
            onValueChange={value => onChange(value)}
            style={{
                inputAndroid: {
                    fontSize: 20,
                    color: '#926f34'
                },
                inputIOS: {
                    fontSize: 20,
                    color: '#926f34'
                }
            }}
        />
    )
}

export default Picker