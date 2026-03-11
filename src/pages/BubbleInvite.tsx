import { useEffect } from "react";

const BubbleInvite = () => {
  useEffect(() => {
    // === COLLE TON CODE JAVASCRIPT ICI ===
    
    console.log("BubbleInvite page loaded - prêt à exécuter du code");
    
    // === FIN DU CODE ===
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold text-foreground mb-4">Invitation</h1>
        <p className="text-muted-foreground">Traitement en cours...</p>
      </div>
    </div>
  );
};

export default BubbleInvite;
