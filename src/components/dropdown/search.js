import { useState } from 'react'
import { Combobox } from '@headlessui/react'

const people = [
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
]

function SearchDropdown() {
  const [selectedPerson, setSelectedPerson] = useState(people[0])
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson} as="div" className='relative inline-block text-left' >
      <Combobox.Input onChange={(event) => setQuery(event.target.value)} className='border-pink-300 border text-gray-700 bg-white hover:bg-pink-100 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800'/>
      <Combobox.Options className='absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
        {filteredPeople.map((person) => (
          <Combobox.Option key={person} value={person} className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            {person}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default SearchDropdown;