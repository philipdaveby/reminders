import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { io } from 'socket.io-client';
import Todo from './Todo'
import { mockTodo } from '../../../tests/mockData'

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
});
