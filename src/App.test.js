import { render, screen ,fireEvent} from '@testing-library/react';
import App from './App';
import TodoItem from './components/TodoItem'

test('renders App component', () => {
  render(<App />);
  
  screen.getByText(/Add/); 

  fireEvent.click(screen.getByText('Add'));
  
  fireEvent.click(screen.getByText('complete'));

  
  expect(screen.getByText('Add')).toBeDisabled();
});

test ('create new todo',() => {
  const item ={
    title:'new todo',
    completed:false
  }

   render(<TodoItem item={item}/>);
  
  screen.getByText('new todo');
})


