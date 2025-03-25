
// This file would contain functions to interact with Supabase
// For this initial version, we're using a mock implementation
// In a real implementation, we would connect to Supabase here

export const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites.',
    instructorName: 'Sarah Johnson',
    instructorId: 'instructor-1',
    category: 'Web Development',
    duration: '8 weeks',
    studentCount: 256,
    lessonCount: 24,
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Explore the world of data analysis, visualization, and machine learning.',
    instructorName: 'Michael Chen',
    instructorId: 'instructor-2',
    category: 'Data Science',
    duration: '10 weeks',
    studentCount: 189,
    lessonCount: 32,
  },
  {
    id: '3',
    title: 'Advanced JavaScript Patterns',
    description: 'Master modern JavaScript design patterns and architectural concepts.',
    instructorName: 'Alex Johnson',
    instructorId: 'current-user',
    category: 'Programming',
    duration: '6 weeks',
    studentCount: 147,
    lessonCount: 18,
  },
  {
    id: '4',
    title: 'Responsive UI Design',
    description: 'Create beautiful and responsive user interfaces that work on any device.',
    instructorName: 'Emma Davis',
    instructorId: 'current-user',
    category: 'Design',
    duration: '4 weeks',
    studentCount: 92,
    lessonCount: 15,
  },
  {
    id: '5',
    title: 'Full-Stack React Development',
    description: 'Build complete web applications with React, Node.js, and MongoDB.',
    instructorName: 'David Wilson',
    instructorId: 'instructor-3',
    category: 'Web Development',
    duration: '12 weeks',
    studentCount: 321,
    lessonCount: 40,
  },
];

export const mockEnrollments = [
  { userId: '1', courseId: '1' },
  { userId: '1', courseId: '2' },
];

// These would be functions to interact with Supabase
export const fetchUserCourses = async (userId: string) => {
  // In a real app, this would be a Supabase query
  return mockCourses.filter(course => 
    mockEnrollments.some(enrollment => 
      enrollment.userId === userId && enrollment.courseId === course.id
    )
  );
};

export const fetchInstructorCourses = async (instructorId: string) => {
  // In a real app, this would be a Supabase query
  return mockCourses.filter(course => course.instructorId === instructorId);
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  // In a real app, this would be a Supabase insert
  mockEnrollments.push({ userId, courseId });
  return { success: true };
};

export const createCourse = async (courseData: any) => {
  // In a real app, this would be a Supabase insert
  const newCourse = {
    id: String(mockCourses.length + 1),
    ...courseData,
    studentCount: 0,
    lessonCount: 0,
  };
  mockCourses.push(newCourse);
  return { success: true, course: newCourse };
};
