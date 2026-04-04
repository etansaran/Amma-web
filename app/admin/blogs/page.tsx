"use client";

import { useState, useEffect } from "react";
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

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  readTime?: number;
  views?: number;
  createdAt: string;
  excerpt?: string;
  author?: string;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    defaultValues: { category: "teachings", author: "Amma Ashram" },
  });

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    setLoading(true);
    const params = new URLSearchParams({ admin: "true", limit: "100" });
    if (search) params.set("search", search);
    fetch(`/api/blogs?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setBlogs(data.blogs ?? []);
        setSelectedIds([]);
      })
      .catch(() => setError("Failed to load blogs"))
      .finally(() => setLoading(false));
  }, [refreshKey, search]);

  const handleEdit = async (id: string) => {
    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      const blog = data.blog;
      setValue("title", blog.title);
      setValue("excerpt", blog.excerpt ?? "");
      setValue("content", blog.content ?? "");
      setValue("category", blog.category);
      setValue("author", blog.author ?? "Amma Ashram");
      setValue("isFeatured", blog.isFeatured);
      setValue("isPublished", blog.isPublished);
      setEditingId(id);
      setShowForm(true);
    } catch { toast.error("Failed to load blog"); }
  };

  const onSubmit = async (data: BlogForm) => {
    setSubmitting(true);
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
      setRefreshKey(k => k + 1);
    } catch { toast.error("Operation failed"); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/blogs/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setRefreshKey(k => k + 1);
      toast.success("Blog deleted");
    } catch { toast.error("Delete failed"); }
  };

  const filteredBlogs = blogs.filter((blog) =>
    statusFilter === "all" ? true : statusFilter === "published" ? blog.isPublished : !blog.isPublished
  );

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
  };

  const bulkUpdatePublished = async (isPublished: boolean) => {
    const token = localStorage.getItem("admin_token");
    try {
      await Promise.all(selectedIds.map(async (id) => {
        const res = await fetch(`/api/blogs/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        const blog = data.blog;
        return fetch(`/api/blogs/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            title: blog.title,
            excerpt: blog.excerpt ?? "",
            content: blog.content ?? "",
            category: blog.category,
            author: blog.author ?? "Amma Ashram",
            isFeatured: blog.isFeatured,
            isPublished,
          }),
        });
      }));
      toast.success(`Selected posts ${isPublished ? "published" : "moved to drafts"}`);
      setRefreshKey((k) => k + 1);
    } catch {
      toast.error("Bulk update failed");
    }
  };

  const exportCsv = () => {
    const rows = [
      ["Title", "Category", "Author", "Published", "Featured", "Read Time", "Views", "Date"],
      ...filteredBlogs.map((blog) => [
        blog.title,
        blog.category,
        blog.author || "",
        blog.isPublished ? "Yes" : "No",
        blog.isFeatured ? "Yes" : "No",
        blog.readTime ?? "",
        blog.views ?? 0,
        blog.createdAt,
      ]),
    ];
    const csv = rows.map((row) => row.map((item) => `"${String(item ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "amma-blog-posts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-[#D4A853]">Blog Posts</h1>
          <p className="text-[#F5F5F5]/40 font-raleway text-sm">Manage teachings and articles</p>
        </div>
        <Button onClick={() => { setShowForm(!showForm); setEditingId(null); reset(); }} variant="primary">
          {showForm ? "Cancel" : "+ New Post"}
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title, author, category..."
          className="input-spiritual rounded-full px-4 py-2.5 text-sm min-w-[260px]"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input-spiritual rounded-full px-4 py-2.5 text-sm">
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        <button type="button" onClick={exportCsv} className="px-4 py-2.5 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-sm">
          Export CSV
        </button>
        {selectedIds.length > 0 && (
          <>
            <button type="button" onClick={() => bulkUpdatePublished(true)} className="px-4 py-2.5 rounded-full border border-green-400/20 text-green-300 text-sm">
              Publish Selected
            </button>
            <button type="button" onClick={() => bulkUpdatePublished(false)} className="px-4 py-2.5 rounded-full border border-yellow-400/20 text-yellow-300 text-sm">
              Move to Draft
            </button>
          </>
        )}
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
              <FormField label="Full Content" id="content" as="textarea" rows={8} placeholder="Full article content" registration={register("content")} error={errors.content?.message} required />
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
              <Button type="submit" variant="primary" loading={submitting}>
                {editingId ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 mb-6 text-center">
          <p className="text-red-400 font-raleway text-sm mb-3">{error}</p>
          <button onClick={() => { setError(null); setRefreshKey(k => k + 1); }}
            className="text-[#D4A853] text-xs font-raleway hover:underline">Retry</button>
        </div>
      )}

      <div className="rounded-2xl border border-[#D4A853]/10 bg-[#111] overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-[#D4A853]/5 animate-pulse" />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-[#F5F5F5]/40 font-raleway text-sm">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          <>
            <div className="md:hidden divide-y divide-[#D4A853]/5">
              {filteredBlogs.map((blog) => (
                <div key={blog._id} className="p-4 space-y-3">
                  <label className="flex items-center gap-2 text-xs text-[#F5F5F5]/35">
                    <input type="checkbox" checked={selectedIds.includes(blog._id)} onChange={() => toggleSelection(blog._id)} className="accent-[#D4A853]" />
                    Select
                  </label>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[#F5F5F5]/85 text-sm font-medium">{blog.title}</p>
                      <p className="text-[#F5F5F5]/35 text-xs mt-1 capitalize">{blog.category}</p>
                    </div>
                    <span className={`text-[11px] px-2 py-1 rounded-full font-raleway ${blog.isPublished ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-[#F5F5F5]/45">
                    <span>{blog.readTime ?? "—"} min read</span>
                    <span>{blog.views ?? 0} views</span>
                    <span>{formatDate(blog.createdAt)}</span>
                    {blog.isFeatured ? <span className="text-[#D4A853]">★ Featured</span> : null}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => handleEdit(blog._id)} className="flex-1 px-3 py-2 rounded-full border border-[#D4A853]/20 text-[#D4A853] text-xs">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="flex-1 px-3 py-2 rounded-full border border-red-400/20 text-red-400 text-xs">Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D4A853]/10">
                  {["", "Title", "Category", "Read Time", "Views", "Status", "Date", "Actions"].map(h => (
                    <th key={h} className="text-left p-4 font-cinzel text-[#D4A853] text-xs font-semibold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A853]/5">
                {filteredBlogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[#D4A853]/3 transition-colors">
                    <td className="p-4">
                      <input type="checkbox" checked={selectedIds.includes(blog._id)} onChange={() => toggleSelection(blog._id)} className="accent-[#D4A853]" />
                    </td>
                    <td className="p-4">
                      <p className="text-[#F5F5F5]/80 text-sm font-raleway font-medium">{blog.title}</p>
                      {blog.isFeatured && <span className="text-[#D4A853] text-xs">★ Featured</span>}
                    </td>
                    <td className="p-4">
                      <span className="text-xs capitalize bg-[#C17F4A]/10 text-[#C17F4A] px-2 py-1 rounded-full font-raleway">{blog.category}</span>
                    </td>
                    <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{blog.readTime ?? "—"} min</td>
                    <td className="p-4 text-[#F5F5F5]/50 text-sm font-raleway">{blog.views ?? 0}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-raleway ${blog.isPublished ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="p-4 text-[#F5F5F5]/50 text-xs font-raleway">{formatDate(blog.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(blog._id)} className="text-[#D4A853]/60 hover:text-[#D4A853] text-xs font-raleway transition-colors">Edit</button>
                        <button onClick={() => handleDelete(blog._id)} className="text-red-400/60 hover:text-red-400 text-xs font-raleway transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
