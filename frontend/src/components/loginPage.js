"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap,Key, Lock, User } from 'lucide-react';
 
export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('login');

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    Team: '',
    Post: '',
    LinkedinUrl: '',
    name: '',
    email: '',
    MobileNo:'',
    password: '',
    confirmPassword: '',
    code:'',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors
  
    try {
      // Assuming you have an API endpoint to verify login credentials
      const response = await fetch('https://shrinik-project.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email, // Adjust according to your form data
          password: loginData.password,
        }),
      });
      
      const data = await response.json();
      
    console.log('Response status:', response.status); // Log the response status
    console.log('Response data:', data); 
      if (response.ok) {
        // Check if the user is an admin
        if (data.isAdmin) {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        // If the response is not ok, set an error message
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch('https://shrinik-project.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          team: signupData.Team,
          post: signupData.Post,
          name: signupData.name,
          linkedinUrl: signupData.LinkedinUrl,
          username: signupData.email, // If username is same as email, otherwise create a username field in the state
          MobileNo: signupData.MobileNo,
          email: signupData.email,
          password: signupData.password,
          year: signupData.year,
          code: signupData.code,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        router.push('/');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.log(err);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-blue-200 flex items-center justify-center"
    style={{
      backgroundImage: 'url(https://gyaanarth.com/wp-content/uploads/2022/07/GL-Bajaj-Institute-of-Technology-and-Management-5.jpg)', // Update with your image path
      backgroundSize: 'cover', // Ensures the image covers the entire div
      backgroundPosition: 'center', // Centers the background image
    }}>
      <div className="w-full max-w-md p-4 ">
        <Card className=" bg-blue-300">
          <CardHeader className=" text-center">
            <CardTitle className=" text-2xl text-center">Welcome to SHRINIK</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="tabs">
              <div className="tabs-list grid w-full grid-cols-2">
                <button
                  className={`py-2 px-4 ${activeTab === 'login' ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
                <button
                  className={`py-2 px-4 ${activeTab === 'signup' ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Sign Up
                </button>
              </div>

              {activeTab === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="User Name"
                        className="pl-10 text-gray-700"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="pl-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                    
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              )}

              {activeTab === 'signup' && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                <div className="relative text-gray-500">
  <Key className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
  <select
    className="pl-10 w-full border rounded-lg p-2"
    value={signupData.Team}
    onChange={(e) => setSignupData({ ...signupData, Team: e.target.value })}
    required
  >
    <option value="">Select Team</option>
    <option value="Tech">Tech</option>
    <option value="Editorial">Editorial</option>
    <option value="Photography">Photography</option>
    <option value="Management">Management</option>
    <option value="Design">Design</option>
    <option value="Media">Media</option>
    <option value="Marketing">Marketing</option>
  </select>
</div>

<div className="relative text-gray-500">
  <Key className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
  <select
    className="pl-10 w-full border rounded-lg p-2"
    value={signupData.Post}
    onChange={(e) => setSignupData({ ...signupData, Post: e.target.value })}
    required
  >
    <option value="">Select Post</option>
    <option value="Director">Director</option>
    <option value="Codirector">Codirector</option>
  </select>
</div>
                    <div className="relative text-gray-500">
                      <Key className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="LinkedIn Url"
                        className="pl-10"
                        value={signupData.LinkedinUrl}
                        onChange={(e) => setSignupData({ ...signupData, LinkedinUrl: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="Full Name"
                        className="pl-10"
                        value={signupData.name}
                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="User Name"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <Key className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="Mobile No"
                        className="pl-10"
                        value={signupData.MobileNo}
                        onChange={(e) => setSignupData({ ...signupData, MobileNo: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="password"
                        placeholder="Password"
                        className="pl-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        className="pl-10"
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="Year"
                        className="pl-10"
                        value={signupData.year}
                        onChange={(e) => setSignupData({ ...signupData, year: e.target.value })}
                        required
                      />
                    </div>
                    <div className="relative text-gray-500">
                      <Key className="absolute left-3 top-3 h-5 w-5 text-gray-800" />
                      <Input
                        type="text"
                        placeholder="Security Code Key"
                        className="pl-10"
                        value={signupData.code}
                        onChange={(e) => setSignupData({ ...signupData, code: e.target.value })}
                        required
                      />
                    </div>

                  
                  </div>
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Signing up...' : 'Sign Up'}
                  </Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
