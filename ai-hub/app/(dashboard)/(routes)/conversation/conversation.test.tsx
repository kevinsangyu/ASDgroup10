import React from 'react';
import { render, screen } from '@testing-library/react';
import ConversationPage from './page';

test('renders ConversationPage component', () => {
  render(<ConversationPage />);
  
  // Check if the component renders without crashing
  expect(screen.getByText('Conversation')).toBeDefined();
  expect(screen.getByText('Our most advanced conversation model.')).toBeDefined();
  expect(screen.getByText('Generate')).toBeDefined();
});