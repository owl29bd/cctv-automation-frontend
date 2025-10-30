import { CameraResponse, CameraStatus } from "@/lib/dtos/camera.dto";
import {
  Videocam as CameraIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Build as MaintenanceIcon,
  MoreVert as MoreIcon,
  Error as OfflineIcon,
  CheckCircle as OnlineIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

interface CameraDetailsCardProps {
  camera: CameraResponse;
  onEdit?: (camera: CameraResponse) => void;
  onMore?: (camera: CameraResponse) => void;
}

const getStatusConfig = (status: CameraStatus) => {
  switch (status) {
    case CameraStatus.Online:
      return {
        color: "success" as const,
        icon: <OnlineIcon />,
        label: "Online",
      };
    case CameraStatus.Offline:
      return {
        color: "error" as const,
        icon: <OfflineIcon />,
        label: "Offline",
      };
    case CameraStatus.Maintenance:
      return {
        color: "warning" as const,
        icon: <MaintenanceIcon />,
        label: "Maintenance",
      };
    default:
      return {
        color: "default" as const,
        icon: <OfflineIcon />,
        label: "Unknown",
      };
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export default function CameraDetailsCard({
  camera,
  onEdit,
  onMore,
}: CameraDetailsCardProps) {
  const statusConfig = getStatusConfig(camera.status);

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          elevation: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <CameraIcon />
          </Avatar>
        }
        title={
          <Typography variant="h6" component="h2" noWrap>
            {camera.name}
          </Typography>
        }
        subheader={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
            <Chip
              icon={statusConfig.icon}
              label={statusConfig.label}
              color={statusConfig.color}
              size="small"
              variant="outlined"
            />
          </Box>
        }
        action={
          <Box>
            {onEdit && (
              <Tooltip title="Edit Camera">
                <IconButton
                  size="small"
                  onClick={() => onEdit(camera)}
                  sx={{ mr: 0.5 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {onMore && (
              <Tooltip title="More Options">
                <IconButton size="small" onClick={() => onMore(camera)}>
                  <MoreIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        }
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Grid container spacing={2}>
          {/* Description */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "2.5em",
              }}
            >
              {camera.description || "No description available"}
            </Typography>
          </Grid>

          {/* Location */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationIcon color="action" fontSize="small" />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {camera.location || "Location not specified"}
              </Typography>
            </Box>
          </Grid>

          <Divider sx={{ my: 1, width: "100%" }} />

          {/* Timestamps */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <ScheduleIcon color="action" fontSize="small" />
              <Typography variant="caption" color="text.secondary">
                Created
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ ml: 3, fontSize: "0.75rem" }}>
              {formatDate(camera.createdAt)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ ml: 3, fontSize: "0.75rem" }}>
              <Typography
                component="span"
                variant="caption"
                color="text.secondary"
              >
                Updated:
              </Typography>{" "}
              {formatDate(camera.updatedAt)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
