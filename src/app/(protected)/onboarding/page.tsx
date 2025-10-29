import LinkCardButton from "@/components/common/button/LinkCardButton";
import { Typography } from "@mui/material";
import { FaChalkboardTeacher as TeacherIcon } from "react-icons/fa";
import { MdOutlineFamilyRestroom as FamilyIcon } from "react-icons/md";

export default function page() {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-4">
      <Typography variant="h4" fontWeight={600}>
        Choose your account type
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Select the type of account you want to create
      </Typography>

      <div className="grid gap-6 pt-6 md:grid-cols-3">
        <LinkCardButton
          title="Parent"
          description="Manage your family's schedule"
          icon={FamilyIcon}
          link="/onboarding/parent"
        />

        <LinkCardButton
          title="Tutor"
          description="Connect with students"
          icon={TeacherIcon}
          link="/onboarding/tutor"
        />

        <LinkCardButton
          title="Student"
          description="Find a tutor"
          icon={TeacherIcon}
          link="/onboarding/student"
        />
      </div>
    </div>
  );
}
