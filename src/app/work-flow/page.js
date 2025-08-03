"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Code,
  Rocket,
  CheckCircle,
  Play,
  Users,
  Target,
  Lightbulb,
  Settings,
  Database,
  Brain,
  User,
  Lock,
  FileText,
  BarChart3,
  Heart,
} from "lucide-react";
import Tab1ModuleContent from "@/components/tab-contents/module_1/module_1_tab_content";
import Tab2ModuleContent from "@/components/tab-contents/module_2/module_2_tab_content";
import Tab3ModuleContent from "@/components/tab-contents/module_3/module_3_tab_content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Module1Results from "@/components/module-results/module_1/module_1_results";
import Module2Results from "@/components/module-results/module_2/module_2_results";
import Module3Results from "@/components/module-results/module_3/module_3_results";
import FinalScore from "@/components/module-results/final_result";

export default function workflowPage() {
  const [moduleProgress, setModuleProgress] = useState({
    module1: true, // Set to true when Module 1 is completed
    module2: true, // Set to true when Module 2 is completed
    module3: true, // Set to true when Module 3 is completed
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Workflow
        </h1>
        <p className="text-muted-foreground text-lg">
          Experience our AI-powered job matching research demo
        </p>
      </div>

      <Tabs defaultValue="module1" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="module1" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Module 1
          </TabsTrigger>
          <TabsTrigger value="module2" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Module 2
          </TabsTrigger>
          <TabsTrigger value="module3" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Module 3
          </TabsTrigger>
        </TabsList>

        <Tab1ModuleContent />
        <Tab2ModuleContent />
        <Tab3ModuleContent />
      </Tabs>

      {/* Module Output Section */}
      <div className="mt-12">
        <div className="mb-6 text-center">
          <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
            Module Wise Output
          </h2>
          <p className="text-muted-foreground">
            View the results and insights from each analysis module
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Module 1 Output Card - GitHub Profile Analysis */}
          <Module1Results moduleProgress={moduleProgress} />

          {/* Module 2 Output Card - Technical & Soft Skills */}
          <Module2Results moduleProgress={moduleProgress} />

          {/* Module 3 Output Card - Personality & Behavior */}
          <Module3Results moduleProgress={moduleProgress} />
        </div>
      </div>

      {/* Overall Output Section */}
      <div className="mt-12">
        <div className="mb-6 text-center">
          <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight">
            Final Score
          </h1>
          <p className="text-muted-foreground">
            Comprehensive analysis score based on all three modules
          </p>
        </div>
        <div className="flex justify-center">
          <FinalScore moduleProgress={moduleProgress} finalScore={85} />
        </div>
      </div>
    </div>
  );
}
