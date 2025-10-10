import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { SliderDemo } from "@/components/ui/sliderDemo";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

import ChatBox from "@/components/ui/chat";
import { toast } from "sonner";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FileUpload } from "@/components/ui/file-upload";
import Accordion from "@/components/ui/Accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
}`,
    propsData: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "destructive"',
        description: "Button style variant.",
        default: "default",
      },
      {
        name: "size",
        type: '"sm" | "default" | "lg"',
        description: "Button size.",
        default: "default",
      },
    ],
  },
  {
    id: "input",
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
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
}`,
    propsData: [
      {
        name: "type",
        type: "string",
        description: "Input type (e.g., text, email, password).",
        default: "text",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text.",
        default: "",
      },
    ],
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
}`,
    propsData: [
      {
        name: "variant",
        type: '"default" | "secondary" | "destructive" | "outline"',
        description: "Badge style variant.",
        default: "default",
      },
    ],
  },
  {
    id: "switch",
    title: "Switch",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    category: "Form",
    preview: (
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <label htmlFor="airplane-mode" className="text-sm">
          Airplane Mode
        </label>
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
}`,
    propsData: [
      {
        name: "checked",
        type: "boolean",
        description: "Switch state.",
        default: "false",
      },
      {
        name: "id",
        type: "string",
        description: "Unique identifier for the switch.",
        required: true,
      },
    ],
  },
  {
    id: "slider",
    title: "Slider",
    description:
      "An input where the user selects a value from within a given range.",
    category: "Form",
    preview: <SliderDemo />,
    code: `import { Slider } from "@/components/ui/slider"
import { useState } from "react"

export function SliderDemo() {
  const [value, setValue] = useState([50]);
  return (
    <Slider 
      value={value} 
      onValueChange={setValue} 
      max={100} 
      step={1} 
    />
  )
}`,
    propsData: [
      {
        name: "value",
        type: "number[]",
        description: "Current value(s) of the slider.",
        required: true,
      },
      {
        name: "onValueChange",
        type: "(value: number[]) => void",
        description: "Callback for value changes.",
        required: true,
      },
      {
        name: "max",
        type: "number",
        description: "Maximum value.",
        default: "100",
      },
      { name: "step", type: "number", description: "Step size.", default: "1" },
    ],
  },
  {
    id: "calendar",
    title: "Calendar",
    description:
      "A date field component that allows users to enter and edit date.",
    category: "Form",
    preview: (
      <div className="rounded-lg border border-border bg-card">
        <Calendar mode="single" className="" />
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
}`,
    propsData: [
      {
        name: "mode",
        type: '"single" | "multiple" | "range"',
        description: "Selection mode.",
        default: "single",
      },
      {
        name: "selected",
        type: "Date | Date[] | undefined",
        description: "Selected date(s).",
        default: "undefined",
      },
      {
        name: "onSelect",
        type: "(date: Date | Date[] | undefined) => void",
        description: "Callback for date selection.",
        default: "undefined",
      },
    ],
  },
  {
    id: "checkbox",
    title: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    category: "Form",
    preview: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm">
          Accept terms and conditions
        </label>
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
}`,
    propsData: [
      {
        name: "checked",
        type: "boolean",
        description: "Checkbox state.",
        default: "false",
      },
      {
        name: "id",
        type: "string",
        description: "Unique identifier for the checkbox.",
        required: true,
      },
    ],
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    description:
      "A modal dialog that interrupts the user with important content.",
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
              This action cannot be undone. This will permanently delete your
              account.
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
import { Button } from "@/components/ui/button"

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
}`,
    propsData: [
      {
        name: "open",
        type: "boolean",
        description: "Controls dialog visibility.",
        required: true,
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Callback for open state changes.",
        default: "undefined",
      },
    ],
  },
  {
    id: "select",
    title: "Select",
    description:
      "Fully accessible dropdown with keyboard navigation, dark theme support, and smooth animations.",
    category: "Form",
    preview: (
      <div className="w-full max-w-sm pointer-events-auto">
        <Select>
          <SelectTrigger className="w-full" aria-label="Choose a fruit">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ),
    code: `import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full" aria-label="Choose a fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  )
}`,
    propsData: [
      {
        name: "value",
        type: "string",
        description: "Selected value.",
        default: "undefined",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description: "Callback for value changes.",
        default: "undefined",
      },
    ],
  },
  {
    id: "dialog",
    title: "Dialog",
    description:
      "A modal dialog with smooth animations, dark theme support, and responsive design.",
    category: "Overlay",
    preview: (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Dialog Component</DialogTitle>
            <DialogDescription>
              This is a beautiful dialog with smooth animations and dark theme
              support. Press Escape or click the close button to dismiss.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Dialogs are perfect for displaying important information,
              confirmations, or forms that require user attention.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Smooth fade and zoom animations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Dark theme with backdrop blur</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Keyboard accessible (Escape to close)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Responsive and mobile-friendly</span>
              </li>
            </ul>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close Dialog
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
    code: `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Dialog Component</DialogTitle>
          <DialogDescription>
            This is a beautiful dialog with smooth animations and dark theme support.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Dialogs are perfect for displaying important information or confirmations.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>✓ Smooth animations</li>
            <li>✓ Dark theme support</li>
            <li>✓ Keyboard accessible</li>
            <li>✓ Responsive design</li>
          </ul>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Close Dialog</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`,
    propsData: [
      {
        name: "open",
        type: "boolean",
        description: "Controls dialog visibility.",
        required: true,
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Callback for open state changes.",
        default: "undefined",
      },
    ],
  },
  {
    id: "progress",
    title: "Progress",
    description:
      "Displays an indicator showing the completion progress of a task.",
    category: "Display",
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>33%</span>
          </div>
          <Progress value={33} className="w-full" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Loading</span>
            <span>75%</span>
          </div>
          <Progress value={75} className="w-full" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Complete</span>
            <span>100%</span>
          </div>
          <Progress value={100} className="w-full" />
        </div>
      </div>
    ),
    code: `import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>33%</span>
        </div>
        <Progress value={33} className="w-full" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Loading</span>
          <span>75%</span>
        </div>
        <Progress value={75} className="w-full" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Complete</span>
          <span>100%</span>
        </div>
        <Progress value={100} className="w-full" />
      </div>
    </div>
  )
}`,
    propsData: [
      {
        name: "value",
        type: "number",
        description: "Progress value (0-100).",
        default: "0",
      },
      {
        name: "max",
        type: "number",
        description: "Maximum value.",
        default: "100",
      },
    ],
  },
  {
    id: "textarea",
    title: "Textarea",
    description: "A multi-line text input component for longer text content.",
    category: "Form",
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Type your message here..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium">
            Feedback
          </label>
          <Textarea
            id="feedback"
            placeholder="Share your feedback..."
            className="min-h-[80px]"
          />
        </div>
      </div>
    ),
    code: `import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <Textarea 
          id="message" 
          placeholder="Type your message here..." 
          className="min-h-[100px]"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="feedback" className="text-sm font-medium">Feedback</label>
        <Textarea 
          id="feedback" 
          placeholder="Share your feedback..." 
          className="min-h-[80px]"
        />
      </div>
    </div>
  )
}`,
    propsData: [
      {
        name: "id",
        type: "string",
        description: "Unique identifier for the textarea.",
        required: true,
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text.",
        default: "",
      },
    ],
  },
  {
    id: "chat",
    title: "Chat",
    description:
      "Interactive chat demo with animations, theming and code snippet handling.",
    category: "Widgets",
    preview: (
      <ChatBox
        header={{ title: "AI Assistant", subtitle: "Powered by DevUI" }}
      />
    ),
    code: `import ChatBox from "@/components/ui/chat"

export function ChatDemo() {
  return <ChatBox header={{ title: "AI Assistant", subtitle: "Powered by DevUI" }} />
}`,
    propsData: [
      {
        name: "header",
        type: "{ title: string; subtitle?: string }",
        description: "Header configuration.",
        default: "{ title: '' }",
      },
    ],
  },
  {
    id: "toast",
    title: "Toast",
    description:
      "A brief message that appears temporarily to inform users of an action or event.",
    category: "Feedback",
    preview: (
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          onClick={() => toast("This is a toast notification!")}
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast("This is a toast notification!", {
              description: "Here is a description for more context.",
            })
          }
        >
          Toast with Description
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.success("This is a success toast!")}
        >
          Success Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("This is an error toast!")}
        >
          Error Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.warning("This is a warning toast!")}
        >
          Warning Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.info("This is an info toast!")}
        >
          Info Toast
        </Button>
      </div>
    ),
    code: `import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        variant="outline"
        onClick={() => toast("This is a toast notification!")}
      >
        Show Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("This is a toast notification!", {
            description: "Here is a description for more context.",
          })
        }
      >
        Toast with Description
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("This is a success toast!")}
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("This is an error toast!")}
      >
        Error Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("This is a warning toast!")}
      >
        Warning Toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("This is an info toast!")}
      >
        Info Toast
      </Button>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  )
}`,
    propsData: [
      {
        name: "message",
        type: "string",
        description: "Toast message.",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "Optional description.",
        default: "undefined",
      },
    ],
  },
  {
    id: "sidebar",
    title: "Sidebar Navigation",
    description:
      "A responsive sidebar navigation with expand/collapse states, nested menu items, and smooth animations.",
    category: "Navigation",
    preview: (
      <div className="w-full h-64 border rounded-lg overflow-hidden bg-background">
        <div className="text-center p-8 space-y-4">
          <div className="text-lg font-semibold">Responsive Sidebar</div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>✅ Desktop fixed, mobile overlay</div>
            <div>✅ Smooth animations</div>
            <div>✅ Nested menu support</div>
            <div>✅ Accessibility features</div>
          </div>
          <Link href="/sidebar-demo">
            <Button variant="outline" size="sm">
              View Full Demo
            </Button>
          </Link>
        </div>
      </div>
    ),
    code: `import { 
  Sidebar, 
  SidebarProvider, 
  SidebarTrigger, 
  SidebarContent,
  MenuItem 
} from '@/components/ui/sidebar';
import { Home, Settings, User } from 'lucide-react';

const navigationItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, href: '/' },
  { id: 'user', label: 'User Account', icon: <User className="w-4 h-4" />, children: [
    { id: 'profile', label: 'Profile', href: '/user/profile' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" />, href: '/user/settings' },
  ]},
];

export function SidebarDemo() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar items={navigationItems} onItemClick={(item) => console.log('Clicked:', item)} />
        <SidebarContent>
          <header className="flex items-center gap-4 p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">My App</h1>
          </header>
          <main className="flex-1 p-6">
            <h2 className="text-2xl font-bold">Welcome!</h2>
            <p>Your main content goes here.</p>
          </main>
        </SidebarContent>
      </div>
    </SidebarProvider>
  );
}`,
    propsData: [
      {
        name: "items",
        type: "MenuItem[]",
        description: "Navigation items.",
        required: true,
      },
      {
        name: "onItemClick",
        type: "(item: MenuItem) => void",
        description: "Callback for item clicks.",
        default: "undefined",
      },
    ],
  },
  {
    id: "menubar",
    title: "MenuBar",
    description: "A horizontal menu bar for navigation or grouped actions.",
    category: "Navigation",
    preview: (
      <div className="flex justify-center">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab</MenubarItem>
              <MenubarItem>Open...</MenubarItem>
              <MenubarItem disabled>Save As...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Exit</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Cut</MenubarItem>
              <MenubarItem>Copy</MenubarItem>
              <MenubarItem>Paste</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    ),
    code: `import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar"

export function MenuBarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>Open...</MenubarItem>
          <MenubarItem disabled>Save As...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}`,
    propsData: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        description: "Menu bar orientation.",
        default: "horizontal",
      },
    ],
  },
  {
    id: "drawer",
    title: "Drawer",
    description: "A panel that slides in from the side of the screen.",
    category: "Overlay",
    preview: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
              This is a simple drawer component example.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p className="text-sm text-gray-600">
              You can put any content here like forms, menus, or text.
            </p>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
    code: `import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a simple drawer component example.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-gray-600">
            You can put any content here like forms, menus, or text.
          </p>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
    propsData: [
      {
        name: "open",
        type: "boolean",
        description: "Controls drawer visibility.",
        required: true,
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        description: "Callback for open state changes.",
        default: "undefined",
      },
    ],
  },
  {
    id: "file-upload",
    title: "File Upload",
    description:
      "A versatile file upload component with drag & drop, progress tracking, and multiple variants.",
    category: "Form",
    preview: (
      <div className="w-full max-w-md space-y-4">
        <FileUpload
          variant="compact"
          accept="image/*,.pdf,.doc,.docx"
          multiple={true}
          maxFiles={3}
          maxSize={5 * 1024 * 1024}
          onFileSelect={(files) => console.log("Selected files:", files)}
          onFileUpload={async (files) => {
            console.log("Uploading files:", files);
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }}
          showProgress={true}
        />
      </div>
    ),
    code: `import { FileUpload } from "@/components/ui/file-upload"

export function FileUploadDemo() {
  const handleFileSelect = (files: File[]) => {
    console.log("Selected files:", files)
  }

  const handleFileUpload = async (files: File[]) => {
    console.log("Uploading files:", files)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <FileUpload
      variant="compact"
      accept="image/*,.pdf,.doc,.docx"
      multiple={true}
      maxFiles={3}
      maxSize={5 * 1024 * 1024}
      onFileSelect={handleFileSelect}
      onFileUpload={handleFileUpload}
      showProgress={true}
    />
  )
}`,
    propsData: [
      { name: "variant", type: '"default" | "compact" | "dropzone"', description: "Upload style variant.", default: "default" },
      { name: "accept", type: "string", description: "Accepted file types.", default: "*/*" },
    ],
  },
  {
    id: "sonner",
    title: "Sonner",
    description:
      "A toast notification system for displaying brief messages to users.",
    category: "Feedback",
    preview: (
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => {
            toast("Hi there, I am Sonner! 👋");
          }}
        >
          Show Toast
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            toast.success("Success message!");
          }}
        >
          Success
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            toast.error("Something went wrong");
          }}
        >
          Error
        </Button>
      </div>
    ),
    code: `import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => toast("Hi there, I am Sonner! 👋")}
      >
        Show Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.success("Success message!")}
      >
        Success
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error("Something went wrong")}
      >
        Error
      </Button>
    </div>
  )
}`,
    propsData: [
      {
        name: "message",
        type: "string",
        description: "Toast message.",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "Optional description.",
        default: "undefined",
      },
    ],
  },
  {
    id: "accordion",
    title: "Accordion",
    description: "A vertically stacked set of expandable panels that reveal hidden content.",
    category: "Display",
    preview: <Accordion />,
    code: `import Accordion from "@/components/ui/Accordion"

export function AccordionDemo() {
  const items = [
    {
      title: "✨ What is DevUI?",
      content: "DevUI is a modern, open-source component library to build beautiful apps faster."
    },
    {
      title: "🤝 Can I contribute?",
      content: "Yes! Fork our GitHub repo, submit your PR, and join our awesome community."
    },
    {
      title: "💜 Is it free?",
      content: "Absolutely! DevUI is free under the MIT license. Use it anywhere without limits."
    }
  ]

  return <Accordion items={items} />
}`,
    propsData: [
      { name: "items", type: "{ title: string; content: string }[]", description: "Array of accordion items with title and content.", required: true },
      { name: "defaultOpen", type: "string[]", description: "Array of item IDs to be open by default.", default: "[]" },
    ],
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "A popup that appears when hovering or focusing on an element, providing additional information.",
    category: "Feedback",
    preview: (
      <div className="flex justify-center gap-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-blue-600 text-xl">This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Info</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-red-600 text-xl">More info here</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    code: `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function TooltipDemo() {
  return (
    <div className="flex gap-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Info</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>More info here</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}`,
  },
  {
    id: "typography",
    title: "Typography",
    description:
      "Predefined text styles for headings, paragraphs, and inline elements.",
    category: "Content",
    preview: (
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
        <h3 className="text-2xl font-medium tracking-tight">Heading 3</h3>
        <p className="text-base text-gray-600 max-w-md mx-auto">
          This is a paragraph demonstrating the base text size and color. You
          can use this style for body content across your app.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
          “Good design is as little design as possible.”
        </blockquote>
        <p className="text-sm text-gray-500">
          Inline styles like{" "}
          <span className="font-semibold text-gray-900">bold</span> or{" "}
          <span className="italic text-gray-800">italic</span> text are
          supported too.
        </p>
      </div>
    ),
    code: `export function TypographyDemo() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
      <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
      <h3 className="text-2xl font-medium tracking-tight">Heading 3</h3>
      <p className="text-base text-gray-600">
        This is a paragraph demonstrating the base text size and color. You can use this style for body content across your app.
      </p>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
        “Good design is as little design as possible.”
      </blockquote>
      <p className="text-sm text-gray-500">
        Inline styles like <span className="font-semibold text-gray-900">bold</span> or{" "}
        <span className="italic text-gray-800">italic</span> text are supported too.
      </p>
    </div>
  )
}`,
    propsData: [
      { name: "children", type: "React.ReactNode", description: "Content to be displayed inside the tooltip.", required: true },
      { name: "delayDuration", type: "number", description: "Delay before tooltip appears (in milliseconds).", default: "700" },
    ],
  },
  {
    id: "typography",
    title: "Typography",
    description: "Predefined text styles for headings, paragraphs, and inline elements.",
    category: "Content",
    preview: (
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
        <h3 className="text-2xl font-medium tracking-tight">Heading 3</h3>
        <p className="text-base text-gray-600 max-w-md mx-auto">
          This is a paragraph demonstrating the base text size and color. You
          can use this style for body content across your app.
        </p>
        <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
          “Good design is as little design as possible.”
        </blockquote>
        <p className="text-sm text-gray-500">
          Inline styles like{" "}
          <span className="font-semibold text-gray-900">bold</span> or{" "}
          <span className="italic text-gray-800">italic</span> text are
          supported too.
        </p>
      </div>
    ),
    code: `export function TypographyDemo() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
      <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
      <h3 className="text-2xl font-medium tracking-tight">Heading 3</h3>
      <p className="text-base text-gray-600">
        This is a paragraph demonstrating the base text size and color. You can use this style for body content across your app.
      </p>
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
        “Good design is as little design as possible.”
      </blockquote>
      <p className="text-sm text-gray-500">
        Inline styles like <span className="font-semibold text-gray-900">bold</span> or{" "}
        <span className="italic text-gray-800">italic</span> text are supported too.
      </p>
    </div>
  )
}`,
    propsData: [
      { name: "className", type: "string", description: "CSS classes for styling text elements.", default: "" },
    ],
  },
];