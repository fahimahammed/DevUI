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
import { SidebarDemo } from "@/components/SidebarDemo";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { PlusIcon, HeartIcon, MessageCircleIcon } from "lucide-react";

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
  },
  {
    id: "slider",
    title: "Slider",
    description:
      "An input where the user selects a value from within a given range.",
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
}`,
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
  },
  {
    id: "calendar",
    title: "Calendar",
    description:
      "A date field component that allows users to enter and edit date.",
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
}`,
  },
  {
    id: "radio-group",
    title: "Radio Group",
    description:
      "A group of radio buttons that allows the user to select one option from a set.",
    category: "Form",
    preview: (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="option1"
            name="options"
            className="h-4 w-4 text-primary"
          />
          <label htmlFor="option1" className="text-sm">
            Option 1
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="option2"
            name="options"
            className="h-4 w-4 text-primary"
          />
          <label htmlFor="option2" className="text-sm">
            Option 2
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="option3"
            name="options"
            className="h-4 w-4 text-primary"
          />
          <label htmlFor="option3" className="text-sm">
            Option 3
          </label>
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
}`,
  },
  {
    id: "select",
    title: "Select",
    description:
      "Fully accessible dropdown with keyboard navigation, dark theme support, and smooth animations. Navigate with arrows, search by typing.",
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
}

// Keyboard Accessibility:
// - Tab: Focus the select trigger
// - Space/Enter: Open dropdown
// - Arrow Up/Down: Navigate options
// - Home/End: Jump to first/last option
// - Escape: Close dropdown
// - Type to search: Quick filter options`,
  },
  {
    id: "dialog",
    title: "Dialog",
    description:
      "A modal dialog with smooth animations, dark theme support, and responsive design. Fully accessible with keyboard navigation.",
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
              confirmations, or forms that require user attention. This
              component features:
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
  },
  {
    id: "progress",
    title: "Progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
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
  },
  {
    id: "textarea",
    title: "Textarea",
    description:
      "A multi-line text input component for longer text content like comments, descriptions, or messages.",
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
  },
  {
    id: "chat",
    title: "Chat",
    description:
      "Interactive chat demo with animations, theming and code snippet handling.",
    category: "Widgets",
    preview: (
      <ChatBox
        header={{ title: "AI Assistant", subtitle: "Powered by DevUI " }}
      />
    ),
    code: `import ChatBox from "@/components/ui/chat"

  export function ChatDemo() {
    return <ChatBox header={{ title: "AI Assistant", subtitle: "Powered by DevUI " }} />
  }`,
  },
  {
    id: "toast",
    title: "Toast",
    description:
      "A brief message that appears temporarily to inform users of an action or event.",
    category: "Feedback",
    preview: (
      <>
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
      </>
    ),
    code: `import { toast, Toaster } from "sonner"
import { Button } from "@/components/ui/button";


export function ToastDemo() {
  return (
    <div>
        <Button variant="outline" onClick={() => toast.success('This is a success toast!')}>
          Success Toast
        </Button>
        <Toaster position="bottom-right" richColors closeButton />
    </div>
}`,
  },
  {
    id: "sidebar",
    title: "Sidebar Navigation",
    description:
      "A responsive sidebar navigation with expand/collapse states, nested menu items, and smooth animations. Features hamburger menu for mobile.",
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
  {
    id: 'home',
    label: 'Home',
    icon: <Home className="w-4 h-4" />,
    href: '/',
  },
  {
    id: 'user',
    label: 'User Account',
    icon: <User className="w-4 h-4" />,
    children: [
      {
        id: 'profile',
        label: 'Profile',
        href: '/user/profile',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings className="w-4 h-4" />,
        href: '/user/settings',
      },
    ],
  },
];

export function SidebarDemo() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar 
          items={navigationItems} 
          onItemClick={(item) => console.log('Clicked:', item)}
        />
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
  },
  {
    id: "file-upload",
    title: "File Upload",
    description: "A versatile file upload component with drag & drop, progress tracking, and multiple variants.",
    category: "Form",
    preview: (
      <div className="w-full max-w-md space-y-4">
        <FileUpload
          variant="compact"
          accept="image/*,.pdf,.doc,.docx"
          multiple={true}
          maxFiles={3}
          maxSize={5 * 1024 * 1024} // 5MB
          onFileSelect={(files) => console.log("Selected files:", files)}
          onFileUpload={async (files) => {
            // Simulate upload
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
    // Simulate upload process
    console.log("Uploading files:", files)
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <div className="space-y-6">
      {/* Compact Variant */}
      <FileUpload
        variant="compact"
        accept="image/*,.pdf,.doc,.docx"
        multiple={true}
        maxFiles={3}
        maxSize={5 * 1024 * 1024} // 5MB
        onFileSelect={handleFileSelect}
        onFileUpload={handleFileUpload}
        showProgress={true}
      />

      {/* Default Dropzone Variant */}
      <FileUpload
        variant="default"
        accept="image/*"
        multiple={false}
        maxSize={10 * 1024 * 1024} // 10MB
        onFileSelect={handleFileSelect}
        onFileUpload={handleFileUpload}
      />

      {/* Large Dropzone Variant */}
      <FileUpload
        variant="dropzone"
        accept="*/*"
        multiple={true}
        maxFiles={5}
        onFileSelect={handleFileSelect}
      >
        <p className="text-sm text-muted-foreground">
          Drag and drop files here or click to browse
        </p>
      </FileUpload>
    </div>
  )
}`,
  },
  {
    id: "tooltip",
    title: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    category: "Overlay",
    preview: (
      <TooltipProvider>
        <div className="flex gap-4 justify-center items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary">Top</Button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Tooltip on top</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Tooltip on bottom</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    ),
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a tooltip</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}`,
  },
  {
    id: "floating-action-button",
    title: "Floating Action Button",
    description: "A floating action button (FAB) represents the primary action of a screen. It appears in front of all screen content, typically as a circular shape with an icon in its center.",
    category: "Form",
    preview: (
      <div className="relative h-64 w-full border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">FAB Demo</h3>
            <p className="text-sm text-muted-foreground">
              Floating buttons positioned around the container
            </p>
          </div>
        </div>
        
        {/* Different positioned FABs for demo */}
        <FloatingActionButton
          size="default"
          position="bottom-right"
          onClick={() => alert("Bottom Right FAB clicked!")}
        >
          <PlusIcon className="h-6 w-6" />
        </FloatingActionButton>
        
        <FloatingActionButton
          size="sm"
          position="top-right"
          variant="secondary"
          onClick={() => alert("Top Right FAB clicked!")}
        >
          <HeartIcon className="h-4 w-4" />
        </FloatingActionButton>
        
        <FloatingActionButton
          size="sm"
          position="bottom-left"
          variant="outline"
          onClick={() => alert("Bottom Left FAB clicked!")}
        >
          <MessageCircleIcon className="h-4 w-4" />
        </FloatingActionButton>
      </div>
    ),
    code: `import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { PlusIcon, HeartIcon, MessageCircleIcon } from "lucide-react"

export function FloatingActionButtonDemo() {
  return (
    <div className="relative h-64 w-full border rounded-lg overflow-hidden">
      {/* Your main content here */}
      <div className="p-8">
        <h2>Your App Content</h2>
        <p>The floating action buttons appear on top of this content.</p>
      </div>
      
      {/* Primary action button */}
      <FloatingActionButton
        size="default"
        position="bottom-right"
        onClick={() => alert("Primary action!")}
      >
        <PlusIcon className="h-6 w-6" />
      </FloatingActionButton>
      
      {/* Secondary action button */}
      <FloatingActionButton
        size="sm"
        position="top-right"
        variant="secondary"
        onClick={() => alert("Secondary action!")}
      >
        <HeartIcon className="h-4 w-4" />
      </FloatingActionButton>
      
      {/* Tertiary action button */}
      <FloatingActionButton
        size="sm"
        position="bottom-left"
        variant="outline"
        onClick={() => alert("Message action!")}
      >
        <MessageCircleIcon className="h-4 w-4" />
      </FloatingActionButton>
    </div>
  )
}

// Available positions: 
// - bottom-right (default)
// - bottom-left
// - top-right  
// - top-left
// - bottom-center
// - top-center

// Available variants:
// - default (primary color)
// - destructive
// - outline
// - secondary
// - ghost
// - link

// Available sizes:
// - default (h-14 w-14)
// - sm (h-12 w-12) 
// - lg (h-16 w-16)
// - icon (h-10 w-10)`,
  },
];
