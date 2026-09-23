import { ShieldCheck, Bug, Rat, BedDouble, CloudFog, Building2 } from "lucide-react";

export function ServiceIcon({ icon, className = "h-6 w-6" }: { icon: string; className?: string }) {
  switch (icon) {
    case "termite":
      return <Bug className={className} />;
    case "rodent":
      return <Rat className={className} />;
    case "bedbug":
      return <BedDouble className={className} />;
    case "mosquito":
      return <CloudFog className={className} />;
    case "commercial":
      return <Building2 className={className} />;
    default:
      return <ShieldCheck className={className} />;
  }
}
