import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import { test, describe, beforeEach } from 'vitest';
import Home from '../pages/home/Home.jsx';
import { DocumentContext } from '../context/DocumentContext.jsx';

describe('Home component', () => {
    beforeEach(() => {
        render(
            <DocumentContext.Provider value={{ documents: [], setDocuments: () => {} }}> {}
                <Router>
                    <Home/>
                </Router>
            </DocumentContext.Provider>
        );
    });

    test('renders "Crear Plantilla" button', () => {
        const Button = screen.getByText('Crear Plantilla');
        expect(Button).toBeDefined();
    });
});
