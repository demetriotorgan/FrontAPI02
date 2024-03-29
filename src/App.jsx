import { useEffect, useState } from 'react'
import './App.css'
import Form from './Component/Form'
import Card from './Component/Card'
import EditForm from './Component/EditForm'

function App() {
  const [dados, setDados] = useState([])
  
  const API = 'https://teste5api-production.up.railway.app/person/'

  const addRegistro = async (nome, email) =>{
    const registro = {
      id: Math.random(),
      nome: nome,
      email: email,        
      isEditing:false,
    }
    
    console.log(registro)

    //fazendo o fetch
    await fetch(API,{
      method:"POST",
      body:JSON.stringify(registro),
      headers:{
        "Content-Type":"application/json"
      }
    })
    setDados((prevState)=>[registro,...prevState])    
  }

  const deleteRegistro = async (id)=>{
      // setDados(dados.filter(item => item.id !== id))
      console.log(id)
      await fetch(API+id,{
        method:'DELETE',
      })
      setDados((prevState)=> prevState.filter((item)=> item.id !== id))   

    console.log(API+id)
  }

  const editTarefa = async ({nome, email, id})=>{
    setDados(
      dados.map(item=> 
        item.id === id ? {...item, nome, email, isEditing: !item.isEditing}:item))       
  }

  const editRegistro = (id)=>{
    setDados(
      dados.map(item=>
        item.id === id ? {...item, isEditing: !item.isEditing}:item))
      console.log(dados)
  }

   return (       
    <div className="App">
      <Form addRegistro={addRegistro} />

      {dados.map((item, index)=>(
        item.isEditing ? (
          <EditForm editRegistro={editTarefa} cadastro={item} />
        ) : (
          <Card registro={item} key={index}
        deleteRegistro={deleteRegistro}
        editRegistro={editRegistro}
        />
        )       
      ))}
    </div>    
  )
}

export default App
