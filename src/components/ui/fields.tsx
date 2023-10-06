import React, { InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { PiBuildingsBold } from 'react-icons/pi'
import { GoUpload } from 'react-icons/go'
import Avatar from './Avatar'

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
  setOption?: (option: option) => void
}

interface PhoneFieldProps {
  id: string
  label?: string
  className?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  name?: string
  onChange?: any
}

interface Company {
  id: number
  name: string
}

interface UploadFileProps {
  id: string
  label?: string
  className?: string
  onChange: (x: React.ChangeEvent<HTMLInputElement>) => void
  file: Blob | null
}

interface CheckboxFieldProps {
  option: { value: string; label: string; checked: boolean; count: number }
  setOption: any
  className?: string
}

function Label({ id, children }: LabelProps) {
  return (
    <label htmlFor={id} className="mb-2 block text-sm font-semibold text-gray-900">
      {children}
    </label>
  )
}

export function TextField({ id, label, type = 'text', className, ...props }: TextFieldProps) {
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
  setOption,
  placeholder,
  ...props
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select id={id} {...props} className={clsx(formClasses, 'pr-8')}>
        {placeholder && <option value={props.options[0].value}>{placeholder}</option>}
        {props.options.map((option: option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export function PhoneField({ id, label, className, ...props }: PhoneFieldProps) {
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
        className="block h-10 rounded-md bg-transparent  text-base focus:outline-none focus:ring-cyan-500"
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

export function UploadFile({ id, label, onChange, file }: UploadFileProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <p>{label}</p>
      {file && (
        <span className="w-28">
          <p className="truncate text-success">{file?.name}</p>
        </span>
      )}
      <label
        htmlFor={id}
        className={clsx(
          'flex  cursor-pointer gap-2 rounded-md bg-gray-200 px-2 py-1 font-medium text-gray-800 hover:bg-gray-300',
          file && 'bg-success text-white'
        )}
      >
        <GoUpload className="h-6 w-6" />
        <p>Select file</p>
      </label>
      <input type="file" id={id} className="hidden" onChange={onChange} />
    </div>
  )
}

export function LanguageSelect({ languages }: { languages: option[] }) {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor="language" className="mr-2">
        Select Language
      </label>
      <select
        id="language"
        name="language"
        className="block h-10 rounded-md bg-transparent  text-base focus:outline-none focus:ring-cyan-500"
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

export function TimezoneSelect({ id, className }: { id: string; className?: string }) {
  const timeZones = [
    { value: '+1', label: 'GMT +1' },
    { value: '+2', label: 'GMT +2' },
  ]

  return <SelectField id={id} className={className} options={timeZones} label="Select Time Zone" />
}

export function CheckboxFieldWithCount({ option, setOption, className }: CheckboxFieldProps) {
  return (
    <div className={clsx(`${className} `)}>
      <label htmlFor={option.value} className="flex items-center">
        <input
          checked={option.checked}
          disabled={option.count === 0}
          name={option.value}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 focus:ring-primary-500"
          id={option.value}
          onChange={(e) => setOption(e.target.checked)}
        />
        <span
          className={clsx(`ml-2 text-sm ${option.count == 0 ? 'text-gray-300' : 'text-gray-700'}`)}
        >
          {option.label}
        </span>
      </label>
    </div>
  )
}

export function UploadAvatar({ id, label, onChange, file }: UploadFileProps) {
  return (
    <div className="flex  items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-400 p-4">
      {file && <Avatar src={URL.createObjectURL(file)} />}
      <p className="text-lg font-semibold text-gray-800">{label}</p>
      <label
        htmlFor={id}
        className={clsx(
          'flex cursor-pointer items-center  gap-2 rounded-md bg-gray-200 px-3 py-2 font-medium text-gray-800 transition duration-300 hover:bg-gray-300',
          file && 'bg-success text-white'
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Upload Photo
      </label>
      <input type="file" id={id} className="hidden" accept="image/*" onChange={onChange} />
    </div>
  )
}
