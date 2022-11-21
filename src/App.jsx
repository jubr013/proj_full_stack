import { Button, Container, Flex, Input, Item, Spacer } from './styles';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [tarefa, setTarefa] = useState('');
  const [listaTarefa, setListTarefa] = useState([]); 

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
  //   const newList = listaTarefa.filter((tarefa) => tarefa.id !== id);
  //   setListTarefa(newList);
  // };

  // const toggleChecked = (id, checked) => {
  //   const index = listTarefa.findIndex((tarefa) => tarefa.id === id);
  //   const newList = listTarefa;
  //   newList[index].checked = !checked;
  //   setListTarefa([...newList]);
  // };

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
        <Button onClick={adcTarefa}>Adicionar</Button>
      </Flex>
      <Spacer margin="16px" />

      <ul>
        {listaTarefa.map((tarefa) => (
          <>
            <Item Item checked={tarefa.checked} key={tarefa.id}>
              <p>{tarefa.tarefa}</p>
              <Flex direction="row">
                <button
                  onClick={() => toggleChecked(tarefa.id, tarefa.checked)}
                >
                  <i class="bx bx-check "></i>
                </button>
                <button onClick={() => removeTarefa(tarefa.id)}>
                  <i class="bx bx-trash "></i>
                </button>
              </Flex>
            </Item>
            <Spacer margin="12px" />
          </>
        ))}
      </ul>
    </Container>
  );
}

export default App;
