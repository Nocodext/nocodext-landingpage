import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type InviteStatus = "pending" | "success" | "not_installed" | "error";

const EXTENSION_IDS = [
  "dpjnneeknnpjcnphfahhcofciocedggp",
  "hicolllfnljafaojmdgclbhpbaelfbog",
  "bjeiiojohhdpnginpigmlijlofdabdgl",
];

const BubbleInvite = () => {
  const [status, setStatus] = useState<InviteStatus>("pending");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    const tryExtension = (index: number) => {
      if (index >= EXTENSION_IDS.length) {
        setStatus("not_installed");
        return;
      }

      const chrome = (window as any).chrome;
      if (!chrome?.runtime?.sendMessage) {
        setStatus("not_installed");
        return;
      }

      chrome.runtime.sendMessage(
        EXTENSION_IDS[index],
        { type: "INVITATION_TOKEN", token },
        (response: any) => {
          if (chrome.runtime.lastError || !response?.success) {
            tryExtension(index + 1);
          } else {
            setStatus("success");
          }
        }
      );
    };

    tryExtension(0);
  }, [searchParams]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        window.location.href = "https://nocodext.com";
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (status === "not_installed") {
      const timer = setTimeout(() => {
        window.location.href =
          "https://chromewebstore.google.com/detail/nocodext-for-bubble/dpjnneeknnpjcnphfahhcofciocedggp";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        {status === "pending" && (
          <p className="text-lg text-foreground animate-pulse">
            Activation de votre invitation…
          </p>
        )}
        {status === "success" && (
          <p className="text-lg text-foreground">
            Votre invitation est activée ! L'extension Nocodext vient de
            s'ouvrir dans votre éditeur Bubble. Vous pouvez fermer cet onglet.
          </p>
        )}
        {status === "not_installed" && (
          <p className="text-lg text-foreground">
            Il semble que Nocodext ne soit pas encore installé. Redirection vers
            le Chrome Web Store…
          </p>
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
