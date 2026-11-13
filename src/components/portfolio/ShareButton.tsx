import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { profile } from "@/lib/DynamicValues";

/** Uses the native share sheet where available, otherwise copies the URL. */
const ShareButton = () => {
  const { toast } = useToast();

  const onShare = async () => {
    const url = window.location.href.split("#")[0];
    const data = { title: `${profile.name} — ${profile.role}`, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied", description: "The portfolio URL is on your clipboard." });
    } catch (err) {
      if ((err as DOMException)?.name !== "AbortError") {
        toast({ title: "Couldn't share", description: url });
      }
    }
  };

  return (
    <Button variant="ghost" size="icon" onClick={onShare} aria-label="Share this portfolio" title="Share">
      <Share2 className="size-4" />
    </Button>
  );
};

export default ShareButton;
