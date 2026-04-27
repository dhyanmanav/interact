import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { CheckCircle, Trophy, Clock, Target, Home } from 'lucide-react';

export function SubmissionSuccess() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [participantId, setParticipantId] = useState('');

  useEffect(() => {
    const testData = localStorage.getItem('test_completed');
    const pid = localStorage.getItem('participant_id');

    if (!testData) {
      navigate('/', { replace: true });
      return;
    }

    const parsed = JSON.parse(testData);
    setScore(parsed.score || 0);
    setTimeTaken(parsed.timeTaken || 0);
    setParticipantId(pid || '');
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative w-full max-w-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-lg blur-xl opacity-25"></div>

        <div className="relative bg-slate-950 border border-green-500/30 rounded-lg p-8 md:p-12 shadow-2xl">
          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-green-500/10 border-2 border-green-500 rounded-full p-6">
                <CheckCircle className="w-16 h-16 text-green-400" />
              </div>
            </div>
          </div>

          {/* Success message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-3">
              Test Completed!
            </h1>
            <p className="text-gray-300 text-lg mb-2">
              Your test has been submitted successfully.
            </p>
            <p className="text-yellow-400 text-sm font-semibold mb-4">
              You cannot retake this test
            </p>
            <p className="text-gray-400 text-sm">
              Participant ID: <span className="text-cyan-300 font-mono">{participantId}</span>
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-cyan-400" />
                <p className="text-gray-400 text-sm">Your Score</p>
              </div>
              <p className="text-3xl font-bold text-cyan-300">
                {score} <span className="text-lg text-gray-400">/ 100</span>
              </p>
            </div>

            <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-blue-400" />
                <p className="text-gray-400 text-sm">Time Taken</p>
              </div>
              <p className="text-3xl font-bold text-blue-300">
                {formatTime(timeTaken)}
              </p>
            </div>
          </div>

          {/* Info box */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Trophy className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-300 font-semibold mb-1">What's Next?</p>
                <ul className="text-blue-200/80 text-sm space-y-1">
                  <li>• Your submission has been recorded</li>
                  <li>• Results will be announced by event organizers</li>
                  <li>• Check with admin for final rankings</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Home button */}
          <Button
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white font-semibold py-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>

          {/* Footer note */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Thank you for participating in DEBUG THE BUG - INTERACT 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
