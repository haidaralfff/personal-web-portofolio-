/**
 * Dashboard Messages Page (Inbox)
 * View, filter, read, and delete contact form inquiries
 */

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { messageService } from "../../services/api";
import { Mail, CheckCircle2, Circle, Trash2, Calendar, User, MailCheck } from "lucide-react";

export default function DashboardMessages() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await messageService.getAll();
      setMessages(data.messages || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setError(err.message || "Failed to load messages");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await messageService.toggleReadStatus(id, newStatus);
      
      // Update local state
      setMessages(prev =>
        prev.map(msg => (msg.id === id ? { ...msg, is_read: newStatus } : msg))
      );
      setUnreadCount(prev => (newStatus ? Math.max(0, prev - 1) : prev + 1));
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(prev => ({ ...prev, is_read: newStatus }));
      }
    } catch (err) {
      setError("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    
    try {
      await messageService.delete(id);
      
      // Update local state
      const deletedMsg = messages.find(msg => msg.id === id);
      setMessages(prev => prev.filter(msg => msg.id !== id));
      if (deletedMsg && !deletedMsg.is_read) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError("Failed to delete message: " + err.message);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="flex bg-zinc-950 text-white min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto flex flex-col h-screen">
        
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-start flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Mail size={32} className="text-blue-500" />
              <h1 className="text-3xl font-bold">Contact Inbox</h1>
            </div>
            <p className="text-zinc-400">
              Manage inquiries and messages submitted by visitors from the portfolio contact form.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-blue-600 text-xs font-bold text-white rounded-full animate-bounce">
                {unreadCount} Unread
              </span>
            )}
            <button 
              onClick={fetchMessages}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 rounded-lg text-sm transition"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* ERROR BOX */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex-shrink-0">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* MESSAGES WORKSPACE */}
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-zinc-800 border-t-blue-500 rounded-full animate-spin" />
              <p className="text-zinc-400 text-sm">Loading message inbox...</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden min-h-0">
            
            {/* Messages List (Left Column) */}
            <div className="lg:col-span-5 border border-zinc-800 bg-zinc-900/20 rounded-xl overflow-y-auto p-4 space-y-3 min-h-0">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-2">
                All Messages ({messages.length})
              </h2>

              {messages.length === 0 ? (
                <div className="text-center py-16 text-zinc-500">
                  <MailCheck size={48} className="mx-auto text-zinc-650 mb-3 opacity-30" />
                  <p className="text-sm">Inbox is completely clean!</p>
                </div>
              ) : (
                messages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`p-4 rounded-lg border cursor-pointer transition duration-200 flex flex-col gap-2 ${
                      selectedMessage?.id === msg.id
                        ? "bg-blue-600/10 border-blue-500"
                        : "bg-zinc-900/50 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700"
                    } ${!msg.is_read ? "border-l-4 border-l-blue-500" : ""}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-bold text-sm text-white truncate max-w-[70%]">
                        {msg.name}
                      </h3>
                      <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                        {formatDate(msg.created_at).split(",")[0]}
                      </span>
                    </div>
                    
                    <p className="text-zinc-400 text-xs font-semibold truncate">
                      {msg.subject}
                    </p>
                    
                    <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Message Detail (Right Column) */}
            <div className="lg:col-span-7 border border-zinc-800 bg-zinc-900/30 rounded-xl p-6 flex flex-col min-h-0 overflow-y-auto">
              {selectedMessage ? (
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-start border-b border-zinc-800 pb-5 mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-2">
                          {selectedMessage.subject}
                        </h2>
                        
                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-zinc-400">
                          <div className="flex items-center gap-1.5">
                            <User size={14} className="text-blue-400" />
                            <span className="font-semibold text-zinc-300">
                              {selectedMessage.name}
                            </span>
                            <span className="text-zinc-500">
                              ({selectedMessage.email})
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-zinc-400" />
                            <span className="font-mono">
                              {formatDate(selectedMessage.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          selectedMessage.is_read
                            ? "bg-zinc-800 text-zinc-400 border border-zinc-700"
                            : "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {selectedMessage.is_read ? "Read" : "Unread"}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="bg-zinc-950/40 border border-zinc-800/50 rounded-lg p-5 leading-relaxed text-zinc-300 text-sm whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="mt-8 border-t border-zinc-800 pt-6 flex justify-between items-center">
                    <button
                      onClick={() => handleToggleRead(selectedMessage.id, selectedMessage.is_read)}
                      className="flex items-center gap-2 px-4 py-2 border border-zinc-800 hover:border-blue-500 hover:bg-blue-600/5 rounded-lg text-sm text-zinc-300 hover:text-blue-400 font-medium transition"
                    >
                      {selectedMessage.is_read ? (
                        <>
                          <Circle size={16} />
                          Mark as Unread
                        </>
                      ) : (
                        <>
                          <CheckCircle2 size={16} />
                          Mark as Read
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600 border border-red-600/20 hover:border-red-650 rounded-lg text-sm text-red-400 hover:text-white font-medium transition duration-300"
                    >
                      <Trash2 size={16} />
                      Delete Message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-zinc-500">
                  <Mail size={48} className="text-zinc-800 mb-4 opacity-50" />
                  <h3 className="font-bold text-white mb-1">No Message Selected</h3>
                  <p className="text-xs text-zinc-400">
                    Select a message from the inbox to read its details and take action.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
