import React from 'react';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App component', () => {
  afterEach(() => cleanup());
  it('renders App', () => {
    const { asFragment } = render(<App />);
    const undo = screen.getByRole('button', { name: 'undo' });
    const redo = screen.getByRole('button', { name: 'redo' });
    const div = screen.getByTestId('colordiv');
    const colorPicker = screen.getByTestId('colorpicker');
    expect(div).toHaveStyle('background-color: #FF0000');
    fireEvent.change(colorPicker, { target: { value: '#FFFFFF' } });
    expect(div).toHaveStyle('background-color: #FFFFFF');
    userEvent.click(undo);
    expect(div).toHaveStyle('background-color: #FF0000');
    userEvent.click(redo);
    expect(div).toHaveStyle('background-color: #FFFFFF');
    
    expect(asFragment()).toMatchSnapshot();
  });
});
