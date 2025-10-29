import { CameraStatus } from "@/lib/dtos/camera.dto";
import {
  Box,
  Card,
  CardContent,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

interface CameraStatusCardProps {
  status: CameraStatus;
  count: number;
}

const getStatusConfig = (status: CameraStatus, theme: Theme) => {
  switch (status) {
    case CameraStatus.Online:
      return {
        label: "Online",
        color: theme.palette.success.main,
        bgColor: alpha(theme.palette.success.main, 0.1),
        textColor: theme.palette.success.main,
        borderColor: alpha(theme.palette.success.main, 0.3),
      };
    case CameraStatus.Offline:
      return {
        label: "Offline",
        color: theme.palette.error.main,
        bgColor: alpha(theme.palette.error.main, 0.1),
        textColor: theme.palette.error.main,
        borderColor: alpha(theme.palette.error.main, 0.3),
      };
    case CameraStatus.Maintenance:
      return {
        label: "Maintenance",
        color: theme.palette.warning.main,
        bgColor: alpha(theme.palette.warning.main, 0.1),
        textColor: theme.palette.warning.main,
        borderColor: alpha(theme.palette.warning.main, 0.3),
      };
    default:
      return {
        label: "Unknown",
        color: theme.palette.text.secondary,
        bgColor: alpha(theme.palette.text.secondary, 0.05),
        textColor: theme.palette.text.secondary,
        borderColor: alpha(theme.palette.text.secondary, 0.2),
      };
  }
};

export default function CameraStatusCard({
  status,
  count,
}: CameraStatusCardProps) {
  const theme = useTheme();
  const config = getStatusConfig(status, theme);

  return (
    <Card
      sx={{
        backgroundColor: config.bgColor,
        border: `2px solid ${config.borderColor}`,
        borderRadius: 2,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
        overflow: "hidden",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: config.textColor,
              fontSize: "1.125rem",
            }}
          >
            {config.label}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: config.textColor,
              fontSize: "2.5rem",
              lineHeight: 1,
            }}
          >
            {count}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              color: config.textColor,
              fontSize: "0.875rem",
            }}
          >
            camera{count !== 1 ? "s" : ""}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
