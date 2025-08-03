import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, Code, FileText, Lock } from "lucide-react";
import React from "react";

const Module1Results = ({ moduleProgress }) => {
  return (
    <Card
      className={`w-full ${
        !moduleProgress.module1 ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code
              className={`w-5 h-5 ${
                moduleProgress.module1 ? "text-primary" : "text-gray-400"
              }`}
            />
            <CardTitle className="text-lg">GitHub Analysis</CardTitle>
          </div>
          {!moduleProgress.module1 && (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
        </div>
        <CardDescription>
          Coding ability and technical skills assessment from GitHub profile
        </CardDescription>
      </CardHeader>
      <CardContent>
        {moduleProgress.module1 ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm">Coding Score: 85/100</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm">Top Languages: JavaScript, Python</span>
            </div>
            <Button className="w-full mt-4">View Detailed Report</Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Complete Module 1 to unlock results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Module1Results;
