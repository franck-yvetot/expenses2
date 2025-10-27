import { render, screen, waitFor } from '@testing-library/react';
import { HelloWorld } from './HelloWorld';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('HelloWorld', () => {
  const mockData = {
    message: 'Hello World from NestJS!',
    timestamp: '2025-10-27T14:00:00.000Z',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    (api.fetchHello as jest.Mock).mockImplementation(
      () => new Promise(() => {}), // Never resolves
    );

    render(<HelloWorld />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render data when fetch is successful', async () => {
    (api.fetchHello as jest.Mock).mockResolvedValue(mockData);

    render(<HelloWorld />);

    await waitFor(() => {
      expect(screen.getByText(mockData.message)).toBeInTheDocument();
    });

    expect(screen.getByText(/Timestamp:/)).toBeInTheDocument();
  });

  it('should render error when fetch fails', async () => {
    const errorMessage = 'Network error';
    (api.fetchHello as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<HelloWorld />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should display formatted timestamp', async () => {
    (api.fetchHello as jest.Mock).mockResolvedValue(mockData);

    render(<HelloWorld />);

    await waitFor(() => {
      const timestampText = screen.getByText(/Timestamp:/);
      expect(timestampText).toBeInTheDocument();
    });
  });

  it('should display technology stack information', async () => {
    (api.fetchHello as jest.Mock).mockResolvedValue(mockData);

    render(<HelloWorld />);

    await waitFor(() => {
      expect(screen.getByText(/Frontend: React \+ Vite \+ Tailwind CSS/)).toBeInTheDocument();
      expect(screen.getByText(/Backend: NestJS \+ TypeORM \+ PostgreSQL/)).toBeInTheDocument();
    });
  });
});