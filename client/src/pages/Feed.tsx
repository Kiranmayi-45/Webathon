
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import PostCard from '../components/cards/PostCard';
import { api, Post } from '../services/api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image, Link, Paperclip } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Feed: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const feedPosts = await api.posts.getFeed();
        setPosts(feedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    try {
      const newPost = await api.posts.create({
        authorId: user?.id || '',
        authorType: user?.userType || 'freelancer',
        authorName: user?.name || '',
        authorAvatar: user?.avatar || '',
        content: newPostContent,
        image: newPostImage || undefined,
      });

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setNewPostImage('');
      setIsPostDialogOpen(false);
      toast.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
    toast.success('Post liked!');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
        <p className="text-gray-600">
          Stay updated with the latest opportunities and updates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left sidebar */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-5 mb-4">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold mt-4">{user?.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{user?.userType}</p>
              
              <div className="w-full border-t my-4"></div>
              
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Profile views</span>
                  <span className="text-sm font-medium">324</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Post impressions</span>
                  <span className="text-sm font-medium">1,752</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-5">
            <h3 className="font-semibold mb-3">Recent</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-purple flex items-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  Website Development
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-purple flex items-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  UI/UX Design Group
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-purple flex items-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  Freelance Jobs
                </a>
              </li>
            </ul>
            
            <h3 className="font-semibold mb-3 mt-5">Groups</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-purple flex items-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  Web Developers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-brand-purple flex items-center">
                  <span className="w-2 h-2 bg-gray-300 rounded-full mr-2"></span>
                  Freelance Network
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Main feed */}
        <div className="lg:col-span-2">
          {/* Create post card */}
          <Card className="mb-4">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                </Avatar>
                <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="rounded-full text-gray-500 text-left justify-start flex-1 hover:bg-gray-100 border"
                    >
                      Start a post...
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create a post</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user ? getInitials(user.name) : 'U'}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user?.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
                        </div>
                      </div>
                      <Textarea
                        placeholder="What do you want to talk about?"
                        rows={6}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        className="focus-visible:ring-brand-purple"
                      />
                      {newPostImage && (
                        <div className="relative">
                          <img
                            src={newPostImage}
                            alt="Post preview"
                            className="w-full h-auto rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6 rounded-full"
                            onClick={() => setNewPostImage('')}
                          >
                            &times;
                          </Button>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          placeholder="Add image URL (optional)"
                          value={newPostImage}
                          onChange={(e) => setNewPostImage(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        className="bg-brand-purple hover:bg-brand-light-purple"
                        onClick={handleCreatePost}
                      >
                        Post
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex justify-around mt-4">
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsPostDialogOpen(true)}>
                  <Image className="h-4 w-4" />
                  <span>Photo</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsPostDialogOpen(true)}>
                  <Paperclip className="h-4 w-4" />
                  <span>Attachment</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => setIsPostDialogOpen(true)}>
                  <Link className="h-4 w-4" />
                  <span>Link</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Posts */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-40 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  authorName={post.authorName}
                  authorAvatar={post.authorAvatar}
                  authorType={post.authorType}
                  content={post.content}
                  image={post.image}
                  likes={post.likes}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  onLike={handleLikePost}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Feed;
