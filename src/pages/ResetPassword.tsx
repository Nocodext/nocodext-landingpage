import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { updatePassword } from "@/lib/auth";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"form" | "success" | "error">("form");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();


  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await updatePassword(newPassword);
    
    if (error) {
      setErrorMessage(error.message);
      setStatus("error");
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setStatus("success");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <Card className="border-0 bg-card/50">
          {status === "success" ? (
            <CardContent className="pt-6">
              <Alert variant="success">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle className="font-inter">Mot de passe mis à jour !</AlertTitle>
                <AlertDescription className="font-inter">
                  Votre nouveau mot de passe est maintenant actif. Vous pouvez fermer cet onglet.
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => window.close()}
                className="w-full mt-4 font-inter"
                variant="outline"
              >
                Fermer l'onglet
              </Button>
            </CardContent>
          ) : status === "error" ? (
            <CardContent className="pt-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="font-inter">Erreur</AlertTitle>
                <AlertDescription className="font-inter">
                  {errorMessage}
                </AlertDescription>
              </Alert>
              <Button
                onClick={() => setStatus("form")}
                className="w-full mt-4 font-inter"
                variant="outline"
              >
                Réessayer
              </Button>
            </CardContent>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="font-inter">Set New Password</CardTitle>
                <CardDescription className="font-inter">Enter your new password below</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full font-inter" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;