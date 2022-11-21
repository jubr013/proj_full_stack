import { Button, Container, Flex, Input, Item, Spacer } from './styles';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [tarefa, setTarefa] = useState('');
  const [listTarefa, setListTarefa] = useState([]);
  const [token, setToken] = useState('')

  // const adcTarefa = () => {
  //   if (!tarefa) return alert('Preencha uma tarefa');
  //   const newTarefa = {
  //     id: Math.random(),
  //     tarefa: tarefa,
  //     checked: false,
  //   };
  //   setListTarefa([...listTarefa, newTarefa]);
  //   setTarefa('');
  // };

  // const removeTarefa = (id) => {
  //   const newList = listTarefa.filter((tarefa) => tarefa.id !== id);
  //   setListTarefa(newList);
  // };

  // const toggleChecked = (id, checked) => {
  //   const index = listTarefa.findIndex((tarefa) => tarefa.id === id);
  //   const newList = listTarefa;
  //   newList[index].checked = !checked;
  //   setListTarefa([...newList]);
  // };



  function completeTask(id, completed) {

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    const taskToUpdate = {
      completed: !completed
    }

    axios.put(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, taskToUpdate, headers).then(
      task => {

        setListTarefa(listTarefa.map(
          tarefa => {

            if(tarefa.id === task.data.id) {

              tarefa = task.data

            }

            return tarefa

          }
        ))

      }
    )

  }



  function createTask() {

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    const taskToCreate = {
      description: tarefa,
      completed: false
    }

    axios.post('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', taskToCreate, headers).then(
      task => {
        setListTarefa([...listTarefa, task.data])
        setTarefa('')
      }
    )

  }



  function deleteTask(id) {

    let headers = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }

    axios.delete(`https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks/${id}`, headers).then(
      task => {

        setListTarefa(listTarefa.filter( tarefa => tarefa.id !== id ))

      }
    )

  }



  // Login
  useEffect(() => {

    const loginCredentials = {
      email: "usertestefiaperson@gmail.com",
      password: "string"
    }

    axios.post('https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login', loginCredentials).then(
      response => {

        setToken(response.data.jwt)
      }
    )

  }, [])



  useEffect(() => {

    if(token !== '') {

      let headers = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': token
        }
      }

      axios.get('https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks', headers).then(
        tasks => {
          console.log(tasks)
          setListTarefa(tasks.data)
        }
      )

    }

  }, [token])

  return (
    <Container>
      <h1 className="title">TAREFAS</h1>
      <Spacer />

      <Flex direction="row">
        <Input
          value={tarefa}
          placeholder="Digite sua tarefa"
          onChange={(e) => setTarefa(e.target.value)}
        />
        <Button onClick={createTask}>Adicionar</Button>
      </Flex>
      <Spacer margin="16px" />

      <ul>
        {
          listTarefa.length > 0 ? (
            listTarefa.map((tarefa, index) => (

              <div key={index}>
                <Item Item checked={tarefa.completed}>
                  <p>{tarefa.description}</p>
                  <Flex direction="row">
                    <button
                      onClick={() => completeTask(tarefa.id, tarefa.completed)}
                    >
                      <i className="bx bx-check "></i>
                    </button>
                    <button onClick={() => deleteTask(tarefa.id)}>
                      <i className="bx bx-trash "></i>
                    </button>
                  </Flex>
                </Item>
                <Spacer margin="12px" />
              </div>

            ))
          ) : (
            <p>Cadastre uma tarefa</p>
          )
        }
      </ul>
    </Container>
  );
}

export default App;
