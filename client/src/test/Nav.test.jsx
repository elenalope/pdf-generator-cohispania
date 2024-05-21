import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from "@testing-library/react";
import Nav from "../components/navbar/Navbar.jsx"
import { test, describe, beforeEach } from 'vitest';

describe('Nav component', () => {
    beforeEach(() => {
        render(
            <Router>
                <Nav />
            </Router>
        );
    });

    test("render Logo", () => {
        const imgLogo = screen.getByAltText("Pdf Generator logo");
        expect(imgLogo).toBeDefined();
    });
});
