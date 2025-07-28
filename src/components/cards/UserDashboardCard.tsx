import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@/types/user.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { UserService } from "@/services/UserService";
import { toast } from "react-toastify";

const UserDashboardCard = ({ user }: { user: User }) => {
  const query = useQueryClient();
  const { isPending } = useMutation({ mutationKey: ["delete-user"] });

  const { mutateAsync, isPending: isDeleting } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: UserService.deleteUser,
    onError: (e: any) => toast.error(e),
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!");
      query.invalidateQueries({ queryKey: ["list-users"] });
    },
  });

  async function deleteInstance() {
    if (!confirm("Você tem certeza que deseja deletar este usuário?")) return;
    await mutateAsync(user.id);
  }

  return (
    <Card className="transition-shadow shadow-sm hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">Id do usuário: {user.id}</CardTitle>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => deleteInstance()}
          disabled={isDeleting}
        >
          {isPending ? (
            <Loader2 className="animate-spin" size={16} />
          ) : (
            <Trash className="text-red-500" size={16} />
          )}
        </Button>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          <strong>Nome: </strong>
          {user.name}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Email: </strong>
          {user.email}
        </p>
        <p className="text-sm text-muted-foreground">
          <strong>Documento: </strong>
          {user.document}
        </p>
      </CardContent>
    </Card>
  );
};

export default UserDashboardCard;
