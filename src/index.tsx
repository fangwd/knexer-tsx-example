/** @jsx h */

import { h, mount, useState } from 'knexer-jsx';
import styles from './index.scss';

function ToDo({
  title,
  completed,
  remove,
  toggle,
}: {
  title: string;
  remove?: () => void;
  toggle: () => void;
  completed?: boolean;
}) {
  const className = styles.todo + (completed ? ` ${styles.completed}` : '');
  return (
    <div className={className}>
      {remove && (
        <span className={styles.remove} onClick={remove}>
          X
        </span>
      )}
      <span onClick={toggle}>{title}</span>
    </div>
  );
}

function ToDoList({
  todos,
  remove,
  toggle,
}: {
  todos: Array<{ title: string; completed?: boolean }>;
  remove?: (title: string) => void;
  toggle: (title: string) => void;
}) {
  return (
    <div>
      {todos.map((todo) => (
        <ToDo
          key={todo.title}
          title={todo.title}
          completed={todo.completed}
          remove={remove && (() => remove(todo.title))}
          toggle={() => toggle(todo.title)}
        />
      ))}
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState<
    Array<{ title: string; completed?: boolean }>
  >([
    { title: 'Read a book' },
    { title: 'Watch a movie' },
    { title: 'Have fun' },
  ]);
  const [title, setTitle] = useState('');
  const [checked, setChecked] = useState(false);

  const add = () => {
    setTodos([...todos, { title }]);
    setTitle('');
  };

  const remove = (title: string) => {
    setTodos(todos.filter((todo) => todo.title !== title));
  };

  const toggle = (title: string) =>
    setTodos(
      todos.map((todo) =>
        todo.title === title ? { ...todo, completed: !todo.completed } : todo
      )
    );

  return (
    <div>
      <ToDoList
        todos={todos}
        remove={checked ? undefined : remove}
        toggle={checked ? remove : toggle}
      />
      <div>
        <input
          type="text"
          value={title}
          onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
        />
        <button type="button" onClick={add}>
          Add
        </button>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Auto-remove
        </label>
      </div>
    </div>
  );
}

mount(document.getElementById('root')!, <App />);
