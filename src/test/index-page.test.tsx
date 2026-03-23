import { render, screen } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import Index from "@/pages/Index";

describe("Index page", () => {
  beforeEach(() => {
    window.innerWidth = 390;
    window.sessionStorage.clear();
  });

  it("renders the main landing sections in mobile mode", () => {
    render(<Index />);

    expect(screen.getByRole("button", { name: /открыть меню/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /главная точка технологий/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /наши преимущества/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /всё лучшее/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /обменяй старый/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /наши магазины/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /написать в whatsapp/i })).toBeInTheDocument();
  });
});
