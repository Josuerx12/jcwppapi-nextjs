import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";

const UserDashboardCard = ({ user }: { user: User }) => {
  const { isPending } = useMutation({ mutationKey: ["delete-user"] });

  return (
    <Card className="transition-shadow shadow-sm hover:shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-base">
            Id do usuário: {user.userId}
          </CardTitle>
        </div>
        <Button
          size="icon"
          variant="ghost"
          // onClick={() => deleteInstance()}
          // disabled={isDeleting}
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
        <p className="text-sm text-muted-foreground">
          <strong>Cargo: </strong>
          {user.role}
        </p>
      </CardContent>
    </Card>
  );
};

export default UserDashboardCard;
