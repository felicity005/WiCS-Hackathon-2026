import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders roadmap quiz heading', () => {
  render(
    <MemoryRouter initialEntries={['/quiz']}>
      <App />
    </MemoryRouter>
  );
  const heading = screen.getByText(/build your skill roadmap/i);
  expect(heading).toBeInTheDocument();
});
