
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';

const options: Partial<SimpleGitOptions> = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

export async function initRepo({repoUrl}: {repoUrl: string}){
    

}