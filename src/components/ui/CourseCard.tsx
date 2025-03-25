
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Course = {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  category: string;
  duration: string;
  studentCount: number;
  lessonCount: number;
  enrolled?: boolean;
  createdByUser?: boolean;
};

type CourseCardProps = {
  course: Course;
  variant?: 'default' | 'compact';
  className?: string;
};

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  variant = 'default',
  className 
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };
  
  if (variant === 'compact') {
    return (
      <Card 
        className={cn(
          "overflow-hidden transition-all hover-scale hover:shadow-md cursor-pointer", 
          className
        )}
        onClick={handleClick}
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {course.category}
            </Badge>
            {course.createdByUser && (
              <Badge variant="outline" className="bg-accent/10 text-accent">
                Instructor
              </Badge>
            )}
          </div>
          <h3 className="font-medium mb-2 line-clamp-1">{course.title}</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3.5 w-3.5" />
              <span>{course.lessonCount} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all hover-scale hover:shadow-md", 
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-primary/10 text-primary mb-2">
            {course.category}
          </Badge>
          {course.createdByUser && (
            <Badge variant="outline" className="bg-accent/10 text-accent">
              Instructor
            </Badge>
          )}
        </div>
        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          by {course.instructorName}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {course.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{course.studentCount} students</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{course.lessonCount} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{course.duration}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant={course.enrolled ? "secondary" : "default"}
          className="w-full"
          onClick={handleClick}
        >
          {course.enrolled ? 'Continue Learning' : 'View Course'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
