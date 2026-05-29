import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageSEO } from "@/components/SEO";

type InviteStatus = "pending" | "success" | "not_installed" | "error";

const EXTENSION_IDS = [
  "dpjnneeknnpjcnphfahhcofciocedggp",
  "hicolllfnljafaojmdgclbhpbaelfbog",
  "bjeiiojohhdpnginpigmlijlofdabdgl",
];

const STORE_URL =
  "https://chromewebstore.google.com/detail/nocodext-for-bubble/dpjnneeknnpjcnphfahhcofciocedggp";

function sendToken(
  token: string,
  onSuccess: () => void,
  onNotFound: () => void
) {
  const chrome = (window as any).chrome;
  if (!chrome?.runtime?.sendMessage) {
    onNotFound();
    return;
  }
  let index = 0;
  const attempt = () => {
    if (index >= EXTENSION_IDS.length) {
      onNotFound();
      return;
    }
    chrome.runtime.sendMessage(
      EXTENSION_IDS[index],
      { type: "INVITATION_TOKEN", token },
      (response: any) => {
        if (chrome.runtime.lastError || !response?.success) {
          index++;
          attempt();
        } else {
          onSuccess();
        }
      }
    );
  };
  attempt();
}

const BubbleInvite = () => {
  const [status, setStatus] = useState<InviteStatus>("pending");
  const [searchParams] = useSearchParams();
  const retryRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tokenRef = useRef<string | null>(null);

  function stopPolling() {
    if (retryRef.current) {
      clearInterval(retryRef.current);
      retryRef.current = null;
    }
  }

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }
    tokenRef.current = token;

    sendToken(
      token,
      () => setStatus("success"),
      () => {
        setStatus("not_installed");
        // Poll every 2 s — detects extension install without page reload
        retryRef.current = setInterval(() => {
          sendToken(
            token,
            () => {
              stopPolling();
              setStatus("success");
            },
            () => {}
          );
        }, 2000);
        // Stop after 90 s regardless
        setTimeout(stopPolling, 90_000);
      }
    );

    return stopPolling;
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <PageSEO
        title="Bubble Invite - Nocodext"
        description="Activate your Nocodext for Bubble invitation."
        pathname="/bubble-invite"
        noindex
      />
      <div className="text-center p-8 max-w-md space-y-4">
        {status === "pending" && (
          <p className="text-lg text-foreground animate-pulse">
            Activation de votre invitation…
          </p>
        )}

        {status === "success" && (
          <>
            <p className="text-lg text-foreground">
              Invitation activée ! L'extension Nocodext s'est ouverte dans votre
              éditeur Bubble. Vous pouvez fermer cet onglet.
            </p>
            <a
              href="https://bubble.io"
              className="inline-block text-sm text-primary underline"
            >
              Ouvrir Bubble →
            </a>
          </>
        )}

        {status === "not_installed" && (
          <>
            <p className="text-lg text-foreground">
              Nocodext n'est pas encore installé.
            </p>
            <p className="text-sm text-muted-foreground">
              Installez l'extension, puis revenez sur cet onglet — l'activation
              reprendra automatiquement.
            </p>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Installer Nocodext →
            </a>
          </>
        )}

        {status === "error" && (
          <p className="text-lg text-destructive">
            Lien d'invitation invalide ou expiré.
          </p>
        )}
      </div>
    </div>
  );
};

export default BubbleInvite;
