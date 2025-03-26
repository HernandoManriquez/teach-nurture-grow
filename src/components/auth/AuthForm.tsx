
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

type AuthFormProps = {
  type: 'login';
};

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (type === 'login') {
      await login(values.email, values.password);
    }
  };

  return (
    <div className="w-full max-w-md p-8 glass-card rounded-xl mx-auto animate-scale-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        {type === 'login' ? 'Welcome Back' : 'Create an Account'}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Enter your password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showPassword" className="text-sm text-muted-foreground cursor-pointer">
              Show password
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6" 
            disabled={loading}
          >
            {loading 
              ? 'Signing in...'
              : 'Sign In'}
          </Button>
          
          {/* Hint for testing */}
          <p className="text-xs text-center text-muted-foreground mt-4">
            Hint: Use "admin@example.com" for admin access or "instructor@example.com" for instructor role
          </p>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
