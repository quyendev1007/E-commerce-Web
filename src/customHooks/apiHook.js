import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  create,
  getById,
  getList,
  remove,
  update,
} from "../providers/data.provider";

export const useGetList = (
  resource,
  {
    page = 1,
    search = "",
    sortBy = "",
    order = "",
    limit = null,
    status = "",
  } = {}
) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [resource, page, search, sortBy, order, status, limit],
    queryFn: () =>
      getList(resource, page, search, sortBy, order, status, limit),
    keepPreviousData: true,
    onSuccess: () => {
      queryClient.invalidateQueries([resource]);
    },
  });
};

export const useGetById = (resource, id) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: async () => {
      return await getById(resource, id);
    },
    enabled: !!id,
  });
};

export const useCreate = (resource) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => create(resource, data),
    onSuccess: () => {
      queryClient.invalidateQueries([resource]);
    },
  });
};

export const useUpdate = (resource) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => update(resource, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries([resource]);
    },
  });
};

export const useRemove = (resource) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => remove(resource, id),
    onSuccess: () => {
      queryClient.invalidateQueries([resource]);
    },
  });
};
