import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { questionsData } from '../data/questions';
import { Button } from '../components/ui/button';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight, Send, Clock } from 'lucide-react';

export function TestInterface() {
  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questionsData.length).fill(null));
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime] = useState(Date.now());
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [participantId] = useState(() => {
    // Generate or retrieve unique participant ID
    let id = localStorage.getItem('participant_id');
    if (!id) {
      id = `P${Date.now().toString(36).toUpperCase()}`;
      localStorage.setItem('participant_id', id);
    }
    return id;
  });
  const hasSubmitted = useRef(false);
  const submittingRef = useRef(false);

  const currentQuestion = questionsData[currentQuestionIndex];

  // Auto-submit function
  const autoSubmit = useCallback(async () => {
    if (hasSubmitted.current || submittingRef.current) return;

    hasSubmitted.current = true;
    submittingRef.current = true;

    const score = answers.reduce((total, answer, index) => {
      if (answer === questionsData[index].correct_answer) {
        return total + questionsData[index].points;
      }
      return total;
    }, 0);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    // Save submission to localStorage
    const submission = {
      participantId,
      answers,
      score,
      timeTaken,
      submittedAt: Date.now(),
      status: 'submitted',
    };

    // Save individual test completion
    localStorage.setItem('test_completed', JSON.stringify({
      status: 'completed',
      score,
      timeTaken,
      submittedAt: Date.now(),
    }));

    // Save to all submissions
    const allSubmissions = JSON.parse(localStorage.getItem('all_submissions') || '[]');
    allSubmissions.push(submission);
    localStorage.setItem('all_submissions', JSON.stringify(allSubmissions));

    navigate('/success', { replace: true });
  }, [answers, startTime, navigate, participantId]);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Auto-submit on tab switch/page leave - IMMEDIATE SUBMIT
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !hasSubmitted.current) {
        autoSubmit();
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!hasSubmitted.current) {
        autoSubmit();
      }
    };

    const handleBlur = () => {
      if (!hasSubmitted.current) {
        // Small delay to check if truly leaving
        setTimeout(() => {
          if (document.hidden && !hasSubmitted.current) {
            autoSubmit();
          }
        }, 100);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
      window.removeEventListener('blur', handleBlur);
    };
  }, [autoSubmit]);

  // Check if test already completed
  useEffect(() => {
    const testCompleted = localStorage.getItem('test_completed');
    if (testCompleted) {
      navigate('/success', { replace: true });
    }
  }, [navigate]);

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = parseInt(value);
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setShowSubmitDialog(true);
  };

  const confirmSubmit = async () => {
    await autoSubmit();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>

      <div className="relative flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-cyan-500/30 bg-slate-950/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-cyan-400">DEBUG THE BUG</h1>
                <p className="text-sm text-gray-400">Participant: {participantId}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-2">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-300 font-mono text-lg">{formatTime(timeElapsed)}</span>
                </div>
                <div className="text-sm text-gray-400">
                  Progress: <span className="text-cyan-300 font-semibold">{answeredCount}</span> / {questionsData.length}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {/* Question Card */}
            <div className="bg-slate-950/50 border border-cyan-500/30 rounded-lg p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 rounded-lg px-4 py-2 font-bold">
                    Question {currentQuestionIndex + 1}
                  </div>
                  <div className="bg-blue-500/20 text-blue-400 border border-blue-500/50 rounded-lg px-3 py-1 text-sm">
                    {currentQuestion.difficulty}
                  </div>
                  <div className="bg-purple-500/20 text-purple-400 border border-purple-500/50 rounded-lg px-3 py-1 text-sm">
                    {currentQuestion.language}
                  </div>
                  <div className="bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg px-3 py-1 text-sm">
                    {currentQuestion.points} points
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-white mb-6">{currentQuestion.title}</h2>

              <div className="bg-slate-900 border border-gray-700 rounded-lg p-6 mb-8">
                <pre className="text-gray-300 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
                  <code>{currentQuestion.code}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <p className="text-gray-400 mb-4 font-semibold">What will be the output?</p>
                <RadioGroup value={answers[currentQuestionIndex]?.toString() || ''} onValueChange={handleAnswerChange}>
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-colors"
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 text-gray-300 cursor-pointer text-base"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </Button>

              {currentQuestionIndex === questionsData.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="bg-slate-950 border-cyan-500/30">
          <DialogHeader>
            <DialogTitle className="text-cyan-300">Submit Test?</DialogTitle>
            <DialogDescription className="text-gray-400">
              You have answered {answeredCount} out of {questionsData.length} questions.
              Are you sure you want to submit your test?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="border-gray-600">
              Cancel
            </Button>
            <Button
              onClick={confirmSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
