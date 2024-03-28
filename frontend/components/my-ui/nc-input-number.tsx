'use client'

import React, { FC, useEffect, useState } from 'react'
import { Icons } from './icons'
// import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'

export interface NcInputNumberProps {
  className?: string
  defaultValue?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
  label?: string
  desc?: string
}

const NcInputNumber: FC<NcInputNumberProps> = ({
  className = 'w-full',
  defaultValue = 0,
  min = 0,
  max,
  onChange,
  label,
  desc,
}) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleClickDecrement = () => {
    if (min >= value) return
    setValue((state) => {
      return state - 1
    })
    onChange && onChange(value - 1)
  }
  const handleClickIncrement = () => {
    if (max && max <= value) return
    setValue((state) => {
      return state + 1
    })
    onChange && onChange(value + 1)
  }

  const renderLabel = () => {
    return (
      <div className='flex flex-col'>
        <span className='font-medium text-neutral-800 dark:text-neutral-200'>{label}</span>
        {desc && (
          <span className='text-xs font-normal text-neutral-500 dark:text-neutral-400'>{desc}</span>
        )}
      </div>
    )
  }

  return (
    <div
      className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      data-nc-id='NcInputNumber'
    >
      {label && renderLabel()}

      <div className={`nc-NcInputNumber flex items-center justify-between w-28`}>
        <button
          className='flex items-center justify-center w-8 h-8 bg-white border rounded-full border-neutral-400 dark:border-neutral-500 dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default'
          type='button'
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <Icons.minus className='w-4 h-4' />
        </button>
        <span>{value}</span>
        <button
          className='flex items-center justify-center w-8 h-8 bg-white border rounded-full border-neutral-400 dark:border-neutral-500 dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default'
          type='button'
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <Icons.add className='w-4 h-4' />
        </button>
      </div>
    </div>
  )
}

export default NcInputNumber