import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Shield, Star, Sparkles, Gem } from "lucide-react";
import type { UserOverview as UserOverviewType } from "@/lib/schemas";

interface UserOverviewProps {
  data: UserOverviewType;
}

export function UserOverview({ data }: UserOverviewProps) {
  const { experienceLevel, riskTolerance, preferredAssets } = data;

  const getExperienceIcon = () => {
    switch (experienceLevel) {
      case "beginner":
        return <Star className="h-4 w-4 text-amber-400" />;
      case "intermediate":
        return <Sparkles className="h-4 w-4 text-cyan-500" />;
      case "advanced":
        return <Gem className="h-4 w-4 text-purple-500" />;
      default:
        return <Star className="h-4 w-4 text-amber-400" />;
    }
  };

  const getRiskColor = () => {
    switch (riskTolerance) {
      case "low":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "high":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-indigo-500">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-transparent">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-indigo-500" />
          <CardTitle>User Profile</CardTitle>
        </div>
        <CardDescription>Trading preferences and experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <p className="text-sm font-medium">Experience</p>
            </div>
            <div className="flex items-center gap-2">
              {getExperienceIcon()}
              <Badge variant="outline" className="capitalize">
                {experienceLevel}
              </Badge>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-indigo-500" />
              <p className="text-sm font-medium">Risk Tolerance</p>
            </div>
            <Badge className={`capitalize ${getRiskColor()}`}>
              {riskTolerance}
            </Badge>
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Star className="h-4 w-4 text-amber-400" />
            Preferred Assets
          </p>
          <div className="flex flex-wrap gap-2">
            {preferredAssets.map((asset) => (
              <Badge
                key={asset}
                variant="secondary"
                className="bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700"
              >
                {asset}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
