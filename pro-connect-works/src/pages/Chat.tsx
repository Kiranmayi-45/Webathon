
import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { api, Conversation, Message } from '../services/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Send, Phone, Video, MoreHorizontal, Paperclip, Smile, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

const Chat: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userConversations = await api.conversations.getAll();
        setConversations(userConversations);
        
        if (userConversations.length > 0) {
          setSelectedConversation(userConversations[0].id);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
        toast({
          title: "Error",
          description: "Failed to load conversations",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
    
    // Set up periodic refresh of conversations
    const intervalId = setInterval(() => {
      fetchConversations();
    }, 10000); // Refresh every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [toast]);

  useEffect(() => {
    if (selectedConversation) {
      const fetchMessages = async () => {
        try {
          const conversationMessages = await api.conversations.getMessages(selectedConversation);
          setMessages(conversationMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
          toast({
            title: "Error",
            description: "Failed to load messages",
            variant: "destructive",
          });
        }
      };

      fetchMessages();
      
      // Set up periodic refresh of messages
      const intervalId = setInterval(() => {
        fetchMessages();
      }, 3000); // Refresh every 3 seconds
      
      return () => clearInterval(intervalId);
    }
  }, [selectedConversation, toast]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedConversation || !newMessage.trim() || !user) return;

    try {
      const message = await api.conversations.sendMessage(
        selectedConversation,
        user.id,
        newMessage.trim()
      );

      setMessages([...messages, message]);
      setNewMessage('');
      
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    }
  };

  const getOtherParticipantName = (conversation: Conversation) => {
    const otherParticipantId = conversation.participants.find(id => id !== user?.id);
    return otherParticipantId ? `User #${otherParticipantId.slice(-2)}` : 'Unknown User';
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const filteredConversations = conversations.filter(conversation => 
    getOtherParticipantName(conversation).toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="h-[calc(100vh-7rem)] flex rounded-lg overflow-hidden shadow-sm border border-border">
        {/* Conversation list */}
        <div className="w-full sm:w-80 lg:w-96 bg-background border-r border-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Messages</h2>
            <div className="mt-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {loading ? (
              <div className="p-4">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className="rounded-full bg-muted h-12 w-12"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : filteredConversations.length > 0 ? (
              <div>
                {filteredConversations.map((conversation) => {
                  const isSelected = selectedConversation === conversation.id;
                  const otherParticipantName = getOtherParticipantName(conversation);
                  
                  return (
                    <div 
                      key={conversation.id}
                      className={`p-4 flex items-center cursor-pointer transition-colors ${
                        isSelected ? 'bg-accent' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {otherParticipantName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium truncate text-foreground">{otherParticipantName}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conversation.lastMessage.timestamp)}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <span className={`truncate ${
                            conversation.lastMessage.senderId === user?.id 
                              ? 'text-muted-foreground' 
                              : 'text-foreground font-medium'
                          }`}>
                            {conversation.lastMessage.senderId === user?.id && 'You: '}
                            {conversation.lastMessage.text}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No conversations found
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Conversation detail */}
        {selectedConversation ? (
          <div className="hidden sm:flex flex-col flex-1 bg-background/50">
            {/* Chat header */}
            <div className="bg-background p-4 flex items-center justify-between border-b border-border">
              {conversations.find(c => c.id === selectedConversation) && (
                <>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getOtherParticipantName(
                          conversations.find(c => c.id === selectedConversation)!
                        ).substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h3 className="font-medium text-foreground">
                        {getOtherParticipantName(
                          conversations.find(c => c.id === selectedConversation)!
                        )}
                      </h3>
                      <span className="text-xs text-green-500">Online</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 bg-background/30">
              <div className="flex flex-col space-y-4">
                {messages.length > 0 ? (
                  <>
                    {messages.map((message, index) => {
                      const isCurrentUser = message.senderId === user?.id;
                      const previousMessage = index > 0 ? messages[index - 1] : null;
                      const showDateDivider = !previousMessage ||
                        formatDate(previousMessage.timestamp) !== formatDate(message.timestamp);
                      
                      return (
                        <React.Fragment key={message.id}>
                          {showDateDivider && (
                            <div className="flex items-center justify-center my-4">
                              <Separator className="w-1/3" />
                              <span className="px-3 text-xs text-muted-foreground">
                                {formatDate(message.timestamp)}
                              </span>
                              <Separator className="w-1/3" />
                            </div>
                          )}
                          
                          <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8 mt-1 mr-2">
                                <AvatarFallback>
                                  {getOtherParticipantName(
                                    conversations.find(c => c.id === selectedConversation)!
                                  ).substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div>
                              <div className={`rounded-lg px-4 py-2 max-w-md break-words ${
                                isCurrentUser 
                                  ? 'bg-brand-purple text-white' 
                                  : theme === 'dark' 
                                    ? 'bg-accent border border-border text-foreground' 
                                    : 'bg-white border text-foreground shadow-sm'
                              }`}>
                                <p>{message.text}</p>
                              </div>
                              <div className={`text-xs text-muted-foreground mt-1 ${
                                isCurrentUser ? 'text-right' : ''
                              }`}>
                                {formatTime(message.timestamp)}
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-muted-foreground">No messages yet</div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <form onSubmit={handleSendMessage} className="bg-background p-4 border-t border-border flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                type="text"
                placeholder="Type a message..."
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground">
                <Smile className="h-5 w-5" />
              </Button>
              <Button 
                type="submit" 
                className="bg-brand-purple hover:bg-brand-light-purple text-white"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4 mr-2" /> Send
              </Button>
            </form>
          </div>
        ) : (
          <div className="hidden sm:flex flex-col flex-1 bg-background/50 items-center justify-center">
            <div className="text-center">
              <div className="text-muted-foreground mb-3">
                <MessageSquare className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="font-medium text-lg text-foreground">No conversation selected</h3>
              <p className="text-muted-foreground mt-1">Choose a conversation from the list</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Chat;
