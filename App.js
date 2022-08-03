import React, {useState, useEffect} from 'react'
import { 
  View,
  Text,
  StatusBar, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  Keyboard, 
  StyleSheet
  } from 'react-native'

import Picker from './src/Picker'
import api from './src/services/api'

const App = () => {
  const [currency, setCurrency] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectCurrency, setSelectCurrency] = useState(null)
  const [currencyValue, setCurrencyValue] = useState(0)

  const [inputValue, setInputValue] = useState(null)
  const [convertValue, setConvertValue] = useState(0)

  useEffect(() => {
    const loadingCurrency = async () => {
      const response = await api.get('all')

      let arrayCurrency = []
      Object.keys(response.data)
        .map(key => {
          arrayCurrency.push({
            key: key,
            label: key,
            value: key
          })
        })
        
        setCurrency(arrayCurrency)
        setLoading(false)
    }

    loadingCurrency()
  }, [])

  const convert = async () => {
    if(selectCurrency === null || currencyValue === 0){
      alert('Selecione uma moeda e valor.')
      return
    }

    const response = await api.get(`all/${selectCurrency}-BRL`)
    //console.log(response.data[selectCurrency].ask)

    let result = (response.data[selectCurrency].ask * parseFloat(currencyValue))
    setConvertValue(`R$ ${result.toFixed(2)}`)
    setCurrencyValue(currencyValue)

    Keyboard.dismiss()
  }

  if(loading){
    return (
      <View
        style={
          {
           justifyContent: 'center', 
           alignItems: 'center',
           flex: 1
          }
        }
      >
        <ActivityIndicator color='#fff' size={45}/>
      </View>
    )
  }else {
    return(
      <View style={styles.container}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor='#101215'
        />
        <View style={styles.areaCurrency}>
          <Text style={styles.title}>Seleciona a moeda</Text>
          <Picker currency={currency} onChange={ currency => setSelectCurrency(currency)}/>
        </View>
  
        <View style={styles.areaValue}>
          <Text style={styles.valueInputMessage}>Digite o valor que será convertido em (R$)</Text>
          <TextInput
            placeholder='EX: 150'
            keyboardType='numeric'
            style={styles.valueInput}
            onChangeText={value => setCurrencyValue(value)}
          />
        </View>
  
        <TouchableOpacity style={styles.btnConvert} onPress={convert}>
          <Text style={styles.btnText}>converter</Text>
        </TouchableOpacity>

        {convertValue !== 0 && (
          <View style={styles.areaResult}>
            <Text style={styles.convertedValue}>{currencyValue} {selectCurrency}</Text>
            <Text style={[styles.convertedValue, {fontSize: 13}]}>corresponde a </Text>
            <Text style={styles.convertedValue}>{convertValue}</Text>
          </View>
        )}

      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#101215',
    paddingTop: 40
  },
  areaCurrency: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingTop: 9,
    paddingLeft: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    marginBottom: 1
  },
  title: {
    color: '#000',
    fontWeight: 'bold'
  },
  areaValue: {
    width: '90%',
    backgroundColor: '#f9f9f9',
    paddingBottom: 9,
  },
  valueInputMessage: {
    color: '#000',
    fontWeight: 'bold',
    paddingTop: 9,
    paddingLeft: 9,
    marginBottom: 9
  },
  valueInput: {
    width: '100%',
    padding: 10,
    height: 45,
    fontSize: 20
  },
  btnConvert: {
    width: '90%',
    height: 45,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    backgroundColor: '#926f34',
    borderTopWidth: 1,
    borderColor: '#f7ef8a',
    justifyContent: 'center',
    alignItems: 'center'
  },
  convertedValue: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  },
  btnText: {
    fontWeight: 'bold',
    color: '#f7ef8a',
    fontSize: 18
  },
  areaResult: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
    borderRadius: 9
  }
})

export default App