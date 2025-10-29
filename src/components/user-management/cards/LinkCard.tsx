import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import { Button } from "@/components/ui/button";
import { Button } from "@mui/material";

type LinkCardLayoutProps = {
  groupType?: React.ReactNode;
  image?: React.ReactNode;
  //   sx?: {
  //     card?: SxProps<Theme>;
  //     content?: SxProps<Theme>;
  //   };
};

export default function ShowGroupsLinkCard({ groupType }: LinkCardLayoutProps) {
  return (
    <Card sx={{ width: 300, marginX: 2 }}>
      <CardMedia
        sx={{ height: 240, objectFit: "contain" }}
        image={
          groupType === "analyst"
            ? "https://cdn-icons-png.flaticon.com/512/4552/4552937.png"
            : "https://cdn-icons-png.flaticon.com/512/4552/4552976.png"
        }
        title="green iguana"
      />
      <CardContent>
        {groupType === "analyst" && (
          <Typography gutterBottom variant="h5" component="div">
            Analyst Groups
          </Typography>
        )}
        {groupType === "investigator" && (
          <Typography gutterBottom variant="h5" component="div">
            Investigators Groups
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary">
          <b>Total Groups:</b> 5
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={"/admin/group-management/view-group?type=" + groupType}
        >
          SHOW {groupType?.toString().toUpperCase()} GROUPS
        </Button>
      </CardActions>
    </Card>
  );
}
