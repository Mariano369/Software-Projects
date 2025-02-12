import { FormControl, InputLabel } from '@mui/material'
import clsx from 'clsx'
import React, { FunctionComponent } from 'react'
import Select from 'react-select'
import classes from './autocomplete.module.scss'
export interface AutocompleteProps {
  onChange: any
  options: { label: string; value: string }[]
  loading: boolean
  label: string
  value: any
  chips?: boolean
  onType?: Function
  placeholder: string
  variant?: 'outlined' | 'standard' | 'filled'
  margin?: 'dense' | 'none' | 'normal'
  fullWidth?: boolean
  disabled?: any
  add?: boolean
}

const AptugoAutocomplete: FunctionComponent<any> = (props: AutocompleteProps) => {
  const [dropdownOptions, setDropdownOptions] = React.useState([])
  const [localValue, setLocalValue] = React.useState('')
  const [timeout, setLocalTimeout] = React.useState(null)

  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W /g, '')
    setLocalValue(inputValue)
    if (timeout) {
      clearTimeout(timeout)
      setLocalTimeout(null)
    }
    setLocalTimeout(
      setTimeout(() => {
        if (props.onType) {
          props.onType(inputValue)
        }
      }, 150)
    )
    return inputValue
  }

  React.useEffect(() => {
    if (props.onType) {
      props.onType('')
    }
  }, [])

  React.useEffect(() => {
    let options = []

    options.push(...props.options)
    if (localValue.length > 2 && props.add) {
      options.push({ label: `Add ${localValue}...`, value: 'new' })
    }
    setDropdownOptions(options)
  }, [props.options, props.value])

  const selectRefLabel = React.useRef(null)

  const [state, setstate] = React.useState({
    isFocused: false,
  })

  let theVal = props.value
    ? props.value[0]?.label
      ? props.value
      : [{ value: props.value, label: dropdownOptions.find((dodo) => dodo.value === props.value)?.label }]
    : null

  if (Array.isArray(props.value) && !props.value.length) theVal = ''

  return (
    <FormControl
      variant={props.variant || 'outlined'}
      margin={props.margin || 'normal'}
      fullWidth={props.fullWidth || false}
      className={clsx(classes.autocomplete, state.isFocused && 'MuiOutlinedInput-root', state.isFocused && 'Mui-focused')}
    >
      <InputLabel ref={selectRefLabel} focused={state.isFocused} shrink={state.isFocused || props.value ? true : false}>
        {props.label}
      </InputLabel>
      <Select
        onFocus={(e) => {
          setstate({ ...state, isFocused: true })
        }}
        onBlur={(e) => {
          setstate({ ...state, isFocused: false })
        }}
        placeholder={props.placeholder || props.label}
        className={clsx(classes.aptugoDropdown, 'MuiOutlinedInput-notchedOutline')}
        classNamePrefix="aptugo"
        value={theVal}
        isMulti={props.chips}
        isDisabled={props.disabled}
        onChange={(newValue) => {
          if (!Array.isArray(newValue)) newValue = [newValue]
          newValue = newValue.map((vals) => (vals.value === 'new' ? { value: null, label: localValue } : vals))
          props.onChange(newValue)
        }}
        onInputChange={handleInputChange}
        cacheOptions={false}
        defaultOptions
        defaultMenuIsOpen={false}
        closeMenuOnSelect={true}
        options={dropdownOptions}
      />
    </FormControl>
  )
}

export default AptugoAutocomplete
