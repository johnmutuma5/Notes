React hooks are a new way of creating components.

This feature allows us to use functional components only. We can still use class based components but with react hooks, we can use functional components and even manage state with functional components using hooks.

# What are Hooks?
A new way of writing our components.

# The useState Hook
This signals to react to use state for a functional component. It is invoked with the most initial state inside the component and returns an array of two;

- The most current state
- A funtion to help manipultate/update the state

```jsx
import React, { useState } from 'react';

const todo = props => {
  const [ todoName, setTodoName ] = useState('');
  const handleInputChange = event => {
    setTodoName(event.target.value);
  }

  return (
    <input type="text" value={ todoName } onChange={ handleInputChange } />
  );
}
```

We can invoke useState as many times as needed in the same component.

```jsx
import React, { useState } from 'react';

const todo = props => {
  const [ todoName, setTodoName ] = useState('');
  const [ todos, setTodos ] = useState([]);
  const handleInputChange = event => {
    setTodoName(event.target.value);
  }
  const handleAddTodo = () => {
    setTodos(todos.concat(todoName));
  }
  const renderTodos = () => {
    return todos.map(todo => { <li key={ todo }> { todo } </li> });
  }
  return (
    <input type="text" value={ todoName } onChange={ handleInputChange } />
    <button type="button" onclick={ handleAddTodo }>Add<button/>
    <ul>{ renderTodos() }<ul/>
  );
}
```

## Using One State instead of Multiple States
In the example above, we have used multiple states with multiple useState invokations. We have an option of using a single state, although the former is much more preferrable in the interest of separating concerns in state management.

```jsx
import React, { useState } from 'react';

const todo = props => {
  const [ todoState, setTodoState ] = useState({
    newTodoName: '',
    todos: []
  });
  const handleInputChange = event => {
    setTodoState({
      ...todoState,
      newTodoName: event.target.value
    });
  }
  const handleAddTodo = () => {
    setTodoState({
      ...todoState,
      todos: todoState.todos.concat(todoState.newTodoName)
    });
  }
  const renderTodos = () => {
    return todos.map(todo => { <li key={ todo }> { todo } </li> });
  }
  return (
    <input type="text" value={ todoName } onChange={ handleInputChange } />
    <button type="button" onclick={ handleAddTodo }>Add<button/>
    <ul>{ renderTodos() }<ul/>
  );
}
```

## The useEffect Hook
This hooks allows us to handle side effects once the component has mounted, when it updates and when it unmounts. It can be thought of componentDidMount, componentDidUpdateand componentWillUnmount combined. We provide a funtion to the hoook and this function, as a default behaviour, will be called every time there is a render, i.e. during component's initial mount and also during updating. It will also be called when the component is ready to unmount(more on this later in the clean up phase below).

```js
import React, { useEffect } from 'react';

async function getTodosFromApi (setTodos) {
  console.log('Fetching API data');
  const todos = await BackendAPI.getUserTodos();
  return setTodos(todos);
}

const todo = props => {
  const [ todoName, setTodoName ] = useState('');
  const [ todos, setTodos ] = useState([]);
  useEffect(() => {
    // we can for instance make a network API call
    getTodosFromApi();
  })
  const handleInputChange = event => {
    setTodoName(event.target.value);
  }
  const handleAddTodo = () => {
    setTodos(todos.concat(todoName));
  }
  const renderTodos = () => {
    return todos.map(todo => { <li key={ todo }> { todo } </li> });
  }
  return (
    <input type="text" value={ todoName } onChange={ handleInputChange } />
    <button type="button" onclick={ handleAddTodo }>Add<button/>
    <ul>{ renderTodos() }<ul/>
  );
}
```


### Controlling the Execution of the Effect
useEffect takes a second argument that is an array containing elements that React should compare in order to determine whether to run the effect or not.

```js
useEffect(() => {
  // some side effect
}, [props.anItem])
```
In this case, the effect will only be run if props.anItem changes between the renders. Passing an empty array causes the effect to be run only once like componentDidMount.

#### Effect Clean Up
useEffect can optionally return a function that will be used as a clean up call; i.e. this will be called before every update and before the component has unmounted.

```js
useEffect(() => {
  // some side effects e.g. Mutations, subscriptions etc.
  return function cleanUp () {
    // some clean up work e.g. unsubscribing etc.
    // this function doesn't have to be called cleanUp, it can also be a fat arrow function
  }
})
```

## The useContext Hook
We can make use of this as an alternative to the context consumer approach to the React context API.

Without hooks, we'd use the context consumer, or `static contextType` for class based components;

```js
const MyContext = React.createContext({ item: 'itemDefaultValue' });

// ChildComponent.jsx
const childComponent = props => {
  return (
    <MyContext.Consumer>
      { context => ( <div>{ context.item }</div>) }
    </MyContext.Consumer>
  );
};


// ...
const parentComponent = props => {
  return (
    <MyContext.Provider value={ item: 'itemValue' }>
      <ChildComponent />
    </MyContext.Provider>
  )
}
```

With useContext hook, the childcomponent would look like this;

```js
// ChildComponent.jsx
const childComponent = props => {
  const itemContext = useContext(MyContext);
  return <div>{ itemContext.item }</div>
}
```

## useReducer Hook
useReducer can be thought of as an alternative to useState; this is because it can do what useState does and also allow us to mutate the state of the component more elegantly when there are multiple actions that could mutate the state of the component.

```jsx
import React, { useReducer } from 'react';

const initTodosState = {
  todoList: []
}
const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todoList: state.todosList.concat([ action.data ])
      };
    default:
      return state;
  }
}
const todos = props => {
  const [ todoList, dispatch ] = useReducer(todosReducer, initTodosState);

  const renderTodos = () => (
    todoList.map(todo => { <li key={ todo }> { todo } </li> });
  );

  return (
    <input type="text" value={ todoName } onChange={ handleInputChange } />
    <button type="button" onclick={ handleAddTodo }>Add<button/>
    <ul>{ renderTodos() }<ul/>
  );
}
```
## useMemo Hook
This is good for memoization, i.e. to prevent rerendering items when it's not necessary. We can think of it as the shouldComponentUpdate lifecycle hook for class based components. 

```jsx
//...
const parentComponent = props => {
  return (
    <div>
      {useMemo(
          () => <MyChildComponent items={ someStateItem } />,
          [ someStateItem ]
      )}
    </div>
  )
}
```
















