import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Poll from "./Poll";

const mockPoll = {
  id: 1,
  question: "Who will win?",
  options: [
    { id: 1, value: "Team A" },
    { id: 2, value: "Team B" },
  ],
};

describe("Poll Component", () => {
  test("renders poll question", () => {
    render(
      <Poll
        poll={mockPoll}
        selectedOptionId={null}
        setSelectedOptionId={() => {}}
      />
    );
    const questionElement = screen.getByText(/Who will win?/i);
    expect(questionElement).toBeInTheDocument();
  });

  test("allows selection of an option", () => {
    const setSelectedOptionIdMock = jest.fn();
    const onSubmitVoteMock = jest.fn();

    render(
      <Poll
        poll={mockPoll}
        selectedOptionId={null}
        setSelectedOptionId={setSelectedOptionIdMock}
        onSubmitVote={onSubmitVoteMock}
      />
    );

    const firstOption = screen.getByText(/Team A/i);
    fireEvent.click(firstOption);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    expect(setSelectedOptionIdMock).toHaveBeenCalledWith(1);
    expect(onSubmitVoteMock).toHaveBeenCalledTimes(1);
  });
});
