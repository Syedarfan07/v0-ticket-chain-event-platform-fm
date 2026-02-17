"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Upload, ArrowLeft, ArrowRight, Check } from "lucide-react"

const STEPS = ["Event Details", "Event Poster", "Ticket Settings"]

export function CreateEventDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    time: "",
    category: "Conference",
    supply: "",
    price: "",
    imageFileName: "",
  })

  const handleChange = (
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCreate = () => {
    setOpen(false)
    setStep(0)
    setFormData({
      title: "",
      description: "",
      venue: "",
      date: "",
      time: "",
      category: "Conference",
      supply: "",
      price: "",
      imageFileName: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create New Event</DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2 py-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`hidden text-xs sm:block ${
                  i <= step ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px flex-1 ${
                    i < step ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Event Details */}
        {step === 0 && (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Event Title</Label>
              <Input
                placeholder="ETH Global Hackathon"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Description</Label>
              <Textarea
                placeholder="Describe your event..."
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Venue</Label>
              <Input
                placeholder="Moscone Center, San Francisco"
                value={formData.venue}
                onChange={(e) => handleChange("venue", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-foreground">Time</Label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Event Poster */}
        {step === 1 && (
          <div className="flex flex-col gap-4 pt-2">
            <Label className="text-foreground">Upload Event Poster</Label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/50 p-10 transition-colors hover:border-primary/50">
              <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium text-foreground">
                Drag and drop your poster here
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, or WebP up to 10MB
              </p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => handleChange("imageFileName", "event-poster.jpg")}>
                Browse Files
              </Button>
            </div>
            {formData.imageFileName && (
              <p className="text-xs text-primary">
                Selected: {formData.imageFileName}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              The poster will be uploaded to IPFS for decentralized storage.
            </p>
          </div>
        )}

        {/* Step 3: Ticket Settings */}
        {step === 2 && (
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Ticket Supply</Label>
              <Input
                type="number"
                placeholder="500"
                value={formData.supply}
                onChange={(e) => handleChange("supply", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Maximum number of NFT tickets to mint
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Price (ETH)</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.15"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Price per ticket in ETH
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-foreground">Category</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="Conference">Conference</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Workshop">Workshop</option>
                <option value="Gaming">Gaming</option>
              </select>
            </div>

            <div className="rounded-lg border border-border bg-secondary/50 p-4">
              <h4 className="mb-2 text-xs font-semibold text-foreground uppercase tracking-wider">
                Smart Contract Summary
              </h4>
              <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Network</span>
                  <span className="font-mono text-foreground">
                    Ethereum Mainnet
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Standard</span>
                  <span className="font-mono text-foreground">ERC-721</span>
                </div>
                <div className="flex justify-between">
                  <span>Supply</span>
                  <span className="font-mono text-foreground">
                    {formData.supply || "---"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span className="font-mono text-foreground">
                    {formData.price ? `${formData.price} ETH` : "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < 2 ? (
            <Button
              size="sm"
              onClick={() => setStep(step + 1)}
              className="gap-1"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button size="sm" onClick={handleCreate} className="gap-1">
              <Check className="h-4 w-4" />
              Deploy Contract
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
