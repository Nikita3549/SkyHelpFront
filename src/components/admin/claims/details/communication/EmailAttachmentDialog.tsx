
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Paperclip, Plus } from "lucide-react";
import { Claim } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type EmailAttachmentDialogProps = {
  claim: Claim;
}

export const EmailAttachmentDialog = ({ claim }: EmailAttachmentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would send this data to your backend
    console.log({
      date,
      from,
      to,
      summary,
      file
    });
    
    toast({
      title: "Email logged successfully",
      description: "The email has been added to the communication log",
    });
    
    // Reset form
    setDate(new Date());
    setFrom("");
    setTo("");
    setSummary("");
    setFile(null);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Attach Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Log Manual Email</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-medium">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="from" className="text-sm font-medium">From</label>
              <Input 
                id="from" 
                value={from} 
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Ryanair Customer Service"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="to" className="text-sm font-medium">To</label>
              <Input 
                id="to" 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
                placeholder="e.g. SkyHelp Claims Team"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="summary" className="text-sm font-medium">Summary</label>
              <Textarea 
                id="summary" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of the email content"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="attachment" className="text-sm font-medium">
                Upload Email (PDF or Image)
              </label>
              <div className="mt-1">
                <label className="flex items-center gap-2 p-2 border border-dashed rounded-md hover:bg-gray-50 cursor-pointer">
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm">
                    {file ? file.name : "Upload email screenshot or PDF"}
                  </span>
                  <Input 
                    id="attachment"
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Save Email</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
