'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase, ContactSubmission } from '@/lib/supabase';
import { Mail, Clock, CircleCheck as CheckCircle, Archive, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export function ContactManager() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');

  useEffect(() => {
    fetchContacts();
  }, [filter]);

  async function fetchContacts() {
    setLoading(true);
    let query = supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (!error && data) {
      setContacts(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: ContactSubmission['status']) {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status, replied_at: status === 'replied' ? new Date().toISOString() : null })
      .eq('id', id);

    if (!error) {
      fetchContacts();
    }
  }

  async function deleteContact(id: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchContacts();
    }
  }

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      read: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      replied: 'bg-green-500/20 text-green-400 border-green-500/50',
      archived: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    };
    return colors[status as keyof typeof colors] || colors.new;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied'].map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f as any)}
              variant={filter === f ? 'default' : 'outline'}
              size="sm"
              className={filter === f ? 'bg-blue-600' : 'border-blue-500/30 text-gray-300'}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <Card className="bg-slate-800/50 border-blue-500/30">
          <CardContent className="py-12 text-center text-gray-400">
            No contacts found
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-blue-500/30 hover:border-blue-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Mail className="w-5 h-5 text-blue-400" />
                        {contact.name}
                      </CardTitle>
                      <p className="text-sm text-gray-400 mt-1">{contact.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(contact.status)}>
                        {contact.status}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(contact.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-blue-500/20">
                    <p className="text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                  </div>

                  {contact.notes && (
                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                      <p className="text-sm text-gray-300">
                        <strong className="text-yellow-400">Notes:</strong> {contact.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    {contact.status === 'new' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(contact.id, 'read')}
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    {contact.status !== 'replied' && (
                      <Button
                        size="sm"
                        onClick={() => updateStatus(contact.id, 'replied')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark as Replied
                      </Button>
                    )}
                    {contact.status !== 'archived' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateStatus(contact.id, 'archived')}
                        className="border-gray-500/30"
                      >
                        <Archive className="w-4 h-4 mr-1" />
                        Archive
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteContact(contact.id)}
                      className="border-red-500/30 text-red-400 hover:bg-red-500/10 ml-auto"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
