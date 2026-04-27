import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { LogOut, Users, Trophy, Clock, CheckCircle, UserPlus, Terminal } from 'lucide-react';
import { toast } from 'sonner';
import { questionsData } from '../data/questions';
import * as api from '../utils/api';

interface Submission {
  username: string;
  answers: (number | null)[];
  score: number;
  timeTaken: number;
  status: string;
  submittedAt: number;
}

interface User {
  username: string;
  isAdmin: boolean;
  createdAt: number;
}

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    loadData();

    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [user, navigate]);

  const loadData = async () => {
    try {
      const [submissionsResponse, usersResponse] = await Promise.all([
        api.getSubmissions(),
        api.getUsers()
      ]);

      if (submissionsResponse.success && submissionsResponse.submissions) {
        setSubmissions(submissionsResponse.submissions);
      }

      if (usersResponse.success && usersResponse.users) {
        setUsers(usersResponse.users);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUsername || !newPassword || !adminKey) {
      toast.error('All fields are required');
      return;
    }

    setCreating(true);

    try {
      const response = await api.createUser(newUsername, newPassword, adminKey);

      if (response.success) {
        toast.success(`User created: ${newUsername}`);
        setShowCreateUser(false);
        setNewUsername('');
        setNewPassword('');
        setAdminKey('');
        loadData();
      } else {
        toast.error(response.message || 'Failed to create user');
      }
    } catch (error) {
      toast.error('Error creating user');
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getParticipantStatus = (username: string) => {
    const hasSubmission = submissions.some(s => s.username === username);
    return hasSubmission ? 'Submitted' : 'Not Started';
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTaken - b.timeTaken;
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-cyan-500/30 bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ADMIN DASHBOARD
                  </h1>
                  <p className="text-sm text-gray-400">INTERACT 2026 - DEBUG THE BUG</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-950 border-cyan-500/30">
                    <DialogHeader>
                      <DialogTitle className="text-cyan-400">Create New User</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Create a new participant account. Admin key required.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-username" className="text-cyan-300">
                          Username
                        </Label>
                        <Input
                          id="new-username"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="bg-slate-900 border-cyan-500/30 text-white"
                          placeholder="username"
                          disabled={creating}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password" className="text-cyan-300">
                          Password
                        </Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-slate-900 border-cyan-500/30 text-white"
                          placeholder="••••••••"
                          disabled={creating}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-key" className="text-cyan-300">
                          Admin Key
                        </Label>
                        <Input
                          id="admin-key"
                          type="password"
                          value={adminKey}
                          onChange={(e) => setAdminKey(e.target.value)}
                          className="bg-slate-900 border-cyan-500/30 text-white"
                          placeholder="Enter admin key"
                          disabled={creating}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleCreateUser}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                        disabled={creating}
                      >
                        {creating ? 'Creating...' : 'Create User'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Stats cards */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-950 border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-cyan-400" />
                <p className="text-gray-400 text-sm">Total Registered</p>
              </div>
              <p className="text-3xl font-bold text-cyan-300">{users.length}</p>
            </div>

            <div className="bg-slate-950 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <p className="text-gray-400 text-sm">Submitted</p>
              </div>
              <p className="text-3xl font-bold text-green-300">{submissions.length}</p>
            </div>

            <div className="bg-slate-950 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-blue-400" />
                <p className="text-gray-400 text-sm">Not Started</p>
              </div>
              <p className="text-3xl font-bold text-blue-300">
                {users.filter(u => !u.isAdmin && getParticipantStatus(u.username) === 'Not Started').length}
              </p>
            </div>

            <div className="bg-slate-950 border border-yellow-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <p className="text-gray-400 text-sm">Avg Score</p>
              </div>
              <p className="text-3xl font-bold text-yellow-300">
                {submissions.length > 0
                  ? Math.round(submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length)
                  : 0}
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-slate-950 border border-cyan-500/30 rounded-lg p-6">
            <Tabs defaultValue="participants" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-900">
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="rankings">Rankings</TabsTrigger>
              </TabsList>

              {/* Participants Tab */}
              <TabsContent value="participants" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-cyan-400">Username</TableHead>
                        <TableHead className="text-cyan-400">Role</TableHead>
                        <TableHead className="text-cyan-400">Status</TableHead>
                        <TableHead className="text-cyan-400">Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center text-gray-400 py-8">
                            {loading ? 'Loading...' : 'No participants registered yet'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.filter(u => !u.isAdmin).map((participant, index) => {
                          const status = getParticipantStatus(participant.username);
                          return (
                            <TableRow key={index} className="border-slate-800">
                              <TableCell className="text-gray-300">{participant.username}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                                  Participant
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    status === 'Submitted'
                                      ? 'border-green-500/50 text-green-400'
                                      : 'border-gray-500/50 text-gray-400'
                                  }
                                >
                                  {status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-gray-400">
                                {status === 'Submitted' && 'Completed'}
                                {status === 'Not Started' && 'Waiting to start'}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Submissions Tab */}
              <TabsContent value="submissions" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-cyan-400">Participant</TableHead>
                        <TableHead className="text-cyan-400">Score</TableHead>
                        <TableHead className="text-cyan-400">Time Taken</TableHead>
                        <TableHead className="text-cyan-400">Submitted At</TableHead>
                        <TableHead className="text-cyan-400">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                            {loading ? 'Loading...' : 'No submissions yet'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        submissions.map((submission, index) => (
                          <TableRow key={index} className="border-slate-800">
                            <TableCell className="text-gray-300">{submission.username}</TableCell>
                            <TableCell>
                              <span className="text-cyan-300 font-semibold">
                                {submission.score} / 100
                              </span>
                            </TableCell>
                            <TableCell className="text-gray-400">
                              {formatTime(submission.timeTaken)}
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">
                              {formatDate(submission.submittedAt)}
                            </TableCell>
                            <TableCell>
                              <span className="text-gray-400 text-sm">
                                {submission.answers.filter(a => a !== null).length} / {questionsData.length} answered
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Rankings Tab */}
              <TabsContent value="rankings" className="mt-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-cyan-400">Rank</TableHead>
                        <TableHead className="text-cyan-400">Participant</TableHead>
                        <TableHead className="text-cyan-400">Score</TableHead>
                        <TableHead className="text-cyan-400">Time</TableHead>
                        <TableHead className="text-cyan-400">Accuracy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedSubmissions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-gray-400 py-8">
                            {loading ? 'Loading...' : 'No submissions to rank yet'}
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedSubmissions.map((submission, index) => {
                          const accuracy = Math.round((submission.score / 100) * 100);
                          return (
                            <TableRow key={index} className="border-slate-800">
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {index === 0 && <Trophy className="w-5 h-5 text-yellow-400" />}
                                  {index === 1 && <Trophy className="w-5 h-5 text-gray-400" />}
                                  {index === 2 && <Trophy className="w-5 h-5 text-orange-600" />}
                                  <span className="text-cyan-300 font-bold">#{index + 1}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-gray-300">{submission.username}</TableCell>
                              <TableCell>
                                <span className="text-cyan-300 font-semibold">
                                  {submission.score} / 100
                                </span>
                              </TableCell>
                              <TableCell className="text-gray-400">
                                {formatTime(submission.timeTaken)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={
                                    accuracy >= 80
                                      ? 'border-green-500/50 text-green-400'
                                      : accuracy >= 50
                                      ? 'border-yellow-500/50 text-yellow-400'
                                      : 'border-red-500/50 text-red-400'
                                  }
                                >
                                  {accuracy}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
