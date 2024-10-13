// AddTrashBin.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddTrashBin from './AddTrashBin';

// Mocking axios
jest.mock('axios');

describe('AddTrashBin Component', () => {
    beforeEach(() => {
        render(<AddTrashBin />);
    });

    test('should display an error message when fill level exceeds capacity', async () => {
        fireEvent.change(screen.getByLabelText(/Bin Capacity/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Current Fill Level/i), { target: { value: '15' } });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /Add Trash Bin/i }));

        // Check for the error message
        const errorMessage = await screen.findByText(/Current fill level cannot exceed bin capacity/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test('should submit form successfully with valid inputs', async () => {
        fireEvent.change(screen.getByLabelText(/Bin Capacity/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Current Fill Level/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Last Emptied At/i), { target: { value: '2024-10-14T12:00' } });

        // Mock the axios post response
        axios.post.mockResolvedValue({ data: { message: 'Trash Bin added successfully!' } });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /Add Trash Bin/i }));

        // Wait for success alert
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:8070/TrashBin/add', expect.any(Object));
            expect(screen.queryByText(/Current fill level cannot exceed bin capacity/i)).not.toBeInTheDocument();
        });
    });

    test('should reset form fields after successful submission', async () => {
        fireEvent.change(screen.getByLabelText(/Bin Capacity/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Current Fill Level/i), { target: { value: '10' } });
        
        // Mock the axios post response
        axios.post.mockResolvedValue({ data: { message: 'Trash Bin added successfully!' } });

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /Add Trash Bin/i }));

        await waitFor(() => {
            // Check that inputs are reset
            expect(screen.getByLabelText(/Bin Capacity/i).value).toBe('');
            expect(screen.getByLabelText(/Current Fill Level/i).value).toBe('');
            expect(screen.getByLabelText(/Last Emptied At/i).value).toBe('');
        });
    });

    test('should show alert on failed submission', async () => {
        fireEvent.change(screen.getByLabelText(/Bin Capacity/i), { target: { value: '10' } });
        fireEvent.change(screen.getByLabelText(/Current Fill Level/i), { target: { value: '10' } });

        // Mock axios to simulate a failed response
        axios.post.mockRejectedValue(new Error('Failed to add Trash Bin'));

        // Simulate form submission
        fireEvent.click(screen.getByRole('button', { name: /Add Trash Bin/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalled();
            expect(screen.queryByText(/Current fill level cannot exceed bin capacity/i)).not.toBeInTheDocument();
        });
    });
});
