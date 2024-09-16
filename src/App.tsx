//import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Cache } from 'aws-amplify/utils';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    /*
    Cache.setItem("test", "test")
    setTimeout(()=>{
      Cache.clear().then(()=>{
        console.log("cleared")
      })
      .catch(e=>{
        console.log("error", e)
      })
    },2000);
    */

    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function cacheTodo() {
    Cache.setItem("test", "test");
  }

  function delCacheTodo() {
    Cache.clear();
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({
      id,
    });
  }

  return (
    //<Authenticator>
    //  {({ signOut }) => (
    //<button onClick={signOut}>Sign out</button>
    
      <main>
        <h1>My todos</h1>
        <button onClick={createTodo}>+ new</button>
        <button onClick={cacheTodo}>Add cache</button>
        <button onClick={delCacheTodo}>Delete cache</button>
        <ul>
          {todos.map((todo) => (
            <li 
              onClick={() => deleteTodo(todo.id)}
              key={todo.id}>{todo.content}
            </li>
          ))}
        </ul>
        <div>
          🥳 App successfully hosted. Try creating a new todo.
          <br />
          <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
            Review next step of this tutorial.
          </a>
        </div>
      </main>
     // )}
    //</Authenticator>
  );
}

export default App;
