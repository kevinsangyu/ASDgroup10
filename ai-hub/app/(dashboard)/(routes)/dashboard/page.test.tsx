/** @jest-environment jsdom */
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


describe('DashboardPage Component', () => {

  it('renders tools with correct labels and icons', () => {
    // Render the DashboardPage component
    render(<DashboardPage />);

    // Check if the welcome message and other elements are rendered
    expect(screen.getByText(/Welcome to AI Hub/)).toBeInTheDocument();

    expect(screen.getByText(/MockedCode/)).toBeInTheDocument();

    expect(screen.getByText(/MockedImage/)).toBeInTheDocument();

    expect(screen.getByText(/MockedCode/)).toBeInTheDocument();
  });
});
