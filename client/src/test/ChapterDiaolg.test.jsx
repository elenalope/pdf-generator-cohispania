import { render, screen } from "@testing-library/react";
import ChapterDialog from "../components/chapter/ChapterDialog.jsx";
import { test, describe, beforeEach, vi } from 'vitest';

describe("ChapterDialog testing", () => {
    const mockOnChapterCreate = vi.fn();
    const mockOnCancel = vi.fn();
    const setOpenChapter = vi.fn();

    beforeEach(() => {
        render(
            <ChapterDialog
                openChapter={true}
                setOpenChapter={setOpenChapter}
                onChapterCreate={mockOnChapterCreate}
                onCancel={mockOnCancel}
            />
        );
    });

    test("render text", () => {
        const textElement = screen.getByText("Crear Capítulo");
        expect(textElement).toBeDefined();
    });
    test("render text", () => {
        const textElement = screen.getByText("Cancelar");
        expect(textElement).toBeDefined();
    });
    test("render text", () => {
        const textElement = screen.getByText("Crear");
        expect(textElement).toBeDefined();
    });
});
