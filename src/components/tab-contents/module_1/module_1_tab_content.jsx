import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Code, Play, Target } from "lucide-react";
import React from "react";

const Tab1ModuleContent = () => {
  return (
    <TabsContent value="module1" className="space-y-6">
      <div className="border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">
            Module 1: GitHub Profile Analysis
          </h2>
        </div>
        <p className="text-muted-foreground mb-6">
          Build your fundamental understanding with core concepts and
          principles.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Learning Objectives</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Understand basic principles</li>
              <li>• Master fundamental concepts</li>
              <li>• Apply theoretical knowledge</li>
            </ul>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Progress Tracking</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completion</span>
                <span>0%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-0"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:flex-row mt-6">
          <Button size="sm">
            <Play /> Next Module
          </Button>
        </div>
      </div>
    </TabsContent>
  );
};

export default Tab1ModuleContent;
