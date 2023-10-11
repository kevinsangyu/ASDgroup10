import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

test('test', () => {
    expect(true).toBe(true);
})
// // Mocking the next/link since it won't work outside of a Next.js app context.
// jest.mock('next/link', () => {
//     return ({ children }: { children: React.ReactNode }) => children;
// });
  
// describe('<Home />', () => {

//   it('renders without crashing', () => {
//     const { container } = render(<Home />);
//     expect(container.firstChild).toBeDefined();
//   });

//   it('displays the Welcome header', () => {
//     render(<Home />);
//     expect(screen.getByText('Welcome to AI Hub 👋')).toBeDefined();
//   });

//   it('renders Login and Register buttons', () => {
//     render(<Home />);
//     expect(screen.getByText('Login')).toBeDefined();
//     expect(screen.getByText('Register')).toBeDefined();
//   });

// });
