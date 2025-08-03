import axiosInstance from "@/lib/axios";

export default async function getGithubRepos(githubUsername) {
  try {
    const response = await axiosInstance.get(
      `api/github_repos?username=${githubUsername}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get GitHub repositories"
    );
  }
}
