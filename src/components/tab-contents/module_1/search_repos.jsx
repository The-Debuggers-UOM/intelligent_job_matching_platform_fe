"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import getGithubRepos from "@/services/module1-service";
import { AlertCircle, ExternalLink, GitBranch, Loader2 } from "lucide-react";
import React, { useState } from "react";

const SearchRepos = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchRepos = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchPerformed(false);

    try {
      const result = await getGithubRepos(username.trim());
      setRepos(result.filtered_repos || []);
      setSearchPerformed(true);
    } catch (err) {
      setError(err.message);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchRepos();
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: "bg-yellow-500",
      Java: "bg-red-500",
    };
    return colors[language] || "bg-gray-500";
  };

  return (
    <>
      <div className="flex w-full items-center gap-2 mb-6">
        <Input
          type="text"
          placeholder="GitHub Username (e.g., johndoe)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleSearchRepos}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <GitBranch className="w-4 h-4 mr-2" />
              Search Repos
            </>
          )}
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Repositories Display */}
      {searchPerformed && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">
              Found {repos.length} repositories
            </h3>
          </div>

          {repos.length > 0 ? (
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
              {repos.map((repo, index) => (
                <li key={index} className="hover:shadow-md transition-shadow">
                  {repo.name} - {repo.language || "Unknown"}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <GitBranch className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No repositories found for this user.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchRepos;
