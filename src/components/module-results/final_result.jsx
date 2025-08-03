import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Award,
  BarChart3,
  Star,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { Button } from "../ui/button";

const FinalScore = ({ moduleProgress, finalScore = 0 }) => {
  const allModulesCompleted =
    moduleProgress.module1 && moduleProgress.module2 && moduleProgress.module3;

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Get score category text
  const getScoreCategory = (score) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 75) return "Good Match";
    if (score >= 60) return "Fair Match";
    return "Needs Improvement";
  };

  return (
    <Card
      className={`w-full max-w-lg ${!allModulesCompleted ? "opacity-60" : ""}`}
    >
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          {allModulesCompleted ? (
            <Trophy className="w-6 h-6 text-yellow-500" />
          ) : (
            <Target className="w-6 h-6 text-gray-400" />
          )}
          <CardTitle className="text-xl">Overall Job Match Score</CardTitle>
        </div>
        <CardDescription>
          {allModulesCompleted
            ? "Based on comprehensive analysis of all modules"
            : "Complete all modules to see your final score"}
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        {allModulesCompleted ? (
          <div className="space-y-6">
            {/* Score Display */}
            <span className="disp">
              <div className={`text-6xl font-bold  mb-2`}>{finalScore}</div>
              <div className="text-2xl text-muted-foreground font-medium">
                / 100
              </div>
            </span>

            {/* Score Breakdown */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <BarChart3 className="w-4 h-4 " />
                </div>
                <div className="text-sm text-muted-foreground">GitHub</div>
                <div className="font-semibold">85/100</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Target className="w-4 h-4" />
                </div>
                <div className="text-sm text-muted-foreground">Skills</div>
                <div className="font-semibold">92/100</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-4 h-4 " />
                </div>
                <div className="text-sm text-muted-foreground">Personality</div>
                <div className="font-semibold">88/100</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">
              Complete all assessment modules to see your final job matching
              score
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <div
                className={`w-3 h-3 rounded-full ${
                  moduleProgress.module1 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <span>GitHub Analysis</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  moduleProgress.module2 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <span>Skills Assessment</span>
              <div
                className={`w-3 h-3 rounded-full ${
                  moduleProgress.module3 ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
              <span>Personality</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinalScore;
