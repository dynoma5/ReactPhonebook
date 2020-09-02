import React, { useState, useEffect } from 'react';
import PhoneService from './PhoneService';

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

const Persons = ({ filterString, arrayList, deleteMethod }) => {
  return (
    <>
      {
        filterString.length === 0 ?
          arrayList.map(person => <p key={person.id}>{person.name} {person.number} <button value={person.id} type="button" onClick={deleteMethod}>delete</button></p>) :
          arrayList.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
            .map(person => <p key={person.id}>{person.name} {person.number} <button value={person.id} type="button" onClick={deleteMethod}>delete</button></p>)
      }
    </>
  )
}

const App = () => {


  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    persons.find(x => x.name === newName) === undefined ?
      PhoneService.create(personObject).then((result) => setPersons(persons.concat(result))) :
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ?
        PhoneService.update(persons.find(x => x.name === newName).id, { ...persons.find(x => x.name === newName), number: newNumber })
          .then(() => PhoneService.getAll().then(result => setPersons(result))) :
        console.log("Cancelled")

    setNewName('')
    setNewNumber('')
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

  const deleteNumber = (event) => {
    PhoneService
      .remove(event.target.value)
      .then(() => PhoneService.getAll().then(result => setPersons(result)))
  }

  useEffect(() => {
    PhoneService.getAll().then(result => setPersons(result))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter string={filter} method={handleFilter}></Filter>
      <h2>Add a new</h2>
      <PersonForm submitMethod={addName} nameInput={newName} nameOnChange={handleNewName} numberInput={newNumber} numberOnChange={handleNewNumber}></PersonForm>
      <h2>Numbers</h2>
      <Persons filterString={filter} arrayList={persons} deleteMethod={deleteNumber}></Persons>
    </div>
  )
}

export default App;
