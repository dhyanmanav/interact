import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Trophy, Clock, Target, Terminal } from 'lucide-react';

interface Submission {
  participantId: string;
  answers: (number | null)[];
  score: number;
  timeTaken: number;
  submittedAt: number;
  status: string;
}

export function Results() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubmissions();
    const interval = setInterval(loadSubmissions, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadSubmissions = () => {
    const allSubmissions = JSON.parse(localStorage.getItem('all_submissions') || '[]');
    const sorted = allSubmissions.sort((a: Submission, b: Submission) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.timeTaken - b.timeTaken;
    });
    setSubmissions(sorted);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-purple-500/30 bg-slate-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-8 h-8 text-purple-400" />
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    RESULTS DASHBOARD
                  </h1>
                  <p className="text-sm text-gray-400">INTERACT 2026 - DEBUG THE BUG</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-950/50 border border-purple-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <p className="text-gray-400 text-sm">Total Submissions</p>
              </div>
              <p className="text-3xl font-bold text-purple-300">{submissions.length}</p>
            </div>

            <div className="bg-slate-950/50 border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-cyan-400" />
                <p className="text-gray-400 text-sm">Highest Score</p>
              </div>
              <p className="text-3xl font-bold text-cyan-300">
                {submissions.length > 0 ? submissions[0].score : 0} / 100
              </p>
            </div>

            <div className="bg-slate-950/50 border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-green-400" />
                <p className="text-gray-400 text-sm">Fastest Time</p>
              </div>
              <p className="text-3xl font-bold text-green-300">
                {submissions.length > 0 ? formatTime(Math.min(...submissions.map(s => s.timeTaken))) : '0m 0s'}
              </p>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-slate-950/50 border border-purple-500/30 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-purple-500/30">
              <h2 className="text-xl font-semibold text-purple-300 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Leaderboard
              </h2>
            </div>

            {submissions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400">No submissions yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-purple-500/30 hover:bg-transparent">
                      <TableHead className="text-purple-300">Rank</TableHead>
                      <TableHead className="text-purple-300">Participant ID</TableHead>
                      <TableHead className="text-purple-300">Score</TableHead>
                      <TableHead className="text-purple-300">Time Taken</TableHead>
                      <TableHead className="text-purple-300">Submitted At</TableHead>
                      <TableHead className="text-purple-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission, index) => (
                      <TableRow key={index} className="border-purple-500/30 hover:bg-purple-500/5">
                        <TableCell className="font-medium">
                          {index === 0 && <Trophy className="w-5 h-5 text-yellow-400 inline mr-2" />}
                          {index === 1 && <Trophy className="w-5 h-5 text-gray-400 inline mr-2" />}
                          {index === 2 && <Trophy className="w-5 h-5 text-orange-600 inline mr-2" />}
                          <span className="text-cyan-300">{index + 1}</span>
                        </TableCell>
                        <TableCell className="text-gray-300">{submission.participantId}</TableCell>
                        <TableCell>
                          <span className="text-cyan-300 font-semibold">{submission.score}</span>
                          <span className="text-gray-500"> / 100</span>
                        </TableCell>
                        <TableCell className="text-gray-300">{formatTime(submission.timeTaken)}</TableCell>
                        <TableCell className="text-gray-400 text-sm">{formatDate(submission.submittedAt)}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {submission.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
