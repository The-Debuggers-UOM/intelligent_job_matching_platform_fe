"use client";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  CheckCircle,
  Play,
  Target,
  Video,
  StopCircle,
  Clock,
  Settings,
  AlertCircle,
  Camera,
  Mic,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const Tab2ModuleContent = () => {
  // Assessment setup state
  const [currentStep, setCurrentStep] = useState("setup"); // 'setup', 'guidelines', 'assessment', 'completed'
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  // Assessment state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionType, setCurrentQuestionType] = useState("technical"); // 'technical', 'soft'
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState({
    technical: [],
    soft: [],
  });

  // Camera and recording refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  // Technical skills options
  const technicalSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "Spring Boot",
    "SQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Kubernetes",
    "Git",
    "HTML/CSS",
    "TypeScript",
    "Angular",
  ];

  // Experience levels
  const experienceLevels = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5+ years)" },
    { value: "lead", label: "Lead/Architect (8+ years)" },
  ];

  // Sample questions (you can modify these)
  const questions = {
    technical: [
      "Explain the concept of closures in JavaScript and provide an example.",
      "How would you optimize a slow-performing SQL query?",
      "Describe the difference between REST and GraphQL APIs.",
      "What are the key principles of microservices architecture?",
      "How do you handle state management in React applications?",
    ],
    soft: [
      "Describe a challenging project you worked on and how you overcame obstacles.",
      "How do you handle conflicts within a team?",
      "Tell us about a time when you had to learn a new technology quickly.",
      "How do you prioritize tasks when working on multiple projects?",
      "Describe your approach to giving and receiving feedback.",
    ],
  };

  // Guidelines for assessment
  const guidelines = [
    "Ensure you are in a quiet, well-lit environment",
    "Your camera and microphone will be activated for each question",
    "You have exactly 30 seconds to answer each question",
    "Speak clearly and look directly at the camera",
    "There are 5 technical questions and 5 soft skill questions",
    "Take a moment to think before answering",
    "Be concise but comprehensive in your responses",
  ];

  // Handle skill selection
  const handleSkillToggle = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // Start camera and recording
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
      throw error;
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await startCamera();
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const videoUrl = URL.createObjectURL(blob);

        setRecordings((prev) => ({
          ...prev,
          [currentQuestionType]: [
            ...prev[currentQuestionType],
            {
              questionIndex: currentQuestionIndex,
              videoUrl,
              blob,
            },
          ],
        }));

        stopCamera();
        moveToNextQuestion();
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Start 30-second timer
      setTimeLeft(30);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  // Move to next question
  const moveToNextQuestion = () => {
    if (currentQuestionType === "technical" && currentQuestionIndex < 4) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (
      currentQuestionType === "technical" &&
      currentQuestionIndex === 4
    ) {
      setCurrentQuestionType("soft");
      setCurrentQuestionIndex(0);
    } else if (currentQuestionType === "soft" && currentQuestionIndex < 4) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentStep("completed");
    }
  };

  // Start assessment
  const startAssessment = () => {
    if (selectedSkills.length === 0 || !experienceLevel) {
      return;
    }
    setCurrentStep("guidelines");
  };

  // Progress calculation
  const totalQuestions = 10;
  const completedQuestions =
    recordings.technical.length + recordings.soft.length;
  const progress = (completedQuestions / totalQuestions) * 100;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <TabsContent value="module2" className="space-y-6">
      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">
            Module 2: Technical & Soft Skill Assessment
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Build your fundamental understanding with core concepts and
          principles.
        </p>

        {/* Setup Step */}
        {currentStep === "setup" && (
          <>
            <p className="text-muted-foreground mb-6">
              Select your technical skills and experience level to begin the
              video assessment.
            </p>

            <div className="space-y-6">
              {/* Technical Skills Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Technical Skills
                  </CardTitle>
                  <CardDescription>
                    Select all technologies you have experience with
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {technicalSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={selectedSkills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Level Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Experience Level
                  </CardTitle>
                  <CardDescription>
                    Select your overall experience level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={experienceLevel}
                    onValueChange={setExperienceLevel}
                  >
                    {experienceLevels.map((level) => (
                      <div
                        key={level.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem value={level.value} id={level.value} />
                        <Label htmlFor={level.value}>{level.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              <Button
                onClick={startAssessment}
                disabled={selectedSkills.length === 0 || !experienceLevel}
                className="w-full"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Assessment
              </Button>
            </div>
          </>
        )}

        {/* Guidelines Step */}
        {currentStep === "guidelines" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Assessment Guidelines
                </CardTitle>
                <CardDescription>
                  Please read these guidelines carefully before starting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-600" />
                      <span className="text-sm">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep("setup")}>
                Back to Setup
              </Button>
              <Button onClick={() => setCurrentStep("assessment")}>
                <Camera className="w-4 h-4 mr-2" />
                Begin Assessment
              </Button>
            </div>
          </>
        )}

        {/* Assessment Step */}
        {currentStep === "assessment" && (
          <>
            <div className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress: {completedQuestions}/10 questions</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Current Question */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>
                      {currentQuestionType === "technical"
                        ? "Technical"
                        : "Soft Skill"}{" "}
                      Question {currentQuestionIndex + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span
                        className={`font-mono ${
                          timeLeft <= 10 ? "text-red-600" : ""
                        }`}
                      >
                        {timeLeft}s
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">
                    {questions[currentQuestionType][currentQuestionIndex]}
                  </p>

                  {/* Video Preview */}
                  <div className="mb-4">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full max-w-md mx-auto rounded-lg border"
                      style={{ display: isRecording ? "block" : "none" }}
                    />
                  </div>

                  {!isRecording ? (
                    <Button onClick={startRecording} className="w-full">
                      <Video className="w-4 h-4 mr-2" />
                      Start Recording (30s)
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Alert>
                        <Mic className="h-4 w-4" />
                        <AlertDescription>
                          Recording in progress... Speak clearly and look at the
                          camera.
                        </AlertDescription>
                      </Alert>
                      <Button
                        onClick={stopRecording}
                        variant="destructive"
                        className="w-full"
                      >
                        <StopCircle className="w-4 h-4 mr-2" />
                        Stop Recording Early
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Completed Step */}
        {currentStep === "completed" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Assessment Completed!
                </CardTitle>
                <CardDescription>
                  You have successfully completed all 10 questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {recordings.technical.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Technical Questions
                      </div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {recordings.soft.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Soft Skill Questions
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Play className="w-4 h-4 mr-2" />
                    Proceed to Next Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </TabsContent>
  );
};

export default Tab2ModuleContent;
