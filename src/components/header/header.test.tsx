import { render, screen } from "@testing-library/react";
import Header from "./header";

test("renders Contact List in header", () => {
  render(<Header />);
  const headerTitle = screen.getByText(/Contact List/i);
  expect(headerTitle).toBeInTheDocument();
});
