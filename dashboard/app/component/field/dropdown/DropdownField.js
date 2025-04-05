import React from 'react'

function DropdownField({
    fieldId,
    title,
    handleChange
}) {
  return (
    <div className='flex flex-col gap-3 w-full h-full'>
        <label htmlFor={fieldId}>{title}</label>
        <select 
            className='rounded-[10px] w-[300px] h-[40px] focus:outline-none'
            id={fieldId}
            onChange={handleChange}
        >
            <option>1</option>
            <option>2</option>
        </select>
    </div>
  )
}

export default DropdownField
