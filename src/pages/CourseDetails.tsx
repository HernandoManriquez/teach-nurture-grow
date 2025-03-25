
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Book, Clock, Users, CheckCircle, Video, FileText, Play, Plus } from 'lucide-react';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isInstructor } = useAuth();
  const [enrolled, setEnrolled] = useState(false);
  
  // Mock course data - in a real app, this would come from an API based on the course ID
  const course = {
    id,
    title: 'Advanced JavaScript Patterns',
    description: 'Master modern JavaScript design patterns and architectural concepts for building scalable, maintainable applications. Learn factory patterns, module patterns, observer patterns, and more. This course will take your JavaScript skills to the next level.',
    instructorName: 'Alex Johnson',
    category: 'Programming',
    duration: '6 weeks',
    studentCount: 147,
    lessonCount: 18,
    createdByUser: id === '3' || id === '4',
    prerequisites: 'Intermediate JavaScript knowledge, familiarity with ES6+ features',
    lessons: [
      { 
        id: '1', 
        title: 'Introduction to Design Patterns', 
        duration: '45 min',
        type: 'video',
        completed: true 
      },
      { 
        id: '2', 
        title: 'Factory Pattern', 
        duration: '52 min',
        type: 'video',
        completed: true 
      },
      { 
        id: '3', 
        title: 'Module Pattern', 
        duration: '48 min',
        type: 'video',
        completed: false 
      },
      { 
        id: '4', 
        title: 'Observer Pattern', 
        duration: '55 min',
        type: 'video',
        completed: false 
      },
      { 
        id: '5', 
        title: 'Implementing Patterns - Practice Assignment', 
        duration: '2 hours',
        type: 'assignment',
        completed: false 
      },
    ],
  };

  const isUserEnrolled = enrolled || [1, 2].includes(Number(id));
  const userIsInstructor = isInstructor() && course.createdByUser;
  
  const handleEnroll = () => {
    // In a real app, this would make an API call to enroll the user
    toast.success('Successfully enrolled in the course!');
    setEnrolled(true);
  };
  
  const handleLessonClick = (lessonId: string) => {
    // In a real app, this would navigate to the lesson content
    toast.info(`Loading lesson content...`);
  };
  
  const handleAddLesson = () => {
    // In a real app, this would open a form to add a new lesson
    toast.info('Opening lesson creator...');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto page-transition">
        {/* Course Header */}
        <div className="glass-card p-6 rounded-lg mb-8">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {course.category}
            </Badge>
            {userIsInstructor && (
              <Badge variant="outline" className="bg-accent/10 text-accent">
                Your Course
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <span>Instructor: {course.instructorName}</span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {course.duration}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {course.studentCount} students
            </span>
          </div>
          
          <p className="mb-6 text-muted-foreground">{course.description}</p>
          
          {!isUserEnrolled && !userIsInstructor ? (
            <Button onClick={handleEnroll} className="w-full sm:w-auto">
              Enroll Now
            </Button>
          ) : userIsInstructor ? (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => toast.info('Edit course functionality')}>
                Edit Course
              </Button>
              <Button onClick={() => toast.info('View student analytics')}>
                View Analytics
              </Button>
            </div>
          ) : (
            <Button onClick={() => handleLessonClick(course.lessons[0].id)}>
              Continue Learning
            </Button>
          )}
        </div>
        
        {/* Course Content Tabs */}
        <Tabs defaultValue="lessons" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          
          {/* Lessons Tab */}
          <TabsContent value="lessons" className="glass-card p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Course Content</h2>
              {userIsInstructor && (
                <Button size="sm" onClick={handleAddLesson}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lesson
                </Button>
              )}
            </div>
            
            <div className="space-y-3">
              {course.lessons.map((lesson) => (
                <Card key={lesson.id} className="hover-scale">
                  <CardContent className="p-4 flex justify-between items-center cursor-pointer" onClick={() => handleLessonClick(lesson.id)}>
                    <div className="flex items-center gap-3">
                      {lesson.type === 'video' ? (
                        <Video className="h-5 w-5 text-primary" />
                      ) : (
                        <FileText className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {lesson.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Play className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">About This Course</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-muted-foreground">{course.description}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">What You'll Learn</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>JavaScript design patterns and their application</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Factory and Builder patterns for object creation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Module patterns for code organization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Observer pattern for event handling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Singleton and Prototype patterns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Best practices for modern JavaScript applications</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                <p className="text-muted-foreground">{course.prerequisites}</p>
              </div>
            </div>
          </TabsContent>
          
          {/* Discussion Tab */}
          <TabsContent value="discussion" className="glass-card p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Discussion Forum</h2>
            
            <div className="text-center py-8">
              <Book className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Join the discussion about this course content.</p>
              <Button disabled={!isUserEnrolled} onClick={() => toast.info('Discussion forum feature')}>
                {isUserEnrolled ? 'Start a New Thread' : 'Enroll to Join Discussion'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CourseDetails;
