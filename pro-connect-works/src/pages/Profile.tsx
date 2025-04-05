
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Pencil, User, MapPin, Mail, Phone, Briefcase, Award, Star } from 'lucide-react';
import FreelancercertificateUi from '../pages/FreelancercertificationUi'

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    title: user?.userType === 'freelancer' ? 'Senior Web Developer' : 'Project Manager',
    location: 'San Francisco, CA',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    about: 'Experienced web developer with a passion for creating intuitive and performant web applications. Specialized in React, Node.js, and modern frontend frameworks.',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'API Development', 'MongoDB'],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California',
        year: '2018'
      }
    ],
    experience: [
      {
        title: 'Senior Web Developer',
        company: 'Tech Solutions Inc.',
        period: '2019 - Present',
        description: 'Lead development of web applications using React and Node.js.'
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Creations',
        period: '2018 - 2019',
        description: 'Developed responsive user interfaces using modern frontend technologies.'
      }
    ]
  });

  const isFreelancer = user?.userType === 'freelancer';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">
          Manage your personal information and profile settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <div>
          <Card className="text-center p-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-xl">{user ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>

              <div className="mt-4">
                <h2 className="text-xl font-semibold">{profileData.name}</h2>
                <p className="text-gray-600">{profileData.title}</p>
              </div>

              <div className="flex items-center mt-2 text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profileData.location}</span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </Button>
            </div>

            <div className="mt-8">
              <div className="flex items-center text-sm py-2">
                <Mail className="h-4 w-4 mr-3 text-gray-500" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center text-sm py-2">
                <Phone className="h-4 w-4 mr-3 text-gray-500" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center text-sm py-2">
                <User className="h-4 w-4 mr-3 text-gray-500" />
                <span className="capitalize">{user?.userType}</span>
              </div>
            </div>

            {isFreelancer && (
              <div className="mt-8 border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-left">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-100">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {isFreelancer && (
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <span className="text-2xl font-bold mr-2">4.9</span>
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} fill="currentColor" className="h-4 w-4" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">Based on 27 reviews</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      name="name"
                      value={profileData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      name="title"
                      value={profileData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Location</label>
                    <Input
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      name="email"
                      value={profileData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">About</label>
                    <Textarea
                      name="about"
                      value={profileData.about}
                      onChange={handleChange}
                      rows={5}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      className="bg-brand-purple hover:bg-brand-light-purple"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{profileData.about}</p>
                </CardContent>
              </Card>

              {isFreelancer ? (
                <Tabs defaultValue="experience">
                  <TabsList className="mb-4">
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="certificates">Certifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="certificates" className="space-y-4">
                  <FreelancercertificateUi/>
                  </TabsContent>
                  <TabsContent value="experience" className="space-y-4">
                    {profileData.experience.map((exp, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start">
                            <Briefcase className="h-5 w-5 text-brand-purple mr-3 mt-1" />
                            <div>
                              <h3 className="font-semibold">{exp.title}</h3>
                              <div className="text-sm text-gray-600">
                                {exp.company} - {exp.period}
                              </div>
                              <p className="mt-2 text-gray-700">{exp.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Pencil className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                  </TabsContent>

                  <TabsContent value="education" className="space-y-4">
                    {profileData.education.map((edu, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex items-start">
                            <Award className="h-5 w-5 text-brand-purple mr-3 mt-1" />
                            <div>
                              <h3 className="font-semibold">{edu.degree}</h3>
                              <div className="text-sm text-gray-600">
                                {edu.institution} - {edu.year}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    <Button variant="outline" className="w-full">
                      <Pencil className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  </TabsContent>

                  <TabsContent value="portfolio" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((item) => (
                        <Card key={item} className="overflow-hidden">
                          <div className="h-48 bg-gray-200 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                              Project Image
                            </div>
                          </div>
                          <CardContent className="pt-4">
                            <h3 className="font-semibold">Project Title {item}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              A brief description of the project and technologies used.
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full">
                      <Pencil className="h-4 w-4 mr-2" /> Add Portfolio Item
                    </Button>
                  </TabsContent>
                  
                  
                </Tabs>
              ) : (
                // Client profile tabs
                <Tabs defaultValue="projects">
                  <TabsList className="mb-4">
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews Given</TabsTrigger>
                  </TabsList>

                  <TabsContent value="projects" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Projects Overview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold">8</div>
                            <div className="text-sm text-gray-600">Total</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">3</div>
                            <div className="text-sm text-gray-600">Active</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">5</div>
                            <div className="text-sm text-gray-600">Completed</div>
                          </div>
                        </div>
                        <Button className="w-full bg-brand-blue hover:bg-brand-light-blue">
                          View All Projects
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Recent Projects</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { title: 'Website Redesign', status: 'In Progress' },
                          { title: 'Mobile App Development', status: 'On Hold' },
                          { title: 'E-commerce Platform', status: 'Completed' },
                        ].map((project, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{project.title}</div>
                              <div className="text-sm text-gray-600">Last updated: 2 days ago</div>
                            </div>
                            <Badge className={
                              project.status === 'In Progress' 
                                ? 'bg-blue-100 text-blue-800' 
                                : project.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }>
                              {project.status}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Reviews You've Given</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="border-b pb-4 mb-4 last:border-0 last:pb-0 last:mb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarFallback>F{item}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">Freelancer #{item}</div>
                                  <div className="text-xs text-gray-600">Project: Website Development</div>
                                </div>
                              </div>
                              <div className="flex text-yellow-400">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    fill={i < 5 - (item % 2) ? "currentColor" : "none"} 
                                    className="h-4 w-4" 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">
                              Great work! The project was completed on time and exceeded my expectations.
                              Very professional and responsive throughout the process.
                            </p>
                            <div className="text-xs text-gray-500 mt-2">January 15, 2023</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                </Tabs>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
