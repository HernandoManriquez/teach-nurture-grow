
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CourseCard, { Course } from '@/components/ui/CourseCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user, isInstructor } = useAuth();
  const navigate = useNavigate();

  // Mock courses data
  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Web Development',
      description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
      instructorName: 'Sarah Johnson',
      category: 'Web Development',
      duration: '8 weeks',
      studentCount: 256,
      lessonCount: 24,
      enrolled: true,
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      description: 'Explore the world of data analysis, visualization, and machine learning.',
      instructorName: 'Michael Chen',
      category: 'Data Science',
      duration: '10 weeks',
      studentCount: 189,
      lessonCount: 32,
      enrolled: true,
    },
  ];

  const createdCourses: Course[] = isInstructor() ? [
    {
      id: '3',
      title: 'Advanced JavaScript Patterns',
      description: 'Master modern JavaScript design patterns and architectural concepts.',
      instructorName: user?.name || 'You',
      category: 'Programming',
      duration: '6 weeks',
      studentCount: 147,
      lessonCount: 18,
      createdByUser: true,
    },
    {
      id: '4',
      title: 'Responsive UI Design',
      description: 'Create beautiful and responsive user interfaces that work on any device.',
      instructorName: user?.name || 'You',
      category: 'Design',
      duration: '4 weeks',
      studentCount: 92,
      lessonCount: 15,
      createdByUser: true,
    },
  ] : [];

  // Recommended courses based on enrolled courses
  const recommendedCourses: Course[] = [
    {
      id: '5',
      title: 'Full-Stack React Development',
      description: 'Build complete web applications with React, Node.js, and MongoDB.',
      instructorName: 'David Wilson',
      category: 'Web Development',
      duration: '12 weeks',
      studentCount: 321,
      lessonCount: 40,
    },
    {
      id: '6',
      title: 'Python for Data Analysis',
      description: 'Use Python to analyze, visualize, and interpret complex datasets.',
      instructorName: 'Emma Rodriguez',
      category: 'Data Science',
      duration: '8 weeks',
      studentCount: 245,
      lessonCount: 28,
    },
    {
      id: '7',
      title: 'UX/UI Design Principles',
      description: 'Learn the core principles of user experience and interface design.',
      instructorName: 'Alex Thompson',
      category: 'Design',
      duration: '6 weeks',
      studentCount: 178,
      lessonCount: 20,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 page-transition">
        {/* Welcome Section */}
        <section className="glass-card rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-2">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-muted-foreground">
            {isInstructor() 
              ? 'Manage your courses, create new content, or check on your students' progress.'
              : 'Continue learning where you left off or explore new courses.'}
          </p>
        </section>

        {/* Enrolled Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Learning</h2>
            <Button variant="ghost" onClick={() => navigate('/my-courses')}>
              View all
            </Button>
          </div>
          
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 glass-card rounded-lg">
              <p className="text-muted-foreground mb-4">You haven&apos;t enrolled in any courses yet.</p>
              <Button onClick={() => navigate('/explore')}>Explore Courses</Button>
            </div>
          )}
        </section>

        {/* Instructor Courses Section (conditionally rendered) */}
        {isInstructor() && createdCourses.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Courses (Instructor)</h2>
              <Button variant="outline" onClick={() => navigate('/create-course')}>
                Create new course
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Recommended Courses Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
