import React, { useState } from 'react';

const Filter = ({ string, method }) => {
  return (
    <>
      filter shown with <input value={string} onChange={method} />
    </>
  )
}

const PersonForm = ({ submitMethod, nameInput, nameOnChange, numberInput, numberOnChange }) => {

  return (
    <>
      <form onSubmit={submitMethod}>
        <div>
          name: <input value={nameInput} onChange={nameOnChange} />
        </div>
        <div>number: <input value={numberInput} onChange={numberOnChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    </>
  )
}

const Persons = ({ filterString, arrayList }) => {
  return (
    <>
      {
        filterString.length === 0 ?
          arrayList.map(person => <p key={person.name}>{person.name} {person.number}</p>) :
          arrayList.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
            .map(person => <p key={person.name}>{person.name} {person.number}</p>)
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    persons.find(x => x.name === newName) === undefined ? setPersons(persons.concat(personObject)) : window.alert(`${newName} already exists`)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter string={filter} method={handleFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm submitMethod={addName} nameInput={newName} nameOnChange={handleNewName} numberInput={newNumber} numberOnChange={handleNewNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons filterString={filter} arrayList={persons}></Persons>
    </div>
  )
}

export default App;
