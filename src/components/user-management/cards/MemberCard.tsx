import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@mui/material";

export default function MemberCard({
  id,
  name,
  role,
}: {
  id: string;
  name: string;
  role: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card key={id} className="overflow-hidden shadow-2xl hover:bg-muted">
        <CardHeader className="">
          <div className="flex items-center space-x-4">
            <Avatar
              src={"https://uko-react.vercel.app/static/avatar/003-boy.svg"}
              variant="circular"
            />
            <div className="flex w-full justify-between">
              <div className="flex-col">
                <CardTitle>{name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  <span className="font-mono">{id}</span>
                </p>
              </div>
              <Badge variant="outline" className="mt-1">
                {role}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <hr></hr>
      </Card>
    </div>
  );
}
