import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

export const componentsData = [
    {
        id: "button",
        title: "Button",
        description: "Displays a button or a component that looks like a button.",
        category: "Form",
        preview: (
            <div className="flex gap-4 flex-wrap justify-center">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
            </div>
        ),
        code: `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
    </div>
  )
}`
    },
    {
        id: "input",
        title: "Input",
        description: "Displays a form input field or a component that looks like an input field.",
        category: "Form",
        preview: (
            <div className="w-full max-w-sm space-y-4">
                <Input placeholder="Enter your email..." type="email" />
                <Input placeholder="Password" type="password" />
            </div>
        ),
        code: `import { Input } from "@/components/ui/input"

export function InputDemo() {
  return (
    <div className="space-y-4">
      <Input placeholder="Enter your email..." type="email" />
      <Input placeholder="Password" type="password" />
    </div>
  )
}`
    },
    {
        id: "badge",
        title: "Badge",
        description: "Displays a badge or a component that looks like a badge.",
        category: "Display",
        preview: (
            <div className="flex gap-2 flex-wrap justify-center">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
            </div>
        ),
        code: `import { Badge } from "@/components/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`
    },
    {
        id: "switch",
        title: "Switch",
        description: "A control that allows the user to toggle between checked and not checked.",
        category: "Form",
        preview: (
            <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <label htmlFor="airplane-mode" className="text-sm">Airplane Mode</label>
            </div>
        ),
        code: `import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode">Airplane Mode</label>
    </div>
  )
}`
    },
    {
        id: "slider",
        title: "Slider",
        description: "An input where the user selects a value from within a given range.",
        category: "Form",
        preview: (
            <div className="w-full max-w-sm">
                <Slider defaultValue={[50]} max={100} step={1} />
            </div>
        ),
        code: `import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} />
  )
}`
    },
    {
        id: "checkbox",
        title: "Checkbox",
        description: "A control that allows the user to toggle between checked and not checked.",
        category: "Form",
        preview: (
            <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm">Accept terms and conditions</label>
            </div>
        ),
        code: `import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  )
}`
    },
    {
        id: "alert-dialog",
        title: "Alert Dialog",
        description: "A modal dialog that interrupts the user with important content.",
        category: "Overlay",
        preview: (
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">Show Dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        ),
        code: `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}`
    },
    {
        id: "calendar",
        title: "Calendar",
        description: "A date field component that allows users to enter and edit date.",
        category: "Form",
        preview: (
            <div className="rounded-lg border border-border p-4 bg-card">
                <Calendar mode="single" className="pointer-events-auto" />
            </div>
        ),
        code: `import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  )
}`
    },{
      id: "radio-group",
      title: "Radio Group",
      description: "A group of radio buttons that allows the user to select one option from a set.",
      category: "Form",
      preview: (
          <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                  <input type="radio" id="option1" name="options" className="h-4 w-4 text-primary" />
                  <label htmlFor="option1" className="text-sm">Option 1</label>
              </div>  
              <div className="flex items-center space-x-2">
                  <input type="radio" id="option2" name="options" className="h-4 w-4 text-primary" />
                  <label htmlFor="option2" className="text-sm">Option 2</label>
              </div>
              <div className="flex items-center space-x-2">
                  <input type="radio" id="option3" name="options" className="h-4 w-4 text-primary" />
                  <label htmlFor="option3" className="text-sm">Option 3</label>
              </div>
          </div>
      ),
      code: `export function RadioGroupDemo() {
  return (
    <div className="flex flex-col space-y-2"> 
      <div className="flex items-center space-x-2">
        <input type="radio" id="option1" name="options" />
        <label htmlFor="option1">Option 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <input type="radio" id="option2" name="options" />
        <label htmlFor="option2">Option 2</label>
      </div>
      <div className="flex items-center space-x-2">
        <input type="radio" id="option3" name="options" />
        <label htmlFor="option3">Option 3</label>
      </div>
    </div>
  )
}`
    }
];
