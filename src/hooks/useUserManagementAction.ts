import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { QUERYKEYS } from "@/lib/constants/query-keys";
import userManagementService from "@/lib/services/userManagement.service";
import { UserRes } from "@/lib/dtos/user.dto";

export default function useUserManagementAction() {
  const queryClient = useQueryClient();

  const userCreationMutation = useMutation({
    mutationFn: userManagementService.createUser,
  });

  const userUpdateMutation = useMutation({
    mutationFn: userManagementService.updateUser,
  });

  const useUserListQuery = (params: QueryParams) =>
    useQuery({
      queryKey: [QUERYKEYS.userManagement.getUsers, params],
      queryFn: () => userManagementService.get(params),
    });

  const useUserQuery = (id: string) =>
    useQuery({
      queryKey: [QUERYKEYS.groupManagement.getGroup],
      queryFn: () => userManagementService.getById(id),
    });

  const useGetUsersByRoleQuery = (role: string, params: QueryParams) =>
    useQuery({
      queryKey: [QUERYKEYS.userManagement.getUsersByRole, role, params],
      queryFn: () => userManagementService.getUsersByRole(role, params),
    });

  return {
    userCreationMutation,
    userUpdateMutation,
    useUserListQuery,
    useUserQuery,
    useGetUsersByRoleQuery,
  };
}
