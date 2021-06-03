/* eslint-disable max-len */
import React, { useReducer } from 'react';

/* 
## Test

Write a test that tests the behavior off App.

## Refactor

Refactor the hook to `useReducer` instead of `useState`. Refactor only the hook, you
shouldn't need to refactor the component at all.

## Rubric

- behavior test 3 pts
- refactor 7 pts



*/

const useRecord = (init) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'RECORD':
        return {
          ...state,
          before: [...state.before, state.current],
          current: action.payload,
        };
      case 'UNDO':
        return {
          before: state.before.slice(0, -1),
          current: state.before[state.before.length - 1],
          after: [state.current, ...state.after],
        };
      case 'REDO':
        return {
          before: [...state.before, state.current],
          current: state.after[0],
          after: state.after.slice(1),
        };
      default:
        return state;
    }
  };
  const initialState = {
    before: [],
    current: init,
    after: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);


  const undo = () => {
    dispatch({ type: 'UNDO' });
  };

  const redo = () => {
    dispatch({ type: 'REDO' });
  };

  const record = (val) => {
    dispatch({ type: 'RECORD', payload: val });
  };
  const { current } = state;
  return {
    undo,
    record,
    redo,
    current,
  };
};

function App() {
  const { current, undo, redo, record } = useRecord('#FF0000');

  return (
    <>
      <button onClick={undo} aria-label="undo">
        undo
      </button>
      <button onClick={redo} aria-label="redo">
        redo
      </button>
      <input
        data-testid="colorpicker"
        type="color"
        value={current}
        onChange={({ target }) => record(target.value)}
      />
      <div
        data-testid="colordiv"
        style={{ backgroundColor: current, width: '10rem', height: '10rem' }}
      ></div>
    </>
  );
}

export default App;
