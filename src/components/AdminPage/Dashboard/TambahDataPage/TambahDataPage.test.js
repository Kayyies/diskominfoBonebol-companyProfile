import { render, fireEvent, screen } from "@testing-library/react";
import TambahDataPage from "./TambahDataPage";
import React from "react";

// Mock komponen Tiptap dan fungsi alert serta fetch global
jest.mock("../../wysiwyg/Tiptap", () => () => <div>Tiptap Mock</div>);

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Nonaktifkan console.error
  global.fetch = jest.fn();
  global.alert = jest.fn();
});

afterEach(() => {
  console.error.mockRestore(); // Kembalikan console.error
  jest.clearAllMocks(); // Bersihkan semua mock
});

describe("TambahDataPage", () => {
  it("should show error alert if submission fails", async () => {
    global.fetch.mockImplementationOnce(
      () => Promise.resolve({ ok: false }), // Simulasikan fetch gagal
    );

    render(<TambahDataPage apiEndpoint="/api/data" />);
    const submitButton = screen.getByText("Masukan Data");

    // Simulasikan klik submit
    await fireEvent.click(submitButton);

    // Pastikan alert untuk error dipanggil dengan pesan yang benar
    expect(global.alert).toHaveBeenCalledWith("Error submitting data");
  });

  it("should call fetch with correct data and alert success on successful submission", async () => {
    global.fetch.mockImplementationOnce(
      () => Promise.resolve({ ok: true }), // Simulasikan fetch berhasil
    );

    render(
      <TambahDataPage
        inputFields={[
          { label: "Name", type: "text", placeholder: "Enter name" },
        ]}
        apiEndpoint="http://example.com/api"
      />,
    );

    // Isi input form
    fireEvent.change(screen.getByPlaceholderText("Enter name"), {
      target: { value: "Sample Name" },
    });

    // Simulasikan submit form
    await fireEvent.click(screen.getByText("Masukan Data"));

    // Pastikan fetch dan alert sukses dipanggil
    expect(global.fetch).toHaveBeenCalledWith(
      "http://example.com/api",
      expect.any(Object),
    );
    expect(global.alert).toHaveBeenCalledWith("Data submitted successfully!");
  });

  it("should show error alert if submission fails", async () => {
    global.fetch.mockImplementationOnce(
      () => Promise.resolve({ ok: false }), // Simulasikan fetch gagal
    );

    render(
      <TambahDataPage
        inputFields={[
          { label: "Name", type: "text", placeholder: "Enter name" },
        ]}
        apiEndpoint="http://example.com/api"
      />,
    );

    // Simulasikan submit form
    await fireEvent.click(screen.getByText("Masukan Data"));

    // Pastikan alert error ditampilkan
    expect(global.alert).toHaveBeenCalledWith("Error submitting data");
  });
});
