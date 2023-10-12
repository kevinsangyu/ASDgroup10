/** @jest-environment jsdom */
// Import necessary testing utilities
import { render, screen } from '@testing-library/react';
import DashboardPage from './page';
import '@testing-library/jest-dom';

// Mock useRouter to avoid any issues related to Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({})
}));

// Mock the Lucide icons
jest.mock('lucide-react', () => ({
  ArrowRight: () => <div>MockedArrowRight</div>,
  Code: () => <div>MockedCode</div>,
  Image: () => <div>MockedImage</div>,
  MessageSquare: () => <div>MockedMessageSquare</div>,
  Music: () => <div>MockedMusic</div>,
  Video: () => <div>MockedVideo</div>,
}));

// Describe the test suite
describe('DashboardPage Component', () => {
  // Test case
  it('renders tools with correct labels and icons', () => {
    // Render the DashboardPage component
    render(<DashboardPage />);

    // Check if the welcome message is rendered
    expect(screen.getByText(/Welcome to AI Hub/)).toBeInTheDocument();

    // Add more assertions based on your component structure
    // For example, you can check if each tool label and icon is rendered correctly
    expect(screen.getByText(/MockedCode/)).toBeInTheDocument();
    expect(screen.getByText(/MockedImage/)).toBeInTheDocument();
    // ... add assertions for other tools

    // You can also check for specific styles or classes applied to the elements
    // For example, you might want to check if the 'hover:shadow-md' class is applied
    expect(screen.getByText(/MockedCode/)).toBeInTheDocument();
  });
});
