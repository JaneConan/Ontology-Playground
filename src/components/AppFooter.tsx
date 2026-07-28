import { Sparkles } from 'lucide-react';

export function AppFooter() {
  const deployedCommitSha = import.meta.env.VITE_DEPLOYED_COMMIT_SHA;
  const shortCommit = deployedCommitSha ? deployedCommitSha.slice(0, 7) : null;

  return (
    <footer className="app-footer">
      <span className="app-footer-credit">
        <Sparkles size={14} />
        Built with GitHub Copilot
      </span>
      <span className="app-footer-sep">&middot;</span>
      <span className="app-footer-credit">
        Supervised by videlalvaro
      </span>
      {shortCommit && (
        <>
          <span className="app-footer-sep">&middot;</span>
          <span title={deployedCommitSha}>Deployed commit {shortCommit}</span>
        </>
      )}
    </footer>
  );
}
