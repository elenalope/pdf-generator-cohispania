import { render, screen, waitFor } from "@testing-library/react";
import ListPdf from "../components/listPdf/ListPdf.jsx"; 
import { test, describe, beforeEach, vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { getPDF, deletePDF } from '../services/pdfServices'; 

vi.mock('../services/pdfServices');

const mockDocuments = [
  { id: '1', name: 'Document 1', content: 'Content 1' },
  { id: '2', name: 'Document 2', content: 'Content 2' },
];

describe('ListPdf component', () => {
    beforeEach(() => {
        getPDF.mockResolvedValue(mockDocuments);
        render(
            <Router>
                <ListPdf />
            </Router>
        );
    });

    test("renders documents", async () => {
        const documentNames = await waitFor(() => screen.getAllByText(/Document \d/));
        expect(documentNames).toHaveLength(mockDocuments.length);
    });
});
