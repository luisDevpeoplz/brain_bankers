import React, { ReactNode, InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PiBuildingsBold } from 'react-icons/pi'
import { GoUpload } from 'react-icons/go'

const formClasses =
  'block w-full rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm'

interface LabelProps {
  id: string
  children: ReactNode
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  type?: string
  className?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  name?: string
  value?: string
}

type option = {
  value: string
  label: string
}
interface SelectFieldProps {
  id: string
  label?: string
  className?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  name?: string
  options: option[]
}

interface PhoneFieldProps {
  id: string
  label?: string
  className?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  name?: string
}

interface Company {
  id: number
  name: string
}

interface UploadFileProps {
  id: string
  label?: string
  className?: string
}

function Label({ id, children }: LabelProps) {
  return (
    <label
      htmlFor={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  )
}

export function TextField({
  id,
  label,
  type = 'text',
  className,
  ...props
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...props} className={formClasses} />
    </div>
  )
}

export function SelectField({
  id,
  label,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')}>
        {props.options.map((option: option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function PhoneField({
  id,
  label,
  className,
  ...props
}: PhoneFieldProps) {
  const containerStyles = {
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
  }

  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <div style={containerStyles}>
        <PhoneInput
          placeholder="write your phone..."
          country="us"
          {...props}
          inputStyle={{
            width: '100%',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'inherit',
            outline: 'none',
          }}
        />
      </div>
    </div>
  )
}

export function SelectCompany({ companies }: { companies: Company[] }) {
  return (
    <div className="flex items-center">
      <PiBuildingsBold className="h-6 w-6" />
      <select
        id="company"
        name="company"
        className="block text-base focus:outline-none focus:ring-cyan-500  rounded-md h-10 bg-transparent"
        defaultValue="0"
      >
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export function UploadFile({ label, id }: UploadFileProps) {
  return (
    <div className="flex items-center gap-2 w-full justify-between">
      <p>{label}</p>
      <label
        htmlFor={id}
        className="flex  gap-2 cursor-pointer bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-gray-800 font-medium"
      >
        <GoUpload className="h-6 w-6" />
        <p>Select file</p>
      </label>
      <input type="file" id={id} className="hidden" />
    </div>
  )
}

export function LanguageSelect({ languages }: { languages: option[] }) {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="languaje" className="mr-2">
        Select Language
      </label>
      <select
        id="languaje"
        name="languaje"
        className="block text-base focus:outline-none focus:ring-cyan-500  rounded-md h-10 bg-transparent"
        defaultValue="0"
      >
        {languages.map((language) => (
          <option key={language.value} value={language.value}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function TimezoneSelect({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  const timeZones = [
    { value: '+1', label: 'GMT +1' },
    { value: '+2', label: 'GMT +2' },
  ]

  return (
    <SelectField
      id={id}
      className={className}
      options={timeZones}
      label="Select Time Zone"
    />
  )
}
