import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import IconSearch from './IconSearch'


interface Props {
  handleSearchValueChange: (value: string) => void,
  value: string,
  placeholder: string,
  size?: string
}

const SearchGeneral = ({ handleSearchValueChange, value, placeholder }: Props) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchValueChange(event.target.value)
  }

  return (
    <TextField 
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconSearch sx={{ opacity: 0.6 }} fontSize="small" />
          </InputAdornment>
        )
      }}
      onChange={handleChange}
      placeholder={placeholder}
      id="input-seach"
      value={value}
      sx={{
        width: "100%"
      }}
    />
  )
}

export default SearchGeneral