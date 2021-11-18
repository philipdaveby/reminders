import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { io } from 'socket.io-client';
import SubTask from './SubTask'
import { mockTodo } from '../../../tests/mockData'


describe('The SubTask component', () => {
    it('renders without crashing', () => {
        render(<SubTask sub={mockTodo.subTasks[0]} edit={false} completed todo={mockTodo} socket={io('')} />);
    });
    it('renders input form if edit = true', () => {
        render(<SubTask sub={mockTodo.subTasks[0]} edit={true} completed todo={mockTodo} socket={io('')} />);
        expect(screen.getByTestId('edit-menu')).toBeInTheDocument()
    });
});
