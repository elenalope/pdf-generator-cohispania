import { render, screen, fireEvent } from '@testing-library/react';
import Config from '../pages/config/Config.jsx';
import { BrowserRouter } from 'react-router-dom';

describe('Config page testing', () => {
  const renderWithRouter = (ui) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  beforeEach(() => {
    renderWithRouter(<Config />);
  });

  test('renders "Cancelar" button', () => {
    const cancelButton = screen.getByText('Cancelar');
    expect(cancelButton).toBeDefined();
  });

  test('renders "Crear" button', () => {
    const createButton = screen.getByText('Crear');
    expect(createButton).toBeDefined();
  });

  test('changes name field', () => {
    const nameInput = screen.getByLabelText('Nombre de la plantilla');
    fireEvent.change(nameInput, { target: { value: 'Nuevo Nombre' } });
    expect(nameInput.value).toBe('Nuevo Nombre');
  });

  test('toggles include cover switch', () => {
    const includeCoverSwitch = screen.getByLabelText('Portada');
    fireEvent.click(includeCoverSwitch);
    expect(includeCoverSwitch.checked).toBe(true);
  });

  test('renders and toggles "Indice" switch', () => {
    const tocSwitch = screen.getByLabelText('Indice');
    fireEvent.click(tocSwitch);
    expect(tocSwitch.checked).toBe(true);
  });

  test('renders and toggles "Salto de Sección" switch', () => {
    const sectionBreakSwitch = screen.getByLabelText('Salto de Sección');
    fireEvent.click(sectionBreakSwitch);
    expect(sectionBreakSwitch.checked).toBe(true);
  });
});
