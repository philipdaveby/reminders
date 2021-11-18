import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import * as ShallowRenderer from 'react-test-renderer/shallow';
import { io } from 'socket.io-client';
const ReactTestRenderer = require('react-test-renderer');
import Todo from './Todo'

const myShallowRenderer = ShallowRenderer.createRenderer();

const mockTodo = {
    _id: 'adsfasd',
    todoId: '123kfjaodj3',
    task: 'first task',
    isComplete: true,
    userId: 'dafsll3k2k2',
    collaborators: ['a', 'b'],
    locked: false,
    subTasks: [
        {
            subId: 'asdf',
            task: '10',
            isComplete: false,
            locked: false
        }
    ]
}

describe('The Todo component', () => {
    it('renders without crashing', () => {
        render(<Todo getTodos={() => 'mock function'} todo={mockTodo} socket={io('')} />);
    });
    it('renders correct to-do title', () => {
        render(<Todo getTodos={() => 'mock function'} todo={mockTodo} socket={io('')} />);
        expect(screen.getByRole('heading', {level:3}).textContent).toBe('first task')
    });
    it('has classname line-through if completed', () => {
        render(<Todo getTodos={() => 'mock function'} todo={mockTodo} socket={io('')} />);
        expect(screen.getByText(mockTodo.task).className).toContain('line-through')
    });
    it('renders a icon if collaborators exist', () => {
        render(<Todo getTodos={() => 'mock function'} todo={mockTodo} socket={io('')} />);
        expect(screen.getByAltText('You are collaborating on this to-do')).toBeTruthy()
    });
    // it('Renders a li tag', () => {
    //     const todo = myShallowRenderer.render(<Todo getTodos={() => 'mock function'} todo={mockTodo} socket={io('')} />);
    //     const result = todo.getRenderOutput();
    //     expect(todo.contains(<li></li>)).toEqual(true);
    //   });
});
