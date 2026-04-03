"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import FormField from "@/components/forms/FormField";
import Button from "@/components/ui/Button";
import { formatDate } from "@/utils/helpers";

const blogSchema = z.object({
  title: z.string().min(3, "Title required"),
  excerpt: z.string().min(20, "Excerpt required (min 20 chars)"),
  content: z.string().min(50, "Content required (min 50 chars)"),
  category: z.string(),
  author: z.string(),
  isFeatured: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

type BlogForm = z.infer<typeof blogSchema>;

const sampleBlogs = [
  { _id: "1", title: "The Fire of Arunachala", slug: "fire-of-arunachala", category: "teachings", isPublished: true, isFeatured: true, readTime: 8, views: 1247, createdAt: new Date(Date.now() - 5 * 86400000).toISOString() },
  { _id: "2", title: "How Annadhanam Changed My Life", slug: "annadhanam-devotee-london", category: "devotees", isPublished: true, isFeatured: false, readTime: 6, views: 843, createdAt: new Date(Date.now() - 10 * 86400000).toISOString() },
  { _id: "3", title: "Thiyanam — The Highest Teaching", slug: "thiyanam-silence", category: "teachings", isPublished: false, isFeatured: false, readTime: 7, views: 0, createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: { category: "teachings", author: "Amma Ashram" },
  });

  const onSubmit = async (data: BlogForm) => {
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    try {
      const url = editingId ? `/api/blogs/${editingId}` : "/api/blogs";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(editingId ? "Blog updated" : "Blog created");
      setShowForm(false); setEditingId(null); reset();
    } catch { toast.error("Operation failed"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setBlogs(prev => prev.filter(b => b._id !== id));
      toast.success("Blog deleted");
    } catch { toast.error("Delete failed"); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Blog Posts</h1>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">Manage teachings and articles</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); reset(); }} variant="primary">
          {showForm ? "Cancel" : "+ New Post"}
        </Button>
      </div>

      {showForm && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="rounded-2xl border border-[#D4A853]/20 bg-[#111] p-6 mb-8">
          <h2 className="font-cinzel text-[#D4A853] text-lg font-semibold mb-5">
            {editingId ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField label="Title" id="title" placeholder="Blog post title" registration={register("title")} error={errors.title?.message} required />
            </div>
            <div className="sm:col-span-2">
              <FormField label="Excerpt" id="excerpt" as="textarea" rows={2} placeholder="Short description (shown in listing)" registration={register("excerpt")} error={errors.excerpt?.message} required />
            </div>
            <div className="sm:col-span-2">
              <FormField label="Full Content" id="content" as="textarea" rows={8} placeholder="Full article content (supports basic markdown)" registration={register("content")} error={errors.content?.message} required />
            </div>
            <FormField label="Category" id="category" as="select" registration={register("category")}>
              {["teachings","events","devotees","annadhanam","ashram-life","festivals"].map(c => (
                <option key={c} value={c}>{c.replace("-", " ")}</option>
              ))}
            </FormField>
            <FormField label="Author" id="author" placeholder="Author name" registration={register("author")} />
            <div className="sm:col-span-2 flex gap-6">
              <label className="flex items-center gap-2 text-[#F5F5F5]/60 text-sm font-raleway cursor-pointer">
                <input type="checkbox" {...register("isPublished")} className="accent-[#D4A853]" /> Published
              </label>
              <label className="flex items-center gap-2 text-[#F5F5F5]/60 text-sm font-raleway cursor-pointer">
                <input type="checkbox" {...register("isFeatured")} className="accent-[#D4A853]" /> Featured
              </label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" variant="primary" loading={loading}>
                {editingId ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D4A853]/10">
                {["Title", "Category", "Read Time", "Views", "Status", "Date", "Actions"].map(h => (
                  <th key={h} className="text-left p-4 font-cinzel text-[#D4A853] text-xs font-semibold uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4A853]/5">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-[#D4A853]/3 transition-colors">
                  <td className="p-4">
                    <p className="text-[#F5F5F5]/80 text-sm font-raleway font-medium">{blog.title}</p>
                    {blog.isFeatured && <span className="text-[#D4A853] text-xs">★ Featured</span>}
                  </td>
                  <td className="p-4">
                    <span className="text-xs capitalize bg-[#C17F4A]/10 text-[#C17F4A] px-2 py-1 rounded-full font-raleway">{blog.category}</span>
                  </td>
                  <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{blog.readTime} min</td>
                  <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{blog.views}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-raleway ${blog.isPublished ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway">{formatDate(blog.createdAt)}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingId(blog._id); setShowForm(true); }} className="text-[#D4A853]/60 hover:text-[#D4A853] text-xs font-raleway transition-colors">Edit</button>
                      <button onClick={() => handleDelete(blog._id)} className="text-red-400/60 hover:text-red-400 text-xs font-raleway transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
