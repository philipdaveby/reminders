import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { io } from 'socket.io-client';
import TodoList from './TodoList'

const mockTodos = [{
    _id: 'adsfasd',
    todoId: '123kfjaodj3',
    task: 'first task',
    isComplete: false,
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
}]

describe('The TodoList component', () => {
    it('renders without crashing', () => {
        render(<TodoList todos={mockTodos} socket={io('')} getTodos={() => 'mock function'} filtered={false} />)
    });
    it('renders heading if filtered', () => {
        render(<TodoList todos={mockTodos} socket={io('')} getTodos={() => 'mock function'} filtered={true} />)
        expect(screen.getByRole('heading', {level:2}).textContent).toBe('Done todos')
    });
    it('renders 0 todos if filtered', () => {
        render(<TodoList todos={mockTodos} socket={io('')} getTodos={() => 'mock function'} filtered={true} />)
        expect(screen.getByRole('list').textContent).toContain('')
    });
});
