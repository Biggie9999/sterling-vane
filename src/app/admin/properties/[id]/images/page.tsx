"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, Trash2, ArrowLeft, GripVertical, Check, Image as ImageIcon, Link as LinkIcon, UploadCloud, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function PropertyImagesAdmin() {
  const params = useParams()
  const router = useRouter()
  const propertyId = params.id as string

  const [images, setImages] = useState<string[]>([])
  const [newUrl, setNewUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch(`/api/admin/properties/${propertyId}/images`)
      .then(r => r.json())
      .then(data => {
        if (data.images) setImages(data.images)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [propertyId])

  async function addImage() {
    if (!newUrl.trim()) return
    setError("")
    try {
      const res = await fetch(`/api/admin/properties/${propertyId}/images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: newUrl.trim() })
      })
      const data = await res.json()
      if (data.images) {
        setImages(data.images)
        setNewUrl("")
      }
    } catch {
      setError("Failed to add image.")
    }
  }

  async function saveOrder() {
    setSaving(true)
    try {
      await fetch(`/api/admin/properties/${propertyId}/images`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images })
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError("Failed to save order.")
    } finally {
      setSaving(false)
    }
  }

  function removeImage(idx: number) {
    const next = images.filter((_, i) => i !== idx)
    setImages(next)
  }

  function moveImage(from: number, to: number) {
    if (to < 0 || to >= images.length) return
    const next = [...images]
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    setImages(next)
  }

  return (
    <div className="space-y-8 pb-24 animate-sovereign-in">
      {/* Header */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/properties" className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#2563EB] mb-1">Asset Images</p>
            <h1 className="font-serif text-2xl font-bold text-[#0F172A] tracking-tight">Property Gallery</h1>
          </div>
        </div>
        <button
          onClick={saveOrder}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2563EB] transition-all shadow-lg disabled:opacity-50"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : saving ? "Saving..." : "Save Order"}
        </button>
      </div>

      {/* Add new image */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-4">Add New Image</p>
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
            <LinkIcon className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="url"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addImage()}
              placeholder="Paste image URL (https://...)"
              className="flex-1 bg-transparent text-[13px] font-medium text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
            />
          </div>
          <button
            onClick={addImage}
            className="flex items-center gap-2 px-5 py-3 bg-[#2563EB] text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#0F172A] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
        <p className="text-slate-400 text-[10px] mt-3 leading-relaxed">
          Paste any public image URL. The first image in the list will be the cover/hero image.
        </p>
      </div>

      {/* Image grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : images.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-16 text-center">
          <ImageIcon className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium text-sm">No images added yet.</p>
          <p className="text-slate-300 text-xs mt-1">Add an image URL above to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 px-2">
            {images.length} Images — Drag to reorder, first is cover
          </p>
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm group"
            >
              {/* Preview */}
              <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = "none" }}
                />
              </div>

              {/* URL */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 && (
                    <span className="px-2 py-0.5 bg-[#2563EB]/10 text-[#2563EB] text-[8px] font-bold uppercase tracking-widest rounded-full">Cover</span>
                  )}
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Image {idx + 1}</span>
                </div>
                <p className="text-xs text-slate-500 truncate font-mono">{img}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => moveImage(idx, idx - 1)}
                  disabled={idx === 0}
                  className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors text-xs font-bold"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveImage(idx, idx + 1)}
                  disabled={idx === images.length - 1}
                  className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-30 transition-colors text-xs font-bold"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeImage(idx)}
                  className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reminder to save */}
      {images.length > 0 && (
        <div className="flex justify-end">
          <button
            onClick={saveOrder}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-4 bg-[#0F172A] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#2563EB] transition-all shadow-xl disabled:opacity-50"
          >
            {saved ? <><Check className="w-4 h-4" /> Saved!</> : saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  )
}
