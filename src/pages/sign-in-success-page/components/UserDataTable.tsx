import {
  Table,
  TableCaption,
  TableRow,
  TableHeader,
  TableCell,
  TableHead,
  TableBody,
} from '@/components/ui/table.tsx';
import { User } from '@/entities/user/user.ts';

export interface UserDataTableProps {
  user?: User;
}

export const UserDataTable = ({ user }: UserDataTableProps) => {
  return (
    <Table>
      <TableCaption>Current session</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Phone</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Middle Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{user?.phone}</TableCell>
          <TableCell>{user?.firstname}</TableCell>
          <TableCell>{user?.lastname}</TableCell>
          <TableCell>{user?.city}</TableCell>
          <TableCell>{user?.email}</TableCell>
          <TableCell>{user?.middlename}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
