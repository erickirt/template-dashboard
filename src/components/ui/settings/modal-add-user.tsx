import { Button } from "@/components/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";

// @CHRIS: declare roles as central source (multiple times used)

const roles = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "member",
    label: "Member",
  },
  {
    value: "viewer",
    label: "Viewer",
  },
  {
    value: "contributor",
    label: "Contributor",
  },
];

export type ModalProps = {
  children: React.ReactNode;
};

export function ModalAddUser({ children }: ModalProps) {
  return (
    <>
      {/* @SEV: Componentize-review */}
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          {/* @SEV/MAXIME: check whether form really appropriate */}
          <form>
            <DialogHeader>
              <DialogTitle>Invite people to your workspace</DialogTitle>
              <DialogDescription className="mt-1 text-sm leading-6">
                With free plan, you can add up to 10 users to each workspace.
              </DialogDescription>
              <div className="mt-4">
                <Label htmlFor="email-new-user" className="font-medium">
                  Email
                </Label>
                <Input
                  id="email-new-user"
                  name="email-new-user"
                  placeholder="Insert email..."
                  className="mt-2"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="role-new-user" className="font-medium">
                  Select role
                </Label>
                <Select>
                  <SelectTrigger
                    id="role-new-user"
                    name="role-new-user"
                    className="mt-2"
                  >
                    <SelectValue placeholder="Select role..." />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {roles.map((role) => (
                      <SelectItem
                        key={role.value}
                        value={role.value}
                        disabled={role.value === "admin"}
                      >
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button
                  className="mt-2 w-full sm:mt-0 sm:w-fit"
                  variant="secondary"
                >
                  Go back
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="w-full sm:w-fit">
                  Add user
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
