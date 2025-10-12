import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = { args: { message: "Information message", type: "info" } };
export const Success: Story = { args: { message: "Operation successful!", type: "success" } };
export const Error: Story = { args: { message: "Something went wrong!", type: "error" } };
